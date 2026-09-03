"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Award, CheckCircle2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import CertificationsSection from "@/components/CertificationsSection";
import CertificatesSection from "@/components/CertificatesSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useLanguage } from "@/lib/LanguageContext";

export default function CertificationsClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-primary selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Header for Certifications Page */}
      <section style={{ paddingTop: "120px" }} className="pb-12 sm:pb-20 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-accent/15 via-primary/10 to-transparent blur-[110px] pointer-events-none -z-10" />

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
                <span className="text-primary font-semibold">Certifications</span>
              </Link>
            </div>

            {/* Glowing Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Industry Accreditations &amp; Continuous Learning</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="gradient-text">Certifications</span> &amp;{" "}
              <span className="text-text-primary">Verified Credentials</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Targeted preparation for top industry certifications (AWS Solutions Architect, CKA, Terraform Associate) combined with 15+ verified course credentials from IBM, DeepLearning.AI, Coursera, and Udemy.
            </p>

            {/* Credibility Stats Pills */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-4 py-2 text-xs font-medium text-text-primary border border-border">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span>3 Major Industry Certs In Progress</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-4 py-2 text-xs font-medium text-text-primary border border-border">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                <span>15 Verified Platform Credentials</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. In-Progress Certifications Section */}
        <CertificationsSection />

        <div className="section-divider" />

        {/* 2. Completed Certificates Section */}
        <CertificatesSection />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
