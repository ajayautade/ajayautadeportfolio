"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  FileCode,
  Check,
  Plus,
  Server,
  Workflow,
  Globe,
  Lock,
} from "lucide-react";
import { ESTIMATOR_OPTIONS, type ScopeOption } from "@/lib/services-data";
import { useCart } from "./CartProvider";

export default function ScopeEstimator() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "scope-cicd",
    "scope-aws-cloud",
    "scope-automation",
    "scope-monitoring",
  ]);
  const { addItem, openDrawer } = useCart();

  const toggleOption = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedItems = ESTIMATOR_OPTIONS.filter((opt) =>
    selectedIds.includes(opt.id)
  );

  const estimatedDays = Math.max(
    3,
    Math.round(selectedItems.reduce((acc, curr) => acc + curr.days, 0) * 0.7)
  );

  const getTimelineText = (days: number) => {
    if (days <= 5) return "3–5 Business Days (Rapid Sprint)";
    if (days <= 9) return "1–2 Weeks (Structured Sprint)";
    return "2–3 Weeks (Comprehensive Engagement)";
  };

  const handleAddBundleToCart = () => {
    if (selectedItems.length === 0) return;

    addItem({
      id: `custom-scope-${Date.now()}`,
      name: `Custom Scope (${selectedItems.length} modules: ${selectedItems
        .map((i) => i.title.split(" ")[0])
        .slice(0, 3)
        .join(", ")}...)`,
      category: "custom",
      type: "custom",
      deliveryEstimate: getTimelineText(estimatedDays),
    });
    openDrawer();
  };

  return (
    <section id="scope-builder" className="py-16 sm:py-24 relative w-full">
      <div
        className="section-container"
        style={{ width: "100%", maxWidth: "72rem", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-surface-elevated/90 via-surface to-surface-elevated/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Ambient decorative glow */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          {/* Heading */}
          <div
            className="text-center max-w-2xl mx-auto mb-10 relative z-10"
            style={{ width: "100%", maxWidth: "44rem", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
              <Calculator className="h-3.5 w-3.5" />
              <span>Interactive Architecture Configurator</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Build Your Custom <span className="gradient-text">Engagement Scope</span>
            </h2>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              Select the exact infrastructure, automation, and web capabilities your organization requires. Receive a tailored Statement of Work (SOW) with defined milestones and SLAs.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 relative z-10">
            {/* Left: Options Grid */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Available Engineering Capabilities ({ESTIMATOR_OPTIONS.length})
                </span>
                <span className="text-xs text-primary font-medium">
                  {selectedIds.length} capabilities selected
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {ESTIMATOR_OPTIONS.map((opt) => {
                  const isSelected = selectedIds.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleOption(opt.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "bg-primary/5 border-primary/60 shadow-sm ring-1 ring-primary/30"
                          : "bg-surface/80 border-border hover:border-primary/40 hover:bg-surface"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2 w-full">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                              isSelected
                                ? "bg-primary border-primary text-white"
                                : "border-border bg-surface-elevated text-transparent"
                            }`}
                          >
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                          <span className="text-xs font-bold text-text-primary">
                            {opt.title}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-text-secondary leading-relaxed pl-7">
                        {opt.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-border/50 pl-7 flex items-center justify-between text-[11px] text-text-tertiary">
                        <span>Milestone Horizon</span>
                        <span className="text-primary font-medium">
                          ~{opt.days} Days
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Summary & Quote Request Box */}
            <div className="lg:col-span-4 flex flex-col justify-between rounded-xl bg-surface p-6 border border-border shadow-md">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
                  Tailored Scope Summary
                </span>
                <h3 className="text-lg font-bold text-text-primary mt-1 mb-4">
                  Configured Engagement
                </h3>

                {/* Selected List */}
                <div className="space-y-2 mb-6 max-h-56 overflow-y-auto pr-1">
                  {selectedItems.length === 0 ? (
                    <div className="text-center py-8 text-text-tertiary text-xs">
                      No capabilities selected yet. Select options on the left to configure your scope.
                    </div>
                  ) : (
                    selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs py-1.5 border-b border-border/60"
                      >
                        <span className="text-text-primary font-medium truncate max-w-[180px]">
                          {item.title}
                        </span>
                        <span className="text-text-tertiary text-[11px]">
                          ~{item.days}d
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Turnaround Estimate */}
                <div className="p-4 rounded-xl bg-surface-elevated/70 border border-border space-y-3 mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                      Estimated Sprint Horizon
                    </span>
                    <div className="text-base font-extrabold text-primary flex items-center gap-1.5 mt-0.5">
                      <Clock className="h-4 w-4" />
                      <span>{getTimelineText(estimatedDays)}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-text-secondary">
                    <span>Selected Modules:</span>
                    <span className="font-bold text-text-primary">
                      {selectedItems.length} Capabilities
                    </span>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="space-y-1.5 mb-6 text-[11px] text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                    <span>Detailed Statement of Work (SOW)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                    <span>100% Client-Owned IP &amp; Codebase</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                    <span>Included SLA Post-Launch Warranty</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleAddBundleToCart}
                  disabled={selectedItems.length === 0}
                  className="btn-primary w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Request Custom Proposal</span>
                </button>

                <p className="text-[11px] text-center text-text-tertiary">
                  Reviewed by our Principal Architect within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
