import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import BookCallButton from "@/components/site/BookCallButton";
import JsonLd from "@/components/site/JsonLd";
import PostRow from "@/components/blog/PostRow";
import { TocDisclosure, TocRail } from "@/components/blog/TableOfContents";
import { formatPostDate } from "@/components/blog/date";
import { postBodies } from "@/content/posts";
import { getPost, lastModified, posts, relatedPosts, tagSlug } from "@/lib/posts";
import { getProject } from "@/lib/projects";
import { services } from "@/lib/services";
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
      modifiedTime: lastModified(post),
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

  const related = relatedPosts(post);
  const service = services.find((s) => s.id === post.service);
  if (!service) throw new Error(`Post ${post.slug} names an unknown service: ${post.service}`);
  const project = post.project ? getProject(post.project) : undefined;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: lastModified(post),
    inLanguage: "en",
    keywords: post.tags.join(", "),
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    image: absoluteUrl(`${path}/opengraph-image`),
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
                <li key={tag}>
                  <Link href={`/blog/tag/${tagSlug(tag)}`} className="tech-pill min-h-8 hover:text-text-primary transition-colors">
                    {tag}
                  </Link>
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
                  {post.updated && post.updated !== post.date && (
                    <>
                      <span aria-hidden="true"> · </span>
                      Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                    </>
                  )}
                </p>
              </div>
            </div>
          </PageHero>

          <div className="section-container py-14 sm:py-20">
            <div className="grid gap-x-16 lg:grid-cols-[minmax(0,1fr)_15rem]">
              <div className="min-w-0">
                <TocDisclosure headings={headings} />
                <Body />
                <aside aria-labelledby="service-cta-heading" className="mt-16 max-w-[68ch] border-t-2 border-text-primary pt-6">
                  <p className="type-eyebrow text-text-tertiary">I do this as a service</p>
                  <h2 id="service-cta-heading" className="mt-3 type-headline text-text-primary text-balance">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-text-secondary text-pretty">{post.cta}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href={`/services/${service.id}`} className="btn-primary">
                      How I work on this
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <BookCallButton source={`post-${post.slug}`} className="btn-outline" />
                  </div>
                </aside>
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
            <div className={`mt-8 grid gap-x-16 gap-y-12 ${project ? "lg:grid-cols-[minmax(0,1fr)_20rem]" : ""}`}>
              <div className="border-b border-border">
                {related.map((other) => (
                  <PostRow key={other.slug} post={other} headingLevel="h3" />
                ))}
              </div>
              {project && (
                <aside aria-labelledby="related-project-heading" className="self-start border-t border-text-primary pt-6">
                  <p className="type-eyebrow text-text-tertiary">The project behind this article</p>
                  <h3 id="related-project-heading" className="mt-3 type-headline text-text-primary">
                    <Link href={`/projects/${project.slug}`} className="hover:underline decoration-2 underline-offset-4">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-text-secondary text-pretty">{project.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                    {project.stack.slice(0, 6).map((item) => (
                      <li key={item} className="tech-pill">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4"
                    >
                      Read the case study
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-11 items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Source on GitHub
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </aside>
              )}
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
