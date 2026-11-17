import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import { absoluteUrl, site } from "@/lib/site";
import { formatInr, priceForService } from "@/lib/pricing";
import { faqs, process, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Cloud & DevOps Services: AWS, CI/CD, Kubernetes",
  description:
    "Freelance Cloud and DevOps services for startups and small teams: AWS infrastructure setup, CI/CD pipelines, Docker and Kubernetes, Terraform, and monitoring.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Cloud & DevOps Services by Ajay Autade",
    description: "AWS infrastructure, CI/CD pipelines, Docker and Kubernetes, Terraform, and monitoring for startups and small teams.",
    url: "/services",
  },
};

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="type-eyebrow text-text-tertiary">{title}</h4>
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

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Services"
          title="Cloud and DevOps work, scoped and written down."
          lead="Six kinds of work I take on for startups and small teams. Each has its own page covering the problems it is for, how I go about it, what you have at the end, and what it costs."
          crumbs={[{ name: "Services", path: "/services" }]}
        >
          <nav aria-label="Service pages">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.id}`} className="tech-pill min-h-11 px-3 hover:text-text-primary transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </PageHero>

        <section aria-labelledby="services-heading" className="py-16 sm:py-24">
          <div className="section-container">
            <h2 id="services-heading" className="type-eyebrow text-text-tertiary">
              {services.length} services, each with its own page
            </h2>
            <ol className="mt-8 border-t border-text-primary">
              {services.map((service, i) => {
                const price = priceForService(service.id);
                return (
                  <li
                    key={service.id}
                    id={service.id}
                    className="grid scroll-mt-24 gap-x-16 gap-y-8 border-b border-border py-12 sm:py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                  >
                    <div>
                      <p className="font-mono text-sm text-text-tertiary">
                        {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 type-display-md text-text-primary text-balance">
                        <Link href={`/services/${service.id}`} className="block py-2 hover:text-primary transition-colors">
                          {service.title}
                        </Link>
                      </h3>
                      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies involved">
                        {service.tools.map((tool) => (
                          <li key={tool} className="tech-pill">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="type-body-lg text-text-secondary text-pretty">{service.summary}</p>
                      <div className="mt-8">
                        <Block title="What it includes" items={service.includes} />
                      </div>
                      <div className="mt-8 flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:items-center">
                        <Link href={`/services/${service.id}`} className="btn-primary">
                          Full details
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        {price && (
                          <Link href={`/pricing#${price.id}`} className="tap text-sm text-text-secondary hover:text-text-primary transition-colors">
                            <span className="mr-1.5 text-text-tertiary">from</span>
                            <span className="font-mono text-text-primary">{formatInr(price.amount)}</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section aria-labelledby="process-heading" className="py-16 sm:py-24 bg-surface">
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
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="py-16 sm:py-24">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
            <h2 id="faq-heading" className="type-display-md text-text-primary">
              Questions people ask
            </h2>
            <div className="border-t border-text-primary">
              {faqs.map((faq) => (
                <details key={faq.q} className="group border-b border-border">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 type-card-title text-text-primary [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="font-mono text-xl text-text-tertiary group-open:rotate-45 transition-transform" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="pb-6 max-w-2xl text-text-secondary">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cloud and DevOps services",
          itemListElement: services.map((service, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: service.title,
              description: service.summary,
              url: absoluteUrl(`/services/${service.id}`),
              provider: { "@id": `${site.url}/#person` },
              areaServed: "Worldwide",
            },
          })),
        }}
      />
    </>
  );
}
