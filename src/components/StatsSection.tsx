"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GitCommit, Container, Rocket, Server, Clock, Code } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

const funFacts = [
  { icon: GitCommit, value: 500, suffix: "+", label: "Git Commits", color: "text-green-400" },
  { icon: Rocket, value: 50, suffix: "+", label: "CI/CD Pipelines", color: "text-blue-400" },
  { icon: Container, value: 30, suffix: "+", label: "Dockerized Apps", color: "text-cyan-400" },
  { icon: Server, value: 99.9, suffix: "%", label: "Uptime Target", color: "text-purple-400", decimals: 1 },
  { icon: Code, value: 15, suffix: "+", label: "Tools Mastered", color: "text-orange-400" },
  { icon: Clock, value: 1000, suffix: "+", label: "Hours of DevOps", color: "text-pink-400" },
];

function AnimatedNumber({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease out
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = value * eased;

      if (step >= steps) {
        setDisplay(decimals > 0 ? value.toFixed(decimals) : String(value));
        clearInterval(timer);
      } else {
        setDisplay(
          decimals > 0 ? current.toFixed(decimals) : String(Math.floor(current))
        );
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="section-container relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
              By The Numbers
            </h2>
            <p className="mt-2 text-sm text-text-tertiary">
              Quantifying impact through code, pipelines, and infrastructure
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {funFacts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <ScrollReveal key={fact.label} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="card p-5 text-center group hover:border-primary/30"
                >
                  <Icon
                    className={`h-6 w-6 mx-auto mb-3 ${fact.color} opacity-70 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className={`text-2xl sm:text-3xl font-bold ${fact.color} mb-1`}>
                    <AnimatedNumber
                      value={fact.value}
                      suffix={fact.suffix}
                      decimals={(fact as { decimals?: number }).decimals}
                    />
                  </div>
                  <div className="text-[11px] sm:text-xs text-text-tertiary font-medium uppercase tracking-wider">
                    {fact.label}
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
