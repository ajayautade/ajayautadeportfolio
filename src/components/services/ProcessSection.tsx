"use client";

import { motion } from "framer-motion";
import { workProcessSteps } from "@/lib/services-data";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function ProcessSection() {
  return (
    <section className="py-16 sm:py-20 bg-surface-elevated/40 border-y border-border w-full">
      <div
        className="section-container"
        style={{ width: "100%", maxWidth: "72rem", marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Header */}
        <div
          className="text-center max-w-2xl mx-auto mb-12"
          style={{ width: "100%", maxWidth: "42rem", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Sprint Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            How We Work Together
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            A frictionless, predictable 4-step delivery sprint from intake to production.
            No guesswork, no missed deadlines.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
          {workProcessSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6 flex flex-col justify-between relative bg-surface border hover:border-primary/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {step.timeline}
                    </span>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-elevated text-primary mb-3">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-bold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border/60 flex items-center gap-1.5 text-[11px] font-medium text-text-tertiary">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  <span>Guaranteed Milestones</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
