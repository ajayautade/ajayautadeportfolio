"use client";

import {
  Cloud,
  Workflow,
  Bot,
  Globe,
  Code,
  Activity,
  ArrowRight,
  Sparkles,
  Calculator,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";

const services = [
  {
    id: "cloud",
    icon: Cloud,
    titleKey: "services.cloud.title",
    descKey: "services.cloud.desc",
    color: "from-blue-500/20 to-cyan-500/10",
    techStack: ["AWS", "Terraform", "EKS", "Ansible"],
    priceTag: "Production Cloud",
    turnaround: "4–8 days",
  },
  {
    id: "cicd",
    icon: Workflow,
    titleKey: "services.cicd.title",
    descKey: "services.cicd.desc",
    color: "from-purple-500/20 to-indigo-500/10",
    techStack: ["GitHub Actions", "ArgoCD", "Jenkins", "Helm"],
    priceTag: "GitOps & Delivery",
    turnaround: "3–5 days",
  },
  {
    id: "automation",
    icon: Bot,
    titleKey: "services.automation.title",
    descKey: "services.automation.desc",
    color: "from-emerald-500/20 to-teal-500/10",
    techStack: ["n8n", "Python", "Slack Bots", "Stripe API"],
    priceTag: "Workflow Engine",
    turnaround: "3–6 days",
  },
  {
    id: "website",
    icon: Globe,
    titleKey: "services.website.title",
    descKey: "services.website.desc",
    color: "from-cyan-500/20 to-blue-500/10",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO"],
    priceTag: "Full-Stack Web",
    turnaround: "5–8 days",
  },
  {
    id: "webapp",
    icon: Code,
    titleKey: "services.webapp.title",
    descKey: "services.webapp.desc",
    color: "from-amber-500/20 to-orange-500/10",
    techStack: ["FastAPI", "Node.js", "PostgreSQL", "MongoDB"],
    priceTag: "Custom SaaS MVP",
    turnaround: "8–14 days",
  },
  {
    id: "monitoring",
    icon: Activity,
    titleKey: "services.monitoring.title",
    descKey: "services.monitoring.desc",
    color: "from-rose-500/20 to-pink-500/10",
    techStack: ["Grafana", "Prometheus", "IAM Audit", "Cost Cut"],
    priceTag: "Observability SLA",
    turnaround: "2–4 days",
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title={t("services.title")}
            subtitle={t("services.subtitle")}
          />
        </ScrollReveal>

        {/* 6 Services Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.id} delay={index * 0.08}>
                <div className="group card p-5 sm:p-6 h-full relative overflow-hidden transition-all duration-300 hover:border-primary/40 hover:-translate-y-1.5 flex flex-col justify-between">
                  {/* Subtle hover gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  <div className="relative z-10">
                    {/* Header: Icon + Pricing Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        {index < 2 && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 flex items-center gap-1">
                            <Sparkles className="h-2.5 w-2.5" />
                            Core
                          </span>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-primary">
                          {service.priceTag}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-text-primary mb-2">
                      {t(service.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm leading-relaxed text-text-secondary mb-4">
                      {t(service.descKey)}
                    </p>
                  </div>

                  {/* Footer: Tech pills + Turnaround */}
                  <div className="relative z-10 pt-3 border-t border-border/60">
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface border border-border text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-text-tertiary">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3 text-accent" />
                        {service.turnaround}
                      </span>
                      <Link
                        href="/services"
                        className="text-primary hover:underline font-semibold flex items-center gap-0.5"
                      >
                        Practice Specs <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA Banner linking to engineering solutions & scope builder */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 sm:mt-16 relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-surface-elevated/95 via-surface/90 to-surface-elevated/80 p-6 sm:p-8 lg:p-10 shadow-xl backdrop-blur-md">
            {/* Ambient decorative glow */}
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
              <div className="max-w-2xl space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t("services.cta.badge")}</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-text-primary tracking-tight">
                  {t("services.cta.title")}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {t("services.cta.desc")}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-primary pt-1">
                  <span className="flex items-center gap-1.5 text-green-500">
                    <ShieldCheck className="h-4 w-4" />
                    100% Client-Owned Code
                  </span>
                  <span className="text-text-tertiary hidden sm:inline">•</span>
                  <span className="text-text-secondary">
                    🌍 Global Timezone Overlap (US, UK/EU, APAC)
                  </span>
                  <span className="text-text-tertiary hidden sm:inline">•</span>
                  <span className="hidden sm:inline text-text-secondary">
                    Production SLAs &amp; Warranty
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  href="/services"
                  className="btn-primary flex items-center justify-center gap-2 text-sm py-3 px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all text-center"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{t("services.cta.button")}</span>
                  <ArrowRight className="h-4 w-4 ml-0.5" />
                </Link>

                <Link
                  href="/services#scope-builder"
                  className="btn-outline flex items-center justify-center gap-2 text-xs py-2.5 px-4 text-text-secondary hover:text-text-primary text-center"
                >
                  <Calculator className="h-3.5 w-3.5 text-primary" />
                  <span>Interactive Architecture Configurator</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
