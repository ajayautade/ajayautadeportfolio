"use client";

import { Check, X, Sparkles, ArrowRight, Shield, Clock } from "lucide-react";
import { useCart } from "./CartProvider";

interface MatrixRow {
  feature: string;
  category: "Overview" | "Cloud & DevOps" | "Web & Automation" | "Security & Handover";
  starter: string | boolean;
  growth: string | boolean;
  enterprise: string | boolean;
}

const COMPARISON_ROWS: MatrixRow[] = [
  // Overview
  {
    feature: "Engagement Structure",
    category: "Overview",
    starter: "Rapid Milestone Sprint",
    growth: "Comprehensive Architecture Sprint",
    enterprise: "Enterprise Strategic Build",
  },
  {
    feature: "Delivery Horizon",
    category: "Overview",
    starter: "3–5 Business Days",
    growth: "7–10 Business Days",
    enterprise: "12–16 Business Days",
  },
  {
    feature: "Target Workload Scale",
    category: "Overview",
    starter: "MVP & Core Workload",
    growth: "Production Multi-Service",
    enterprise: "Organization-Wide Systems",
  },
  {
    feature: "Post-Launch Warranty SLA",
    category: "Overview",
    starter: "7 Days Standby",
    growth: "14 Days Priority",
    enterprise: "30 Days Dedicated SLA",
  },
  {
    feature: "Revisions & Tuning",
    category: "Overview",
    starter: "Milestone Sign-off",
    growth: "3 Rounds Included",
    enterprise: "Continuous During Sprint",
  },

  // Cloud & DevOps Infrastructure
  {
    feature: "Docker Containerization",
    category: "Cloud & DevOps",
    starter: "Up to 2 Services",
    growth: "Up to 5 Microservices",
    enterprise: "Unlimited Services",
  },
  {
    feature: "Automated CI/CD Delivery Pipeline",
    category: "Cloud & DevOps",
    starter: "GitHub Actions",
    growth: "GitHub Actions + ArgoCD",
    enterprise: "Multi-Cluster GitOps Enterprise",
  },
  {
    feature: "AWS Cloud Environment Architecture",
    category: "Cloud & DevOps",
    starter: "EC2 or ECS + VPC",
    growth: "Production AWS EKS (Kubernetes)",
    enterprise: "Multi-AZ / Multi-Region EKS",
  },
  {
    feature: "Modular Terraform Infrastructure as Code",
    category: "Cloud & DevOps",
    starter: false,
    growth: true,
    enterprise: true,
  },
  {
    feature: "Prometheus & Grafana Observability Cluster",
    category: "Cloud & DevOps",
    starter: false,
    growth: true,
    enterprise: true,
  },
  {
    feature: "Auto-Healing & Horizontal Pod Autoscaling (HPA)",
    category: "Cloud & DevOps",
    starter: false,
    growth: true,
    enterprise: true,
  },

  // Web & Automation Capabilities
  {
    feature: "Event-Driven Business Workflow Automation",
    category: "Web & Automation",
    starter: "1 Core Webhook Trigger",
    growth: "Multi-Step Workflow Engine",
    enterprise: "Company-Wide Automation Suite",
  },
  {
    feature: "Modern Web Platform / SaaS Deployment",
    category: "Web & Automation",
    starter: "Static / Docker Web",
    growth: "Next.js 15 Web Platform",
    enterprise: "Bespoke SaaS / Enterprise Dashboard",
  },
  {
    feature: "Global Edge CDN Caching & Sub-Second TTFB",
    category: "Web & Automation",
    starter: true,
    growth: true,
    enterprise: true,
  },

  // Security & Handoff
  {
    feature: "IAM Security Hardening & Secrets Management",
    category: "Security & Handover",
    starter: "Core Best Practices",
    growth: "IAM Least-Privilege & KMS",
    enterprise: "Comprehensive Audit & Vaulting",
  },
  {
    feature: "FinOps Cloud Cost Optimization Audit",
    category: "Security & Handover",
    starter: false,
    growth: "Baseline Tuning",
    enterprise: "Comprehensive (20–40% Bill Cut)",
  },
  {
    feature: "Executive Architecture Runbooks & Loom Video",
    category: "Security & Handover",
    starter: true,
    growth: true,
    enterprise: true,
  },
  {
    feature: "100% Client-Owned Code & Cloud Accounts",
    category: "Security & Handover",
    starter: true,
    growth: true,
    enterprise: true,
  },
];

export default function PackageComparisonTable() {
  const { addItem, state } = useCart();

  const handleSelect = (id: string, name: string) => {
    addItem({
      id,
      name,
      category: "bundle",
      type: "package",
    });
  };

  const isFoundationInCart = state.items.some((i) => i.id === "foundation");
  const isGrowthInCart = state.items.some((i) => i.id === "growth-suite");
  const isEnterpriseInCart = state.items.some((i) => i.id === "enterprise-architecture");

  const renderValue = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <div className="flex justify-center">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-elevated text-text-tertiary">
            <X className="h-3.5 w-3.5" />
          </div>
        </div>
      );
    }
    return <span className="text-xs font-semibold text-text-primary">{val}</span>;
  };

  return (
    <section className="py-16 sm:py-20 w-full">
      <div
        className="section-container"
        style={{ width: "100%", maxWidth: "72rem", marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Section Heading */}
        <div
          className="text-center max-w-2xl mx-auto mb-12"
          style={{ width: "100%", maxWidth: "44rem", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            Side-By-Side Matrix
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary mt-3">
            Compare Engagement Tiers
          </h2>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            Evaluate architectural deliverables and SLA commitments across our core service tiers. Every engagement guarantees complete IP ownership, infrastructure code handover, and post-delivery warranty.
          </p>
        </div>

        {/* Desktop & Tablet Table */}
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-xl">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-border bg-surface-elevated/70">
                <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-text-tertiary w-2/5">
                  Deliverable / Capability
                </th>
                <th className="p-4 sm:p-5 text-center w-1/5">
                  <div className="text-sm font-bold text-text-primary">Foundation</div>
                  <div className="text-[11px] text-text-secondary font-medium">Cloud &amp; CI/CD Launch</div>
                </th>
                <th className="p-4 sm:p-5 text-center w-1/5 bg-primary/5 border-x border-primary/20">
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Most Selected</span>
                  </div>
                  <div className="text-sm font-bold text-text-primary">Production Suite</div>
                  <div className="text-[11px] text-text-secondary font-medium">DevOps, Web &amp; Workflows</div>
                </th>
                <th className="p-4 sm:p-5 text-center w-1/5">
                  <div className="text-sm font-bold text-text-primary">Enterprise Engine</div>
                  <div className="text-[11px] text-text-secondary font-medium">Full Scale Architecture</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, index) => {
                const isFirstOfCategory =
                  index === 0 || COMPARISON_ROWS[index - 1].category !== row.category;
                return (
                  <tr
                    key={row.feature}
                    className="border-b border-border/60 hover:bg-surface-elevated/40 transition-colors"
                  >
                    <td className="p-4 text-xs font-medium text-text-primary">
                      {isFirstOfCategory && (
                        <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                          {row.category}
                        </div>
                      )}
                      <span>{row.feature}</span>
                    </td>
                    <td className="p-4 text-center">{renderValue(row.starter)}</td>
                    <td className="p-4 text-center bg-primary/5 border-x border-primary/20">
                      {renderValue(row.growth)}
                    </td>
                    <td className="p-4 text-center">{renderValue(row.enterprise)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-surface-elevated/70">
                <td className="p-4 text-xs font-semibold text-text-secondary">
                  Add to Custom Scope Brief:
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() =>
                      handleSelect(
                        "foundation",
                        "Cloud Infrastructure & Deployment Foundation"
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isFoundationInCart
                        ? "bg-success/15 text-success border border-success/30"
                        : "bg-surface border border-border hover:border-primary/50 text-text-primary"
                    }`}
                  >
                    {isFoundationInCart ? "In Scope Brief" : "+ Select Tier"}
                  </button>
                </td>
                <td className="p-4 text-center bg-primary/5 border-x border-primary/20">
                  <button
                    onClick={() =>
                      handleSelect(
                        "growth-suite",
                        "Production DevOps, Web Platform & Workflow Suite"
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isGrowthInCart
                        ? "bg-success/15 text-success border border-success/30"
                        : "bg-primary text-white shadow-md shadow-primary/25 hover:opacity-95"
                    }`}
                  >
                    {isGrowthInCart ? "In Scope Brief" : "+ Select Tier"}
                  </button>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() =>
                      handleSelect(
                        "enterprise-architecture",
                        "Enterprise Cloud, Custom SaaS & Automation Engine"
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isEnterpriseInCart
                        ? "bg-success/15 text-success border border-success/30"
                        : "bg-surface border border-border hover:border-primary/50 text-text-primary"
                    }`}
                  >
                    {isEnterpriseInCart ? "In Scope Brief" : "+ Select Tier"}
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
