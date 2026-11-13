import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import PostRow from "@/components/blog/PostRow";
import { TocDisclosure, TocRail } from "@/components/blog/TableOfContents";
import { formatPostDate } from "@/components/blog/date";
import { postBodies } from "@/content/posts";
import { getPost, posts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: { absolute: post.title },
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [site.name],
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  const content = postBodies[slug];
  if (!post || !content) notFound();

  const { Body, headings } = content;
  const path = `/blog/${post.slug}`;

  // Related: share the most tags, newest first as the tie-break.
  const related = posts
    .filter((other) => other.slug !== post.slug)
    .map((other) => ({ other, shared: other.tags.filter((tag) => post.tags.includes(tag)).length }))
    .sort((a, b) => b.shared - a.shared || b.other.date.localeCompare(a.other.date))
    .slice(0, 2)
    .map(({ other }) => other);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    keywords: post.tags.join(", "),
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    image: `${site.url}/opengraph-image`,
  };

  return (
    <>
      <SiteHeader />
      <main id="main">
        <article>
          <PageHero
            title={post.title}
            lead={post.description}
            crumbs={[
              { name: "Blog", path: "/blog" },
              { name: post.title, path },
            ]}
          >
            <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
              {post.tags.map((tag) => (
                <li key={tag} className="tech-pill">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <Image
                src="/profile.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-medium text-text-primary">
                  <Link href="/about" className="tap hover:underline underline-offset-4">
                    {site.name}
                  </Link>
                </p>
                <p className="text-text-tertiary">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true"> · </span>
                  {post.readingMinutes} min read
                </p>
              </div>
            </div>
          </PageHero>

          <div className="section-container py-14 sm:py-20">
            <div className="grid gap-x-16 lg:grid-cols-[minmax(0,1fr)_15rem]">
              <div className="min-w-0">
                <TocDisclosure headings={headings} />
                <Body />
              </div>
              <aside className="hidden lg:block">
                <TocRail headings={headings} />
              </aside>
            </div>
          </div>
        </article>

        <section aria-labelledby="related-heading" className="border-t border-border py-16 sm:py-20">
          <div className="section-container">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-heading" className="type-display-md text-text-primary">
                Keep reading
              </h2>
              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center gap-2 type-eyebrow text-text-tertiary hover:text-text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All articles
              </Link>
            </div>
            <div className="mt-8 border-b border-border">
              {related.map((other) => (
                <PostRow key={other.slug} post={other} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Want this set up on your infrastructure?"
          text="Tell me what you're running and what you'd like to change. I'll reply with how I'd approach it."
        />
      </main>
      <SiteFooter />
      <JsonLd data={articleLd} />
    </>
  );
}
