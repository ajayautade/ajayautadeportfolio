"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { languages } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-tertiary hover:text-text-primary hover:border-primary/50 transition-colors"
        aria-label="Change language"
        title="Change language"
      >
        <Globe className="h-4 w-4" />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 z-[60] w-48 origin-top-right rounded-xl border border-border bg-surface/95 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden"
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-border/50">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                Language
              </p>
            </div>

            {/* Language Options */}
            <div className="py-1">
              {languages.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
                    }`}
                  >
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {lang.nativeName}
                      </p>
                      <p className="text-[10px] text-text-tertiary">
                        {lang.name}
                      </p>
                    </div>
                    {isActive && (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
