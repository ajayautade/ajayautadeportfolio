"use client";

import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { personalInfo } from "@/lib/data";

const infoCards = [
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    color: "text-accent",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: personalInfo.education.degree,
    subValue: personalInfo.education.college,
    color: "text-primary",
  },
  {
    icon: Briefcase,
    label: "Status",
    value: "Open to Opportunities",
    subValue: "DevOps Engineer",
    color: "text-success",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title="About Me"
            subtitle="Get to know the engineer behind the pipelines"
          />
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Bio */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-text-primary/80">
                {personalInfo.bio}
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                With a B.Tech in Computer Science and Engineering from MGM&apos;s
                Jawaharlal Nehru Engineering College, I bring a strong
                foundation in software engineering principles combined with
                hands-on DevOps expertise.
              </p>

              {/* How I Work */}
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  How I Work
                </p>
                <p className="text-sm leading-relaxed text-text-secondary italic">
                  &ldquo;{personalInfo.philosophy}&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Info Cards */}
          <div className="space-y-3 sm:space-y-4">
            {infoCards.map((card, index) => (
              <ScrollReveal key={card.label} delay={index * 0.1}>
                <div className="card p-4 flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-elevated ${card.color}`}
                  >
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-text-tertiary uppercase tracking-wide">
                      {card.label}
                    </p>
                    <p className="text-sm font-semibold text-text-primary mt-0.5">
                      {card.value}
                    </p>
                    {card.subValue && (
                      <p className="text-xs text-text-secondary mt-0.5">
                        {card.subValue}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
