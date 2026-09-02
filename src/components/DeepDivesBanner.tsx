"use client";

import Link from "next/link";
import { ArrowRight, Play, Shield, Sparkles, Terminal } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import { useLanguage } from "@/lib/LanguageContext";

export default function DeepDivesBanner() {
  const { t } = useLanguage();

  return (
    <section id="deep-dives-preview" className="py-12 sm:py-16">
      <div className="section-container">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-surface-elevated/90 via-surface/80 to-surface-elevated/60 p-6 sm:p-8 lg:p-10 shadow-xl shadow-primary/5 backdrop-blur-md">
            {/* Ambient background glow accents */}
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
              {/* Left Column: Heading & Description */}
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Dedicated Engineering Lab</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                  Interactive CI/CD &amp;{" "}
                  <span className="gradient-text">Technical Deep Dives</span>
                </h2>

                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Want to see my deployment pipelines in action? Test the live interactive simulator deploying to a mock AWS EKS cluster, or read my detailed answers to 15 real-world screening questions covering Kubernetes security, Terraform, Vault, incident post-mortems, and multi-tenant architectures.
                </p>

                {/* Tech Pills Preview */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Interactive Simulator", "AWS EKS", "GitOps / ArgoCD", "Trivy Scans", "15 Screening Q&As", "Incident RCA"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-surface border border-border text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Prominent Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  href="/deep-dives"
                  className="btn-primary flex items-center justify-center gap-2 text-sm py-3 px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all text-center"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Explore Interactive Lab</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>

                <Link
                  href="/deep-dives#screening"
                  className="btn-outline flex items-center justify-center gap-2 text-xs py-2.5 px-4 text-text-secondary hover:text-text-primary text-center"
                >
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span>View 15 Screening Q&amp;As</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
