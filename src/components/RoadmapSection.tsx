"use client";

import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Monitor,
  GitBranch,
  Terminal,
  Box,
  Network,
  RefreshCw,
  Blocks,
  Cloud,
  Activity,
  Rocket,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { roadmapItems } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  GitBranch,
  Terminal,
  Box,
  Network,
  RefreshCw,
  Blocks,
  Cloud,
  Activity,
  Rocket,
  Sparkles,
};

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    dotClass: "bg-success",
    borderClass: "border-success/30",
    badgeClass: "bg-success/10 text-success",
  },
  "in-progress": {
    icon: Clock,
    label: "In Progress",
    dotClass: "bg-primary animate-pulse",
    borderClass: "border-primary/30",
    badgeClass: "bg-primary/10 text-primary",
  },
  upcoming: {
    icon: ArrowRight,
    label: "Next Up",
    dotClass: "bg-text-tertiary",
    borderClass: "border-border",
    badgeClass: "bg-surface-elevated text-text-tertiary",
  },
};

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="DevOps Roadmap"
            subtitle="My learning journey and current progress"
          />
        </ScrollReveal>

        <div className="relative mx-auto w-full max-w-3xl">
          {/* Vertical Line */}
          <div className="absolute left-[33px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent md:left-[50%] md:-translate-x-[1px]" />

          {roadmapItems.map((item, index) => {
            const config = statusConfig[item.status];
            const StatusIcon = config.icon;
            const ItemIcon = iconMap[item.icon] || Monitor;
            const isRight = index % 2 === 1;

            return (
              <ScrollReveal
                key={item.title}
                delay={index * 0.08}
                direction={isRight ? "right" : "left"}
                className="w-full"
              >
                <div
                  className={`relative mb-8 flex w-full items-start md:justify-between ${
                    isRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Dot */}
                  <div 
                    className={`absolute left-[13px] top-6 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-surface md:top-0 md:left-[50%] md:-translate-x-1/2 md:translate-y-1 ${config.borderClass}`}
                  >
                    <div className={`h-3 w-3 rounded-full ${config.dotClass}`} />
                  </div>

                  {/* Card */}
                  <div
                    className={`glass-card ml-[70px] w-[calc(100%-70px)] p-4 md:ml-0 md:w-[calc(50%-2.5rem)]`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card-hover text-primary">
                        <ItemIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-text-primary">
                            {item.title}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.badgeClass}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-text-tertiary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for Desktop */}
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
