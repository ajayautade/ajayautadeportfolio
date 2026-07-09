"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";

export default function SectionDots() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show dots after scrolling past the hero
      setIsVisible(window.scrollY > 300);

      // Determine active section
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDotClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 hidden md:flex"
        >
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            const isHovered = hoveredDot === sectionId;

            return (
              <button
                key={sectionId}
                onClick={() => handleDotClick(link.href)}
                onTouchStart={() => setHoveredDot(sectionId)}
                onTouchEnd={() => setTimeout(() => setHoveredDot(null), 800)}
                className="relative flex items-center gap-2 touch-manipulation"
                aria-label={`Go to ${link.name}`}
              >
                {/* Tooltip label */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.span
                      initial={{ opacity: 0, x: 8, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="text-[10px] font-medium text-text-secondary bg-surface/90 backdrop-blur-sm border border-border rounded-md px-2 py-0.5 whitespace-nowrap pointer-events-none"
                    >
                      {link.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.4 : 1,
                    backgroundColor: isActive
                      ? "var(--color-primary)"
                      : "var(--color-text-tertiary)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{
                    boxShadow: isActive
                      ? "0 0 8px var(--color-primary)"
                      : "none",
                  }}
                />
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
