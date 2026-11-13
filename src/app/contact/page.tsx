import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/site/ContactForm";
import JsonLd from "@/components/site/JsonLd";
import { absoluteUrl, site } from "@/lib/site";

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
                <ContactForm />
              </div>
            </div>

            <aside aria-label="Other ways to reach me">
              <h2 className="type-eyebrow text-text-tertiary">Direct</h2>
              <ul className="mt-4 space-y-3 text-lg font-medium">
                <li>
                  <a href={`mailto:${site.email}`} className="text-text-primary underline decoration-primary decoration-2 underline-offset-4 break-all">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-primary transition-colors">
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

              <p className="mt-8 text-sm text-text-tertiary">
                Based in {site.location}. I work remotely.
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
