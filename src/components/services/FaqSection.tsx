"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Mail, MessageSquare } from "lucide-react";
import { serviceFaqs } from "@/lib/services-data";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 sm:py-20 w-full">
      <div
        className="section-container max-w-4xl"
        style={{ width: "100%", maxWidth: "56rem", marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Header */}
        <div
          className="text-center mb-12"
          style={{ width: "100%", maxWidth: "42rem", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Questions &amp; Answers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Everything you need to know about working together, payments, and deliverables.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {serviceFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="card overflow-hidden border border-border/80 transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-text-primary text-sm sm:text-base hover:text-primary transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-6 rounded-2xl bg-surface-elevated/70 border border-border text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-text-primary">
              Have a question that isn&apos;t answered here?
            </h4>
            <p className="text-xs text-text-secondary mt-0.5">
              We typically respond within a few hours across global business hours.
            </p>
          </div>
          <a
            href="mailto:contact@ajayautade.com?subject=Quick%20Question%20Regarding%20Services"
            className="btn-outline text-xs px-4 py-2 flex items-center gap-2 shrink-0"
          >
            <Mail className="h-3.5 w-3.5 text-primary" />
            <span>Ask Ajay Directly</span>
          </a>
        </div>
      </div>
    </section>
  );
}
