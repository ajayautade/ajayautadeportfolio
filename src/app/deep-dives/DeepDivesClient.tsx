"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Play, Shield, Terminal, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import PipelineSimulator from "@/components/PipelineSimulator";
import TechnicalQASection from "@/components/TechnicalQASection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useLanguage } from "@/lib/LanguageContext";

export default function DeepDivesClient() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-primary selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Header for Dedicated Page */}
      <section style={{ paddingTop: "120px" }} className="pb-12 sm:pb-20 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-primary/15 via-accent/10 to-transparent blur-[110px] pointer-events-none -z-10" />

        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Back to Portfolio Link */}
            <div className="mb-6 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-text-secondary bg-surface-elevated/80 border border-border/80 hover:text-text-primary hover:border-primary/40 transition-all shadow-sm group"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                <span>{t("nav.home") || "Portfolio"}</span>
                <span className="text-text-tertiary">/</span>
                <span className="text-primary font-semibold">Interactive Lab</span>
              </Link>
            </div>

            {/* Glowing Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>DevSecOps Sandbox & Technical Screening</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="gradient-text">Interactive CI/CD</span> &amp;{" "}
              <span className="text-text-primary">Technical Deep Dives</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Test my real GitOps automation workflow against a live simulated AWS EKS cluster, or explore 15 in-depth architectural solutions to senior technical screening questions.
            </p>

            {/* Quick-Jump Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => scrollToSection("pipeline")}
                className="btn-primary text-xs py-2.5 px-4 cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Launch CI/CD Simulator</span>
              </button>
              <button
                onClick={() => scrollToSection("screening")}
                className="btn-outline text-xs py-2.5 px-4 cursor-pointer"
              >
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span>Technical Screening Q&amp;A (15)</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Main Content: Pipeline Simulator and Technical Screening QA */}
      <main className="flex-1">
        {/* 1. Interactive Pipeline Simulator */}
        <PipelineSimulator />

        <div className="section-divider" />

        {/* 2. Technical Screening Questions */}
        <TechnicalQASection />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
