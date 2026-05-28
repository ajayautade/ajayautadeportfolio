"use client";

import { Building2, Calendar } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { experiences } from "@/lib/data";

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title="Experience"
            subtitle="Professional internship experience and contributions"
          />
        </ScrollReveal>

        <div ref={containerRef} className="relative mx-auto w-full max-w-3xl">
          {/* Static Timeline Line Background */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-6" />
          
          {/* Animated Glowing CI/CD Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-primary via-accent to-success md:left-6 origin-top z-0 shadow-[0_0_8px_rgba(79,70,229,0.5)]" 
          />

          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.company} delay={index * 0.15}>
              <div className="relative mb-10 pl-10 md:pl-14">
                {/* Timeline Dot */}
                <div className="absolute left-[13px] top-6 h-3 w-3 rounded-full bg-primary md:left-[21px]" />

                <div className="card p-5 sm:p-6 relative z-10 border border-border/50 bg-surface/80 backdrop-blur-sm">
                  {/* Header */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <h3 className="text-base font-semibold text-text-primary">
                          {exp.company}
                        </h3>
                      </div>
                      <p className="mt-0.5 text-sm font-medium text-primary">
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1 self-start">
                      <Calendar className="h-3 w-3 text-text-tertiary" />
                      <span className="text-xs font-medium text-text-secondary">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <ul className="mt-4 space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span className="text-sm text-text-secondary leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
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
