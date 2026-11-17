import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import { absoluteUrl, site } from "@/lib/site";
import { getTool, toolPath, tools } from "@/lib/tools";

interface ToolShellProps {
  slug: string;
  lead: string;
  description: string;
  /** The interactive part. */
  children: React.ReactNode;
  /** Reference notes under the tool: title plus body. */
  notes: { title: string; body: React.ReactNode }[];
  notesHeading: string;
}

/** Shared page frame for the calculators: hero, tool, reference notes, other tools, structured data. */
export default function ToolShell({ slug, lead, description, children, notes, notesHeading }: ToolShellProps) {
  const tool = getTool(slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  const path = toolPath(slug);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Free tool"
          title={tool.title}
          lead={lead}
          crumbs={[
            { name: "Tools", path: "/tools" },
            { name: tool.title, path },
          ]}
        >
          <p className="max-w-xl text-sm text-text-tertiary">
            Runs entirely in your browser. Nothing you type is stored or sent anywhere.
          </p>
        </PageHero>

        <section aria-label={tool.title} className="py-12 sm:py-20">
          <div className="section-container max-w-5xl">{children}</div>
        </section>

        <section aria-labelledby="notes-heading" className="bg-surface py-16 sm:py-24">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
            <h2 id="notes-heading" className="type-display-md text-text-primary text-balance">
              {notesHeading}
            </h2>
            <dl className="border-t border-text-primary">
              {notes.map((note) => (
                <div key={note.title} className="border-b border-border py-5">
                  <dt className="type-card-title text-text-primary">{note.title}</dt>
                  <dd className="mt-2 max-w-2xl text-text-secondary [&_code]:rounded-sm [&_code]:bg-surface-elevated [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125em] [&_code]:text-text-primary [&_a]:underline [&_a]:decoration-primary [&_a]:decoration-2 [&_a]:underline-offset-4">
                    {note.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="other-tools-heading" className="py-16 sm:py-20">
          <div className="section-container">
            <h2 id="other-tools-heading" className="type-eyebrow text-text-tertiary">
              Other free tools
            </h2>
            <ul className="mt-6 border-t border-text-primary">
              {tools
                .filter((other) => other.slug !== slug)
                .map((other) => (
                  <li key={other.slug} className="border-b border-border">
                    <Link href={toolPath(other.slug)} className="group grid gap-x-10 gap-y-1 py-5 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
                      <span className="type-card-title text-text-primary group-hover:text-primary transition-colors">{other.title}</span>
                      <span className="text-text-secondary">{other.summary}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        <CtaBand
          title="Want a second pair of eyes on the real thing?"
          text="Book a free 30-minute call, or send a note about what you run. I'll tell you what I'd look at first."
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.title,
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
