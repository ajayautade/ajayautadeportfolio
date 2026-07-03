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
import RadarChart from "./ui/RadarChart";
import { skillCategories } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud, Box, GitBranch, Code, Monitor, Activity,
  RefreshCw, Terminal, Network, Blocks, Cog, Wifi,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title="Skills & Technologies"
            subtitle="Tools and technologies I work with"
          />
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left — Radar Chart */}
          <ScrollReveal delay={0.1}>
            <div className="card p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-text-primary mb-4 text-center uppercase tracking-wider">
                Proficiency Overview
              </h3>
              <RadarChart />
            </div>
          </ScrollReveal>

          {/* Right — Skill Category Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {skillCategories.map((category, catIndex) => {
              const CategoryIcon = iconMap[category.icon] || Code;
              return (
                <ScrollReveal key={category.title} delay={catIndex * 0.08}>
                  <div className="card p-5 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-elevated text-primary">
                        <CategoryIcon className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-text-primary">
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => {
                        const SkillIcon = iconMap[skill.icon] || Code;
                        return (
                          <motion.span
                            key={skill.name}
                            className="tech-pill inline-flex items-center gap-1.5 cursor-default select-none touch-manipulation"
                            whileTap={{ scale: 1.15 }}
                            whileHover={{ scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          >
                            <SkillIcon className="h-3 w-3" />
                            {skill.name}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
