"use client";

import { Cloud, GitBranch, Activity, Server, Shield, Workflow } from "lucide-react";
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
  },
  {
    id: "cicd",
    icon: Workflow,
    titleKey: "services.cicd.title",
    descKey: "services.cicd.desc",
    color: "from-purple-500/20 to-indigo-500/10",
  },
  {
    id: "container",
    icon: Server,
    titleKey: "services.container.title",
    descKey: "services.container.desc",
    color: "from-green-500/20 to-emerald-500/10",
  },
  {
    id: "monitoring",
    icon: Activity,
    titleKey: "services.monitoring.title",
    descKey: "services.monitoring.desc",
    color: "from-orange-500/20 to-amber-500/10",
  },
  {
    id: "gitops",
    icon: GitBranch,
    titleKey: "services.gitops.title",
    descKey: "services.gitops.desc",
    color: "from-pink-500/20 to-rose-500/10",
  },
  {
    id: "security",
    icon: Shield,
    titleKey: "services.security.title",
    descKey: "services.security.desc",
    color: "from-teal-500/20 to-cyan-500/10",
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

        <div className="grid gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.id} delay={index * 0.08}>
                <div className="group card p-4 sm:p-6 h-full relative overflow-hidden transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-text-primary mb-2">
                      {t(service.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {t(service.descKey)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
