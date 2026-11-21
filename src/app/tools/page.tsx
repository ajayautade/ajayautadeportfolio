import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import { absoluteUrl, site } from "@/lib/site";
import { toolPath, tools } from "@/lib/tools";

const title = "Free DevOps Tools: AWS, Kubernetes, Docker and CI/CD";
const description =
  "Free browser-based tools for cloud and DevOps work: an AWS cost estimator, IAM policy explainer, GitHub OIDC trust policy generator, Dockerfile checker, CIDR, cron and Kubernetes calculators, and an infrastructure checkup.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Free tools"
          title="Small tools for everyday infrastructure work."
          lead="The calculations I kept doing by hand or in a scratch file. Each one runs in your browser, with no sign-up and nothing sent anywhere."
          crumbs={[{ name: "Tools", path: "/tools" }]}
        />

        <section aria-labelledby="tools-heading" className="py-16 sm:py-24">
          <div className="section-container">
            <h2 id="tools-heading" className="type-eyebrow text-text-tertiary">
              {tools.length} tools
            </h2>
            <ol className="mt-8 border-t border-text-primary">
              {tools.map((tool, i) => (
                <li key={tool.slug} className="border-b border-border">
                  <Link
                    href={toolPath(tool.slug)}
                    className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.2fr)_2rem] sm:items-baseline"
                  >
                    <span className="font-mono text-sm text-text-tertiary">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="type-headline text-text-primary group-hover:text-primary transition-colors">{tool.title}</h3>
                    <p className="text-text-secondary">{tool.summary}</p>
                    <ArrowUpRight
                      className="hidden sm:block h-5 w-5 self-center text-text-tertiary group-hover:text-text-primary transition-colors"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CtaBand />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          url: absoluteUrl("/tools"),
          name: title,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: tools.map((tool, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(toolPath(tool.slug)),
              name: tool.title,
            })),
          },
        }}
      />
    </>
  );
}
