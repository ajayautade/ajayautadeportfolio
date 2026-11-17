import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import PostRow from "@/components/blog/PostRow";
import { posts } from "@/lib/posts";
import { currency, formatInr, priceForService } from "@/lib/pricing";
import { getProject } from "@/lib/projects";
import { getService, process, services } from "@/lib/services";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ id: service.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const service = getService(id);
  if (!service) return {};
  const path = `/services/${service.id}`;
  return {
    title: { absolute: service.seoTitle },
    description: service.seoDescription,
    alternates: { canonical: path },
    openGraph: { title: service.seoTitle, description: service.seoDescription, url: path },
    twitter: { card: "summary_large_image", title: service.seoTitle, description: service.seoDescription },
  };
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="type-eyebrow text-text-tertiary">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-text-secondary">
            <span className="mt-[0.7em] h-1 w-3 shrink-0 bg-text-primary" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServicePage({ params }: Params) {
  const { id } = await params;
  const service = getService(id);
  if (!service) notFound();

  const path = `/services/${service.id}`;
  const price = priceForService(service.id);
  const project = service.relatedProject ? getProject(service.relatedProject.slug) : undefined;
  const articles = posts.filter((post) => post.tags.some((tag) => service.postTags.includes(tag))).slice(0, 3);
  const others = services.filter((other) => other.id !== service.id);
  const contactHref = `/contact?topic=${encodeURIComponent("Pricing or a quote")}&summary=${encodeURIComponent(
    `I'd like to ask about: ${service.title}.\n\n`,
  )}`;

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Service"
          title={service.title}
          lead={service.intro}
          crumbs={[
            { name: "Services", path: "/services" },
            { name: service.title, path },
          ]}
        >
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies involved">
            {service.tools.map((tool) => (
              <li key={tool} className="tech-pill">
                {tool}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={contactHref} className="btn-primary">
              Ask about this
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {price && (
              <Link href={`/pricing#${price.id}`} className="btn-outline">
                From {formatInr(price.amount)}
              </Link>
            )}
          </div>
        </PageHero>

        <section className="py-16 sm:py-24">
          <div className="section-container grid gap-x-16 gap-y-12 sm:grid-cols-2">
            <Block title="What it includes" items={service.includes} />
            <Block title="Problems it solves" items={service.problems} />
            <div className="sm:col-span-2">
              <h2 className="type-eyebrow text-text-tertiary">How I approach it</h2>
              <ol className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {service.approach.map((step, n) => (
                  <li key={step} className="flex gap-4 border-t border-border pt-4 text-text-secondary">
                    <span className="font-mono text-sm text-text-tertiary">{n + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <Block title="What you get" items={service.deliverables} />
            {price && (
              <div>
                <h2 className="type-eyebrow text-text-tertiary">What it costs</h2>
                <p className="mt-4 font-mono text-xl text-text-primary">
                  <span className="mr-2 font-sans text-sm text-text-tertiary">from</span>
                  {formatInr(price.amount)}
                </p>
                <p className="mt-3 text-text-secondary">{price.covers}</p>
                <p className="mt-3 text-text-secondary">
                  The final amount is fixed in a written scope before you pay anything.{" "}
                  <Link href="/pricing" className="font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4">
                    All prices
                  </Link>
                </p>
              </div>
            )}
          </div>
        </section>

        {project && (
          <section aria-labelledby="project-heading" className="bg-surface py-16 sm:py-24">
            <div className="section-container grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <p className="type-eyebrow text-text-tertiary">This kind of work, in a public project</p>
                <h2 id="project-heading" className="mt-4 type-display-md text-text-primary text-balance">
                  <Link href={`/projects/${project.slug}`} className="block py-2 hover:text-primary transition-colors">
                    {project.title}
                  </Link>
                </h2>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {project.stack.slice(0, 7).map((tool) => (
                    <li key={tool} className="tech-pill">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="type-body-lg text-text-secondary text-pretty">{project.summary}</p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="tap mt-6 inline-flex items-center gap-1.5 font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4"
                >
                  Read the case study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {articles.length > 0 && (
          <section aria-labelledby="articles-heading" className="py-16 sm:py-24">
            <div className="section-container">
              <h2 id="articles-heading" className="type-display-md text-text-primary">
                Related articles
              </h2>
              <div className="mt-8 border-b border-border">
                {articles.map((post) => (
                  <PostRow key={post.slug} post={post} headingLevel="h3" />
                ))}
              </div>
            </div>
          </section>
        )}

        <section aria-labelledby="process-heading" className="border-t border-border py-16 sm:py-24">
          <div className="section-container">
            <h2 id="process-heading" className="type-display-md text-text-primary">
              How working together goes
            </h2>
            <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, i) => (
                <li key={step.title} className="border-t border-text-primary pt-5">
                  <p className="font-mono text-sm text-text-tertiary">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 type-card-title text-text-primary">{step.title}</h3>
                  <p className="mt-3 text-text-secondary">{step.text}</p>
                </li>
              ))}
            </ol>

            <nav aria-labelledby="other-services-heading" className="mt-16">
              <h2 id="other-services-heading" className="type-eyebrow text-text-tertiary">
                Other services
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {others.map((other) => (
                  <li key={other.id}>
                    <Link href={`/services/${other.id}`} className="tech-pill min-h-11 px-3 hover:text-text-primary transition-colors">
                      {other.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <CtaBand secondary={{ label: "See pricing", href: "/pricing" }} />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${absoluteUrl(path)}#service`,
          name: service.title,
          serviceType: service.title,
          description: service.intro,
          url: absoluteUrl(path),
          provider: { "@id": `${site.url}/#person` },
          areaServed: "Worldwide",
          ...(price
            ? {
                offers: {
                  "@type": "Offer",
                  url: absoluteUrl(`/pricing#${price.id}`),
                  priceCurrency: currency,
                  price: price.amount,
                  priceSpecification: { "@type": "PriceSpecification", priceCurrency: currency, minPrice: price.amount },
                },
              }
            : {}),
        }}
      />
    </>
  );
}
