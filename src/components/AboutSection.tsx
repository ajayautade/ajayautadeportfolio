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
    <section id="about" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="About Me"
            subtitle="Get to know the engineer behind the pipelines"
          />
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Bio */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-text-secondary">
                {personalInfo.bio}
              </p>
              <p className="text-base leading-relaxed text-text-tertiary">
                With a B.Tech in Computer Science and Engineering from MGM&apos;s
                Jawaharlal Nehru Engineering College, I bring a strong
                foundation in software engineering principles combined with
                hands-on DevOps expertise. I&apos;m passionate about automating
                everything, building reliable infrastructure, and continuously
                learning new technologies.
              </p>
            </div>
          </ScrollReveal>

          {/* Info Cards */}
          <div className="grid gap-4 sm:grid-cols-1">
            {infoCards.map((card, index) => (
              <ScrollReveal key={card.label} delay={index * 0.1} direction="right">
                <div className="glass-card p-5 flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card-hover ${card.color}`}
                  >
                    <card.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-tertiary">
                      {card.label}
                    </p>
                    <p className="text-base font-semibold text-text-primary">
                      {card.value}
                    </p>
                    {card.subValue && (
                      <p className="text-sm text-text-secondary">
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
