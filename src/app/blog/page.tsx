import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import PostRow from "@/components/blog/PostRow";
import Link from "next/link";
import { posts, tags } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

const title = "DevOps Blog: AWS, Docker, Kubernetes and CI/CD";
const description =
  "Practical DevOps notes from real projects: Docker image size, GitHub Actions with AWS, Terraform, backups and troubleshooting, with working commands.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { title, description, url: "/blog", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const blogLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${absoluteUrl("/blog")}#blog`,
  url: absoluteUrl("/blog"),
  name: "Engineering Journal",
  description,
  inLanguage: "en",
  author: { "@id": `${site.url}/#person` },
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: { "@id": `${site.url}/#person` },
  })),
};

export default function BlogIndexPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Engineering journal"
          title="Notes from building and running infrastructure."
          lead="Write-ups of problems I worked through on my own projects: what broke, what I changed, and the commands and configuration that did it."
          crumbs={[{ name: "Blog", path: "/blog" }]}
        >
          <nav aria-label="Topics">
            <ul className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li key={tag.slug}>
                  <Link href={`/blog/tag/${tag.slug}`} className="tech-pill min-h-8 hover:text-text-primary transition-colors">
                    {tag.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </PageHero>

        <section aria-labelledby="articles-heading" className="py-16 sm:py-24">
          <div className="section-container">
            <h2 id="articles-heading" className="type-eyebrow text-text-tertiary mb-8">
              {posts.length} {posts.length === 1 ? "article" : "articles"}, newest first
            </h2>
            <div className="border-b border-border">
              {posts.map((post) => (
                <PostRow key={post.slug} post={post} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Stuck on something similar?"
          text="If one of these problems looks like yours, tell me what you're running. I'm happy to take a look."
        />
      </main>
      <SiteFooter />
      <JsonLd data={blogLd} />
    </>
  );
}
