import Link from "next/link";
import { footerNav, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="stage">
      <div className="section-container py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-text-primary">
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
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="type-eyebrow text-text-tertiary">Elsewhere</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-border pt-6 text-xs text-text-quaternary">
          &copy; {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
