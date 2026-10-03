"use client";

import { MapPin, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  const infoCards = [
    {
      icon: MapPin,
      label: t("about.location"),
      value: personalInfo.location,
      color: "text-accent",
    },
    {
      icon: GraduationCap,
      label: t("about.educationLabel"),
      value: personalInfo.education.degree,
      color: "text-primary",
    },
    {
      icon: Briefcase,
      label: t("about.status"),
      value: t("about.openToOpportunities"),
      subValue: t("about.opportunitiesSub"),
      color: "text-success",
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title={t("about.title")}
            subtitle={t("about.subtitle")}
          />
        </ScrollReveal>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
          {/* Bio */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <p className="text-base sm:text-lg leading-relaxed text-text-primary/90">
                {t("about.bio")}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                {t("about.education")}
              </p>
            </div>
          </ScrollReveal>

          {/* Info Cards */}
          <div className="space-y-3 sm:space-y-4">
            {infoCards.map((card, index) => (
              <ScrollReveal key={card.label} delay={index * 0.1}>
                <div className="card p-4 sm:p-5 flex items-start gap-4 hover:border-primary/30 transition-colors">
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-surface-elevated ${card.color}`}
                  >
                    <card.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-tertiary uppercase tracking-wide">
                      {card.label}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-text-primary mt-0.5">
                      {card.value}
                    </p>
                    {card.subValue && (
                      <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
                        {card.subValue}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* How I Work - Full Width Banner */}
        <ScrollReveal delay={0.25}>
          <div className="mt-8 sm:mt-10 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/[0.07] via-surface to-accent/[0.05] p-5 sm:p-6 lg:p-7 relative overflow-hidden card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative z-10">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  {t("about.howIWork")}
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-text-secondary italic">
                  &ldquo;{t("about.philosophy")}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
