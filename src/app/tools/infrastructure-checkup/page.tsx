import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import InfraCheckup from "@/components/tools/InfraCheckup";
import { checkupQuestions } from "@/lib/checkup";
import { posts } from "@/lib/posts";
import { services } from "@/lib/services";
import { absoluteUrl, site } from "@/lib/site";

const title = "Infrastructure Checkup: A Free DevOps Self-Assessment";
const description =
  "Twelve yes-or-no questions about backups, releases, access, monitoring and cost. Get a prioritised list of what to fix first. Runs in your browser; nothing is stored.";
const path = "/tools/infrastructure-checkup";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | ${site.name}`, description, url: path },
};

const areas = [...new Set(checkupQuestions.map((q) => q.area))];

export default function InfrastructureCheckupPage() {
  const serviceTitles = Object.fromEntries(services.map((service) => [service.id, service.title]));
  const postTitles = Object.fromEntries(posts.map((post) => [post.slug, post.title]));

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Free tool"
          title="Infrastructure checkup"
          lead={`${checkupQuestions.length} yes-or-no questions about how your application is run. At the end you get a list of gaps in the order I would fix them, with a link to how.`}
          crumbs={[
            { name: "Tools", path: "/tools" },
            { name: "Infrastructure checkup", path },
          ]}
        >
          <ul className="flex flex-wrap gap-1.5" aria-label="Areas covered">
            {areas.map((area) => (
              <li key={area} className="tech-pill">
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-sm text-text-tertiary">
            It runs entirely in your browser. Your answers are not stored or sent anywhere, and there is no sign-up.
          </p>
        </PageHero>

        <section aria-label="Checkup questions" className="py-12 sm:py-20">
          <div className="section-container max-w-5xl">
            <InfraCheckup serviceTitles={serviceTitles} postTitles={postTitles} />
          </div>
        </section>

        <section aria-labelledby="about-checkup-heading" className="bg-surface py-16 sm:py-24">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
            <h2 id="about-checkup-heading" className="type-display-md text-text-primary">
              What this is, and is not
            </h2>
            <dl className="border-t border-text-primary">
              <div className="border-b border-border py-5">
                <dt className="type-card-title text-text-primary">Where the questions come from</dt>
                <dd className="mt-2 max-w-2xl text-text-secondary">
                  They are the problems I list on the service pages, turned into questions: missing backups,
                  manual deploys, shared keys, alerts nobody trusts, and bills nobody can explain.
                </dd>
              </div>
              <div className="border-b border-border py-5">
                <dt className="type-card-title text-text-primary">How the order is decided</dt>
                <dd className="mt-2 max-w-2xl text-text-secondary">
                  Things that can lose data or leave you unable to recover come first. Things that slow you down
                  come next. It is a general judgement, not a measurement of your systems.
                </dd>
              </div>
              <div className="border-b border-border py-5">
                <dt className="type-card-title text-text-primary">What it cannot tell you</dt>
                <dd className="mt-2 max-w-2xl text-text-secondary">
                  Whether your setup is secure, or what a change would save. Those need someone to look at the
                  actual configuration. This is a starting list for that conversation.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <CtaBand
          title="Want someone to go through the list with you?"
          text="Book a free 30-minute call, or send your results through the contact form. I'll tell you what I'd look at first."
          primary={{ label: "Get in touch", href: "/contact" }}
          secondary={{ label: "See pricing", href: "/pricing" }}
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Infrastructure checkup",
          url: absoluteUrl(path),
          description,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
          author: { "@id": `${site.url}/#person` },
        }}
      />
    </>
  );
}
