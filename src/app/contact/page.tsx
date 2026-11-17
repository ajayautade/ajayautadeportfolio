import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import ContactForm, { ContactFormFromQuery } from "@/components/site/ContactForm";
import JsonLd from "@/components/site/JsonLd";
import BookCallButton from "@/components/site/BookCallButton";
import { absoluteUrl, addressLines, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ajay Autade about AWS infrastructure, CI/CD pipelines, Docker and Kubernetes, Terraform, monitoring, or a DevOps engineering role.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Ajay Autade", url: "/contact" },
};

const expectations = [
  {
    title: "What to include",
    text: "What you run today, where it is hosted, and what you want to change. Rough is fine.",
  },
  {
    title: "What happens next",
    text: "I read every message myself and reply by email. If it looks like a fit, we set up a call.",
  },
  {
    title: "If it is about a role",
    text: "Send the job description or a link, and I can share my resume by email.",
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Contact"
          title="Let's talk about your infrastructure."
          lead="For project inquiries, roles, or a question about something I wrote. The form goes straight to my inbox."
          crumbs={[{ name: "Contact", path: "/contact" }]}
        />

        <section className="py-16 sm:py-24">
          <div className="section-container grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
            <div>
              <h2 className="type-display-md text-text-primary">Send a message</h2>
              <div className="mt-8">
                {/* Reads ?topic= and ?summary= in the browser, so the page itself stays static. */}
                <Suspense fallback={<ContactForm />}>
                  <ContactFormFromQuery />
                </Suspense>
              </div>
            </div>

            <aside aria-label="Other ways to reach me">
              <h2 className="type-eyebrow text-text-tertiary">Prefer to talk?</h2>
              <p className="mt-3 text-text-secondary">A free 30-minute video call. Pick a time and I confirm by email.</p>
              <div className="mt-4 mb-10">
                <BookCallButton source="contact" />
              </div>
              <h2 className="type-eyebrow text-text-tertiary">Direct</h2>
              <ul className="mt-4 space-y-3 text-lg font-medium">
                <li>
                  <a href={`mailto:${site.email}`} className="tap text-text-primary underline decoration-primary decoration-2 underline-offset-4 break-all">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.phoneHref} className="tap text-text-primary hover:text-primary transition-colors">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="tap text-text-primary hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className="tap text-text-primary hover:text-primary transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>

              <dl className="mt-12 border-t border-text-primary">
                {expectations.map((item) => (
                  <div key={item.title} className="border-b border-border py-5">
                    <dt className="type-card-title text-text-primary">{item.title}</dt>
                    <dd className="mt-2 text-text-secondary">{item.text}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="mt-10 type-eyebrow text-text-tertiary">Business details</h2>
              <address className="mt-4 not-italic text-text-secondary">
                <span className="block font-medium text-text-primary">{site.legalName}</span>
                {addressLines().map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-4 text-sm text-text-tertiary">
                I work remotely. See <Link href="/pricing" className="underline underline-offset-4 hover:text-text-primary">pricing</Link> for
                what a call or a project costs.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl("/contact"),
          name: "Contact Ajay Autade",
          about: { "@id": `${site.url}/#person` },
        }}
      />
    </>
  );
}
