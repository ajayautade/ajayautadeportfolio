"use client";

import { Building2, Calendar } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { experiences } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Experience"
            subtitle="Professional internship experience and contributions"
          />
        </ScrollReveal>

        <div className="relative mx-auto w-full max-w-3xl">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-8" />

          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.company} delay={index * 0.15}>
              <div className="relative mb-12 pl-10 md:pl-16">
                {/* Timeline Dot */}
                <div className="absolute left-[11px] top-7 flex h-3 w-3 items-center justify-center md:left-[27px]">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>

                <div className="glass-card overflow-hidden">
                  {/* Header */}
                  <div className="border-b border-glass-border bg-surface-elevated/30 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="h-4 w-4 text-primary" />
                          <h3 className="text-lg font-semibold text-text-primary">
                            {exp.company}
                          </h3>
                        </div>
                        <p className="text-base font-medium text-primary">
                          {exp.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-card-hover px-3 py-1.5 self-start sm:self-auto">
                        <Calendar className="h-3.5 w-3.5 text-text-tertiary" />
                        <span className="text-sm font-medium text-text-secondary">
                          {exp.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <ul className="space-y-3">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span className="text-sm text-text-secondary">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
