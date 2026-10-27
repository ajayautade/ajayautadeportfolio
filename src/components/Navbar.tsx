import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import TerminalModal from "./TerminalModal";
import LanguageSwitcher from "./LanguageSwitcher";
import { navLinks, personalInfo } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

const navTranslationKeys: Record<string, string> = {
  Home: "nav.home",
  About: "nav.about",

  Skills: "nav.skills",
  Certificates: "nav.certificates",
  Certifications: "certs.title",
  Projects: "nav.projects",
  Services: "services.title",
  "Deep Dives": "nav.deepDives",
  Contact: "nav.contact",
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (pathname === "/deep-dives") {
      setActiveSection("/deep-dives");
      return;
    }
    if (pathname === "/certifications") {
      setActiveSection("/certifications");
      return;
    }
    if (pathname === "/services") {
      setActiveSection("/services");
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const inPageSections = navLinks
        .filter((link) => link.href.startsWith("#"))
        .map((link) => link.href.replace("#", ""));

      for (let i = inPageSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(inPageSections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(inPageSections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Prevent scroll when mobile menu is open & handle Escape key
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);

    // Route links (e.g. /deep-dives)
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }

    // Anchor links when not on home page
    if (pathname !== "/") {
      router.push("/" + href);
      return;
    }

    // Anchor links on home page
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || pathname !== "/"
            ? "bg-bg/90 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="text-sm font-bold text-text-primary"
            >
              {personalInfo.name.split(" ")[0]}
              <span className="text-primary">.</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const isActive =
                  activeSection === link.href ||
                  (link.href.startsWith("#") &&
                    activeSection === link.href.replace("#", ""));

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative rounded-md px-2 xl:px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-md bg-primary/5"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">
                      {t(navTranslationKeys[link.name] || link.name)}
                    </span>
                  </a>
                );
              })}
              <div className="ml-2 flex items-center gap-2">
                <button
                  onClick={() => setIsTerminalOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-tertiary hover:text-text-primary hover:border-primary/50 transition-colors"
                  aria-label="Open Terminal"
                  title="Open Terminal"
                >
                  <TerminalIcon className="h-4 w-4" />
                </button>
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-tertiary transition-colors"
                aria-label="Open Terminal"
              >
                <TerminalIcon className="h-4 w-4" />
              </button>
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-bg/98 backdrop-blur-2xl flex flex-col items-center justify-start overflow-y-auto overscroll-contain py-16 px-6 md:hidden"
            style={{ paddingBottom: 'max(4rem, env(safe-area-inset-bottom))' }}
          >
            {/* Close button — 44px touch target */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-md border border-border"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>

            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => {
                const isActive =
                  activeSection === link.href ||
                  (link.href.startsWith("#") &&
                    activeSection === link.href.replace("#", ""));

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`rounded-lg px-6 py-3 text-lg font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {t(navTranslationKeys[link.name] || link.name)}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </>
  );
}
