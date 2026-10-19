"use client";

import { motion } from "framer-motion";
import { clientBenefits } from "@/lib/services-data";
import { Shield, Sparkles } from "lucide-react";

export default function WhyChooseSection() {
  return (
    <section className="py-16 sm:py-24 relative w-full">
      <div
        className="section-container"
        style={{ width: "100%", maxWidth: "72rem", marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Section Header */}
        <div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          style={{ width: "100%", maxWidth: "44rem", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <Shield className="h-3.5 w-3.5" />
            <span>Engineering Standards &amp; Guarantees</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Why High-Growth Tech Teams <span className="gradient-text">Partner With Us</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            Delivering the rigor, speed, and clean code of an elite in-house senior engineering team—without bureaucratic agency overhead, communication barriers, or vendor lock-in.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clientBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="card p-6 sm:p-7 flex flex-col justify-between border hover:border-primary/40 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Subtle top gradient accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-text-tertiary">
                      {benefit.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
