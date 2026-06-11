"use client";

import { Cloud, Network, Blocks, BookOpen } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { certifications } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Network,
  Blocks,
};

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title="Certifications"
            subtitle="Currently preparing for industry-recognized credentials"
          />
        </ScrollReveal>

        <div className="mx-auto max-w-3xl grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => {
            const Icon = iconMap[cert.icon] || BookOpen;
            return (
              <ScrollReveal key={cert.name} delay={index * 0.1}>
                <div className="card p-4 sm:p-5 flex flex-col items-center text-center group relative overflow-hidden">
                  {/* Subtle top accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                      cert.color === "text-[#FF9900]"
                        ? "from-[#FF9900]/60 to-[#FF9900]/10"
                        : cert.color === "text-[#326CE5]"
                        ? "from-[#326CE5]/60 to-[#326CE5]/10"
                        : "from-[#7B42BC]/60 to-[#7B42BC]/10"
                    }`}
                  />

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated ${cert.color} mb-3 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-sm font-semibold text-text-primary leading-snug">
                    {cert.name}
                  </h3>

                  <p className="mt-1 text-xs text-text-tertiary">
                    {cert.issuer}
                  </p>

                  <div className="mt-3">
                    {cert.status === "earned" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-success">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        Earned {cert.date}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>
                        In Progress
                      </span>
                    )}
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
