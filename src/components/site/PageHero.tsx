import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  /** Chips, byline, actions: sits under the lead. */
  children?: React.ReactNode;
  /** Optional art on the right at large widths. */
  aside?: React.ReactNode;
}

/**
 * The black opening stage every inner page shares. The h1 lives here,
 * so each page gets exactly one.
 */
export default function PageHero({ eyebrow, title, lead, crumbs, children, aside }: PageHeroProps) {
  return (
    <header className="stage pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div className="section-container">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={`mt-8 grid gap-10 ${aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end" : ""}`}>
          <div className="max-w-4xl">
            {eyebrow && <p className="type-eyebrow text-text-tertiary mb-5">{eyebrow}</p>}
            <h1 className="type-display-xl text-text-primary text-balance">{title}</h1>
            {lead && (
              <p className="mt-6 max-w-2xl type-body-lg sm:type-subhead text-text-secondary text-pretty">
                {lead}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside}
        </div>
      </div>
    </header>
  );
}
