"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import BookCallButton from "@/components/site/BookCallButton";
import { mainNav, site } from "@/lib/site";

// The terminal is an extra; it only loads when someone opens it.
const TerminalModal = dynamic(() => import("@/components/TerminalModal"), { ssr: false });

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalLoaded, setTerminalLoaded] = useState(false);

  const openTerminal = () => {
    setTerminalLoaded(true);
    setTerminalOpen(true);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalLoaded(true);
        setTerminalOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="stage fixed inset-x-0 top-0 z-50 border-b border-border">
        <div className="section-container flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="tap inline-flex items-center gap-2.5 whitespace-nowrap text-base font-bold tracking-tight text-text-primary"
            onClick={() => setMenuOpen(false)}
          >
            <span className="h-2.5 w-2.5 bg-primary" aria-hidden="true" />
            {site.name}
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`inline-flex h-11 items-center px-3 type-eyebrow transition-colors ${
                      isActive(item.href)
                        ? "text-text-primary underline decoration-primary decoration-2 underline-offset-8"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openTerminal}
              className="hidden sm:inline-flex h-11 w-11 items-center justify-center rounded-sm text-text-tertiary transition-colors hover:text-text-primary"
              aria-label="Open the interactive terminal"
              title="Terminal (Ctrl/⌘ K)"
            >
              <TerminalIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <ThemeToggle />
            <BookCallButton
              source="header"
              label="Book a call"
              icon={false}
              className="hidden sm:inline-flex h-11 items-center rounded-sm bg-white px-4 text-sm font-medium text-black transition-opacity hover:opacity-85"
            />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-text-primary lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div id="mobile-menu" className="stage fixed inset-0 z-40 overflow-y-auto pt-16 lg:hidden">
          <nav aria-label="Mobile" className="section-container py-8">
            <ul>
              {mainNav.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-14 items-center text-3xl font-bold tracking-tight text-text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openTerminal();
              }}
              className="mt-6 inline-flex min-h-11 items-center gap-2 type-eyebrow text-text-tertiary"
            >
              <TerminalIcon className="h-4 w-4" aria-hidden="true" />
              Open terminal
            </button>
            <div className="mt-8 border-t border-border pt-8">
              <BookCallButton source="mobile-menu" />
              <a href={`mailto:${site.email}`} className="tap mt-4 text-text-secondary">
                {site.email}
              </a>
            </div>
          </nav>
        </div>
      )}

      {terminalLoaded && <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />}
    </>
  );
}
