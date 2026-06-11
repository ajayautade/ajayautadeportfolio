"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Box,
  GitBranch,
  Code,
  Monitor,
  Activity,
  RefreshCw,
  Terminal,
  Network,
  Blocks,
  Cog,
  Wifi,
} from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { skillCategories } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Box,
  GitBranch,
  Code,
  Monitor,
  Activity,
  RefreshCw,
  Terminal,
  Network,
  Blocks,
  Cog,
  Wifi,
};

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium text-text-primary">{name}</span>
        <span className="text-text-tertiary">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-elevated">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Skills & Technologies"
            subtitle="Tools and technologies I work with daily"
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, catIndex) => {
            const CategoryIcon = iconMap[category.icon] || Code;
            return (
              <ScrollReveal key={category.title} delay={catIndex * 0.1}>
                <div className="glass-card h-full p-6 gradient-border">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card-hover text-primary">
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-text-primary">
                      {category.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        delay={catIndex * 0.1 + skillIndex * 0.1}
                      />
                    ))}
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
