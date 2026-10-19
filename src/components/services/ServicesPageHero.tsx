"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  Calculator,
  Globe,
  FileCode,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function ServicesPageHero() {
  const { itemCount, toggleDrawer } = useCart();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden w-full flex flex-col items-center justify-center"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}
    >
      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-2xl" />
      </div>

      <div
        className="relative z-10 section-container w-full"
        style={{ width: "100%", maxWidth: "72rem", marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Top bar */}
        <div className="w-full flex items-center justify-between mb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("scope-builder")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-border bg-surface text-xs font-medium text-text-secondary hover:text-text-primary hover:border-primary/40 transition-colors"
            >
              <Calculator className="h-3.5 w-3.5 text-primary" />
              <span>Scope Builder</span>
            </button>

            <button
              onClick={toggleDrawer}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-text-secondary hover:text-primary hover:border-primary/50 transition-all shadow-sm"
              aria-label="View solution scope brief"
            >
              <FileCode className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Scope Brief</span>
              {itemCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-[10px] font-bold text-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Hero Content - Horizontally Centered */}
        <div
          className="w-full flex flex-col items-center justify-center text-center"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            className="w-full max-w-4xl mx-auto flex flex-col items-center text-center"
            style={{
              width: "100%",
              maxWidth: "56rem",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-xs font-medium text-text-secondary shadow-sm mb-6 animate-glow-pulse mx-auto"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="font-semibold text-text-primary">
                Global Technical Practice
              </span>
              <span className="text-text-tertiary hidden sm:inline">•</span>
              <span className="text-text-tertiary hidden sm:inline">
                Multi-Region Availability &amp; Dedicated SLAs
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full text-center text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]"
              style={{ width: "100%", textAlign: "center" }}
            >
              Cloud Architecture, DevOps &amp;{" "}
              <span className="gradient-text">Systems Engineering</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto text-center"
              style={{
                width: "100%",
                maxWidth: "44rem",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
            >
              Partnering with technology organizations globally to engineer resilient cloud environments, automated delivery pipelines, and mission-critical software platforms built for scale.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 w-full flex flex-col sm:flex-row items-center justify-center gap-3.5"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <button
                onClick={() => scrollToSection("practices")}
                className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                <Sparkles className="h-4 w-4" />
                <span>Explore Engineering Practices</span>
              </button>

              <button
                onClick={() => scrollToSection("scope-builder")}
                className="btn-outline w-full sm:w-auto px-5 py-3 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Calculator className="h-4 w-4 text-primary" />
                <span>Configure Scope Brief</span>
              </button>

              <a
                href="mailto:contact@ajayautade.com?subject=Technical%20Engagement%20Inquiry&body=Hi%20Ajay%2C%0A%0AWe%20would%20like%20to%20discuss%20an%20engineering%20consultancy%20engagement%20with%20your%20team.%0A%0ACompany%20%2F%20Organization%3A%20%0ALocation%20%2F%20Timezone%3A%20%0ATechnical%20Focus%20(Cloud%20DevOps%2C%20Web%2C%20or%20Workflow%20Automation)%3A%20%0AEstimated%20Timeline%3A%20%0A%0ABest%20regards%2C"
                className="w-full sm:w-auto px-5 py-3 rounded-lg border border-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary/40 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4 text-accent" />
                <span>Request Consultation</span>
              </a>
            </motion.div>

            {/* Trust Highlights Grid - Enterprise Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 pt-8 border-t border-border w-full max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
              style={{
                width: "100%",
                maxWidth: "48rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface/60 border border-border/60 text-center">
                <span className="text-xl sm:text-2xl font-bold text-primary">3–14 Days</span>
                <span className="text-[11px] text-text-secondary font-medium mt-0.5">
                  Sprint Delivery Horizon
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface/60 border border-border/60 text-center">
                <span className="text-xl sm:text-2xl font-bold text-accent">100%</span>
                <span className="text-[11px] text-text-secondary font-medium mt-0.5">
                  Client Code &amp; IP Ownership
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface/60 border border-border/60 text-center">
                <span className="text-xl sm:text-2xl font-bold text-green-500">99.99%</span>
                <span className="text-[11px] text-text-secondary font-medium mt-0.5">
                  Target Production SLA
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface/60 border border-border/60 text-center">
                <span className="text-xl sm:text-2xl font-bold text-primary">Global</span>
                <span className="text-[11px] text-text-secondary font-medium mt-0.5">
                  Worldwide Timezone Coverage
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
