import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="stage min-h-[100dvh] flex items-center pt-24 pb-16">
        <div className="section-container">
          <p className="font-mono text-sm text-text-tertiary">HTTP 404</p>
          <h1 className="mt-5 type-display-xl text-text-primary">This page does not exist.</h1>
          <p className="mt-6 max-w-xl type-body-lg text-text-secondary">
            The link may be old, or the address may have a typo. These pages do exist:
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            <li>
              <Link href="/" className="btn-primary">
                Home
              </Link>
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="btn-outline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
