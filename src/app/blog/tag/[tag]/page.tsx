import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import PostRow from "@/components/blog/PostRow";
import { getTag, isIndexableTag, tags } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = getTag(slug);
  if (!tag) return {};
  const path = `/blog/tag/${tag.slug}`;
  const title = `${tag.name} articles`;
  const description = `Articles about ${tag.name} by ${site.name}: write-ups from real projects, with the commands and configuration used.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
    // A page listing a single article adds nothing to the article itself, so keep it out of the index.
    robots: isIndexableTag(tag) ? undefined : { index: false, follow: true },
  };
}

export default async function TagPage({ params }: Params) {
  const { tag: slug } = await params;
  const tag = getTag(slug);
  if (!tag) notFound();
  const path = `/blog/tag/${tag.slug}`;

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Topic"
          title={`${tag.name} articles`}
          lead={`${tag.posts.length} ${tag.posts.length === 1 ? "article" : "articles"} tagged ${tag.name}, newest first.`}
          crumbs={[
            { name: "Blog", path: "/blog" },
            { name: tag.name, path },
          ]}
        >
          <nav aria-label="Other topics">
            <ul className="flex flex-wrap gap-1.5">
              {tags
                .filter((other) => other.slug !== tag.slug)
                .map((other) => (
                  <li key={other.slug}>
                    <Link href={`/blog/tag/${other.slug}`} className="tech-pill min-h-8 hover:text-text-primary transition-colors">
                      {other.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </PageHero>

        <section aria-labelledby="articles-heading" className="py-16 sm:py-24">
          <div className="section-container">
            <h2 id="articles-heading" className="sr-only">
              Articles
            </h2>
            <div className="border-b border-border">
              {tag.posts.map((post) => (
                <PostRow key={post.slug} post={post} headingLevel="h3" />
              ))}
            </div>
            <Link href="/blog" className="btn-outline mt-10">
              All articles
            </Link>
          </div>
        </section>

        <CtaBand
          title="Stuck on something similar?"
          text="If one of these problems looks like yours, tell me what you're running. I'm happy to take a look."
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          url: absoluteUrl(path),
          name: `${tag.name} articles`,
          isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: tag.posts.map((post, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/blog/${post.slug}`),
              name: post.title,
            })),
          },
        }}
      />
    </>
  );
}
