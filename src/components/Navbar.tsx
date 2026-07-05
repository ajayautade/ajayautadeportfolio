"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal as TerminalIcon, FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import TerminalModal from "./TerminalModal";
import { navLinks, personalInfo } from "@/lib/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
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
          isScrolled
            ? "bg-bg/80 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
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
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-primary"
                      : "text-text-tertiary hover:text-text-primary"
                  }`}
                >
                  {activeSection === link.href.replace("#", "") && (
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
                  <span className="relative z-10">{link.name}</span>
                </a>
              ))}
              <div className="ml-2 flex items-center gap-2">
                <button
                  onClick={() => setIsTerminalOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-tertiary hover:text-text-primary hover:border-primary/50 transition-colors"
                  aria-label="Open Terminal"
                  title="Open Terminal"
                >
                  <TerminalIcon className="h-4 w-4" />
                </button>
                <a 
                  href="/resume.pdf" 
                  download="Ajay_Autade_DevOps_Engineer_Resume.pdf" 
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Resume
                </a>
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-tertiary transition-colors"
                aria-label="Open Terminal"
              >
                <TerminalIcon className="h-4 w-4" />
              </button>
              <ThemeToggle />
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border transition-colors"
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
            className="fixed inset-0 z-50 bg-bg flex flex-col items-center justify-center md:hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-6 flex h-8 w-8 items-center justify-center rounded-md border border-border"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>

            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
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
                    activeSection === link.href.replace("#", "")
                      ? "text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              
              {/* Mobile Resume Button */}
              <motion.a
                href="/resume.pdf"
                download="Ajay_Autade_DevOps_Engineer_Resume.pdf"
                onClick={() => setIsMobileOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="flex w-full max-w-xs items-center justify-center gap-2.5 rounded-xl bg-primary py-4 px-6 text-base font-semibold text-white transition-colors hover:bg-primary/90 mt-8 shadow-lg"
              >
                <FileText className="h-5 w-5" />
                Download Resume
              </motion.a>
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
