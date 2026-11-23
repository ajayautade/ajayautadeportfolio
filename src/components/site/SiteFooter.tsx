import Link from "next/link";
import { footerNav, legalNav, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="stage">
      <div className="section-container py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="tap inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-text-primary">
              <span className="h-2.5 w-2.5 bg-primary" aria-hidden="true" />
              {site.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-tertiary">
              {site.role}. Based in {site.locality}, India. Working remotely with teams anywhere.
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="type-eyebrow text-text-tertiary">{group.title}</h2>
              <ul className="mt-2 lg:mt-4 lg:space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="tap text-sm text-text-secondary hover:text-text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h2 className="type-eyebrow text-text-tertiary">Elsewhere</h2>
            <ul className="mt-2 lg:mt-4 lg:space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className="tap text-sm text-text-secondary hover:text-text-primary transition-colors">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="tap text-sm text-text-secondary hover:text-text-primary transition-colors">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="tap text-sm text-text-secondary hover:text-text-primary transition-colors">
                  GitHub
                </a>
              </li>
              {site.statusPageUrl && (
                <li>
                  <a
                    href={site.statusPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-text-primary" aria-hidden="true" />
                    Site status and uptime
                  </a>
                </li>
              )}
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="tap text-sm text-text-secondary hover:text-text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-x-8 gap-y-2 border-t border-border pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-text-quaternary">
            &copy; {new Date().getFullYear()} {site.legalName}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-col gap-x-6 sm:flex-row sm:flex-wrap">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="tap text-xs text-text-tertiary hover:text-text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
