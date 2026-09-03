"use client";

import Link from "next/link";
import { Award, ArrowRight, CheckCircle2, Shield, Cloud, Network, Blocks } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import { certifications } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

const certIcons: Record<string, React.ElementType> = {
  Cloud,
  Network,
  Blocks,
};

export default function CertificationsBanner() {
  const { t } = useLanguage();

  return (
    <section id="certifications-preview" className="py-12 sm:py-16">
      <div className="section-container">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-surface-elevated/90 via-surface/80 to-surface-elevated/60 p-6 sm:p-8 shadow-xl shadow-primary/5 backdrop-blur-md">
            {/* Ambient background accent */}
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Column: Title and Overview */}
              <div className="max-w-xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                  <Award className="h-3.5 w-3.5" />
                  <span>Continuous Learning &amp; Accreditations</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                  {t("certs.title") || "Certifications"} &amp;{" "}
                  <span className="gradient-text">Verified Credentials</span>
                </h2>

                <p className="text-sm text-text-secondary leading-relaxed">
                  Currently preparing for 3 premier industry credentials (AWS, CKA, Terraform) backed by 15 verified course completions across Cloud, DevOps, and Cyber Security.
                </p>

                {/* In-Progress Cert Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {certifications.map((cert) => {
                    const Icon = certIcons[cert.icon] || Award;
                    return (
                      <span
                        key={cert.name}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-lg bg-surface border border-border text-text-primary"
                      >
                        <Icon className={`h-3.5 w-3.5 ${cert.color}`} />
                        <span>{cert.name}</span>
                        <span className="text-[10px] text-primary font-semibold">
                          ({t("certs.inProgress")})
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: CTA to dedicated page */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  href="/certifications"
                  className="btn-primary flex items-center justify-center gap-2 text-sm py-3 px-6 shadow-md shadow-primary/20 hover:shadow-primary/35 transition-all text-center"
                >
                  <Award className="h-4 w-4" />
                  <span>View All 15+ Credentials</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>

                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-text-tertiary px-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>All badges verified on Coursera &amp; Udemy</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
