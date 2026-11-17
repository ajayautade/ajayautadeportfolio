import Link from "next/link";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import PageHero from "./PageHero";
import { Prose } from "@/components/blog/Prose";
import { formatPostDate } from "@/components/blog/date";
import { legal } from "@/lib/legal";
import { addressLines, legalNav, site } from "@/lib/site";

interface LegalPageProps {
  title: string;
  lead: string;
  path: string;
  children: React.ReactNode;
}

/** Shared shell for the policy pages: black hero, white reading column, contact block, links to the other policies. */
export default function LegalPage({ title, lead, path, children }: LegalPageProps) {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero eyebrow="Policy" title={title} lead={lead} crumbs={[{ name: title, path }]}>
          <p className="type-eyebrow text-text-tertiary">
            Last updated <time dateTime={legal.updated}>{formatPostDate(legal.updated)}</time>
          </p>
        </PageHero>

        <div className="section-container grid gap-x-16 gap-y-14 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="min-w-0">
            <Prose>{children}</Prose>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="type-eyebrow text-text-primary">Questions about this policy</h2>
            <address className="mt-4 not-italic text-sm text-text-secondary">
              <span className="block font-medium text-text-primary">{site.legalName}</span>
              {addressLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a href={`mailto:${site.email}`} className="tap mt-2 block underline decoration-primary decoration-2 underline-offset-4 break-all">
                {site.email}
              </a>
              <a href={site.phoneHref} className="tap block hover:text-text-primary">
                {site.phone}
              </a>
            </address>

            <nav aria-label="Other policies" className="mt-8 border-t border-border pt-6">
              <h2 className="type-eyebrow text-text-tertiary">Related</h2>
              <ul className="mt-2 lg:mt-4 lg:space-y-3">
                {[{ label: "Pricing", href: "/pricing" }, ...legalNav]
                  .filter((link) => link.href !== path)
                  .map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="tap text-sm text-text-secondary hover:text-text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
