import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import { absoluteUrl, site } from "@/lib/site";
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
      <h3 className="type-eyebrow text-text-tertiary">{title}</h3>
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
          lead="Six kinds of work I take on for startups and small teams. Each one below says what it covers, the problems it is for, how I go about it, and what you have at the end."
          crumbs={[{ name: "Services", path: "/services" }]}
        >
          <nav aria-label="Services on this page">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.id}>
                  <a href={`#${service.id}`} className="tech-pill min-h-11 px-3 hover:text-text-primary transition-colors">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageHero>

        {services.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-heading`}
            className={`scroll-mt-16 py-16 sm:py-24 ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-sm text-text-tertiary">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </p>
                <h2 id={`${service.id}-heading`} className="mt-3 type-display-md text-text-primary text-balance">
                  {service.title}
                </h2>
                <p className="mt-5 type-body-lg text-text-secondary">{service.intro}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies involved">
                  {service.tools.map((tool) => (
                    <li key={tool} className="tech-pill">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                <Block title="What it includes" items={service.includes} />
                <Block title="Problems it solves" items={service.problems} />
                <div className="sm:col-span-2">
                  <h3 className="type-eyebrow text-text-tertiary">How I approach it</h3>
                  <ol className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {service.approach.map((step, n) => (
                      <li key={step} className="flex gap-4 border-t border-border pt-4 text-text-secondary">
                        <span className="font-mono text-sm text-text-tertiary">{n + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <Block title="What you get" items={service.deliverables} />
                <div>
                  <h3 className="type-eyebrow text-text-tertiary">Get started</h3>
                  <p className="mt-4 text-text-secondary">
                    Send a short note about your setup. I&rsquo;ll reply with questions or a
                    proposed scope.
                  </p>
                  <div className="mt-5 flex flex-col items-start gap-3">
                    <Link href="/contact" className="btn-primary">
                      Ask about this
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    {service.relatedProject && (
                      <Link
                        href={`/projects/${service.relatedProject.slug}`}
                        className="tap text-sm font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4"
                      >
                        See it in a project: {service.relatedProject.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

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
          "@type": "ItemList",
          name: "Cloud and DevOps services",
          itemListElement: services.map((service, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: service.title,
              description: service.summary,
              url: absoluteUrl(`/services#${service.id}`),
              provider: { "@id": `${site.url}/#person` },
              areaServed: "Worldwide",
            },
          })),
        }}
      />
    </>
  );
}
