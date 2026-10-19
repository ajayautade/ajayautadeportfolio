"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Cloud,
  Workflow,
  Globe,
  Shield,
  Layers,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Server,
  Activity,
  Terminal,
} from "lucide-react";

interface ShowcasePillar {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  icon: typeof Cloud;
  image: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
  keyCapabilities: string[];
  techStack: string[];
}

const SHOWCASE_PILLARS: ShowcasePillar[] = [
  {
    id: "cloud-devops",
    title: "Cloud Architecture & DevOps Infrastructure",
    shortTitle: "Cloud & DevOps",
    badge: "AWS & Kubernetes Tier",
    icon: Cloud,
    image: "/images/services/cloud-architecture.jpg",
    headline: "Resilient Multi-Region Cloud & GitOps Deployment Automation",
    description:
      "Enterprise AWS infrastructure engineered for maximum availability, security, and developer velocity. Built with modular Terraform Infrastructure as Code, production Kubernetes (EKS), automated CI/CD pipelines, and Prometheus observability.",
    metrics: [
      { label: "Target Availability", value: "99.99%" },
      { label: "Deploy Time Reduction", value: "70%" },
      { label: "Avg AWS Cost Savings", value: "25–40%" },
      { label: "Disaster Recovery RTO", value: "<15 Min" },
    ],
    keyCapabilities: [
      "Multi-AZ Amazon EKS cluster architecture with auto-scaling worker nodes",
      "Modular, versioned Terraform Infrastructure as Code (IaC) repositories",
      "GitOps continuous delivery with ArgoCD & automated GitHub Actions",
      "Zero-downtime rolling deploys with automated rollbacks on health check failure",
      "Prometheus & Grafana custom metrics, SLO tracking, and PagerDuty/Slack routing",
    ],
    techStack: ["AWS EKS", "Terraform", "Docker", "Kubernetes", "ArgoCD", "GitHub Actions", "Prometheus", "Grafana"],
  },
  {
    id: "automation",
    title: "Intelligent Process & Workflow Automation",
    shortTitle: "Workflow Automation",
    badge: "Event-Driven Engine",
    icon: Workflow,
    image: "/images/services/workflow-automation.jpg",
    headline: "Event-Driven Business Pipelines, API Integrations & AI Workflows",
    description:
      "Eliminate manual operations and cross-department data silos. We design resilient event-driven workflow engines connecting CRMs (HubSpot, Salesforce), Stripe billing, Slack notifications, databases, and LLM reasoning steps with self-healing retries.",
    metrics: [
      { label: "Manual Hours Eliminated", value: "40+ hrs/wk" },
      { label: "Execution Reliability", value: "99.95%" },
      { label: "Event Ingest Latency", value: "<350ms" },
      { label: "Data Pipeline Sync", value: "Real-Time" },
    ],
    keyCapabilities: [
      "Custom webhook listeners, rate-limited job queues, and asynchronous workers",
      "Bi-directional synchronization between CRMs, billing systems, and data lakes",
      "Slack / Discord intelligent operational incident routing and interactive bots",
      "Automated Stripe invoice reconciliation, churn prediction, and customer onboarding",
      "AI-augmented data extraction, document parsing, and classification pipelines",
    ],
    techStack: ["n8n", "Python", "FastAPI", "Webhooks", "Stripe API", "Slack API", "PostgreSQL", "Redis"],
  },
  {
    id: "web-app",
    title: "High-Performance Web Platforms & SaaS Engineering",
    shortTitle: "Web & SaaS Apps",
    badge: "Next.js 15 & Cloud Native",
    icon: Globe,
    image: "/images/services/web-platform.jpg",
    headline: "Enterprise Full-Stack Applications, SaaS MVPs & Edge Platforms",
    description:
      "Engineered for sub-second global response times and conversion. From bespoke full-stack SaaS dashboards to high-authority corporate platforms built with Next.js App Router, TypeScript, Tailwind CSS, secure OAuth authentication, and global CDN caching.",
    metrics: [
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Global Edge Latency", value: "<50ms" },
      { label: "Core Web Vitals", value: "100% Pass" },
      { label: "Code Architecture", value: "Modular TS" },
    ],
    keyCapabilities: [
      "Next.js App Router server components with sub-second time-to-first-byte (TTFB)",
      "Secure role-based user authentication (NextAuth, Clerk, JWT, OAuth 2.0)",
      "Complex interactive dashboards with real-time data streaming and WebSockets",
      "Stripe recurring subscription billing, tier management, and customer portals",
      "Search-engine-optimized semantic markup, dynamic OpenGraph, and JSON-LD schemas",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase", "Node.js", "Vercel"],
  },
];

export default function ArchitectureShowcase() {
  const [activeTab, setActiveTab] = useState<string>("cloud-devops");

  const current = SHOWCASE_PILLARS.find((p) => p.id === activeTab) || SHOWCASE_PILLARS[0];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden w-full">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div
        className="section-container relative z-10"
        style={{ width: "100%", maxWidth: "72rem", marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          style={{ width: "100%", maxWidth: "48rem", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Layers className="h-3.5 w-3.5" />
            <span>Interactive Architecture &amp; Delivery Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
            Enterprise Engineering <span className="gradient-text">In Action</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            Explore how we architect production cloud environments, event-driven business automations,
            and high-performance web platforms for technology teams worldwide.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10"
          style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginLeft: "auto", marginRight: "auto" }}
        >
          {SHOWCASE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = activeTab === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-[1.02]"
                    : "bg-surface border-border text-text-secondary hover:text-text-primary hover:border-primary/40"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{pillar.shortTitle}</span>
                <span
                  className={`hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-surface-elevated text-text-tertiary"
                  }`}
                >
                  {pillar.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content: High-Fidelity Visual Architecture + Deep Technical Breakdown */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden"
          >
            {/* Visual Architecture Image Frame */}
            <div className="relative w-full aspect-[16/9] max-h-[520px] bg-slate-950 overflow-hidden border-b border-border group">
              <Image
                src={current.image}
                alt={`${current.title} — Production Cloud & DevOps Architecture Diagram by Ajay Autade`}
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1280px) 100vw, 1152px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />

              {/* Overlay Badge Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-white shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span>Production Architecture Spec</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-medium text-text-secondary">
                  <Terminal className="h-3 w-3 text-primary" />
                  <span>Verified Infrastructure Blueprint</span>
                </span>
              </div>
            </div>

            {/* Deep Technical Breakdown & Metrics Grid */}
            <div className="p-6 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-12 items-start">
                {/* Left 7 cols: Overview & Key Capabilities */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      Practice Practice Architecture
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-text-primary tracking-tight mt-1">
                      {current.headline}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                      {current.description}
                    </p>
                  </div>

                  {/* Capabilities Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
                      Architectural Deliverables &amp; Standards
                    </h4>
                    <div className="space-y-2">
                      {current.keyCapabilities.map((cap) => (
                        <div key={cap} className="flex items-start gap-2.5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                            {cap}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack chips */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {current.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-elevated border border-border text-text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 5 cols: SLA Metrics & Action Card */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 bg-surface-elevated/50 p-6 rounded-xl border border-border/70">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Performance Benchmarks
                    </span>
                    <h4 className="text-lg font-bold text-text-primary mt-1 mb-4">
                      Documented Production SLAs
                    </h4>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {current.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="p-3.5 rounded-lg bg-surface border border-border/60 text-center"
                        >
                          <div className="text-lg sm:text-xl font-extrabold text-primary">
                            {metric.value}
                          </div>
                          <div className="text-[11px] text-text-secondary font-medium mt-0.5">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/60 space-y-3">
                    <a
                      href="#scope-builder"
                      className="btn-primary w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Configure Scope for This Practice</span>
                    </a>
                    <a
                      href="mailto:contact@ajayautade.com?subject=Technical%20Consultation%20Inquiry&body=Hi%20Ajay%2C%0A%0AWe%20would%20like%20to%20discuss%20an%20engineering%20engagement%20for%20our%20team.%0A%0ACompany%3A%20%0ATechnical%20Focus%20(Cloud%2C%20Automation%2C%20or%20Web)%3A%20%0ACurrent%20Stack%3A%20%0AGoal%20%2F%20Timeline%3A%20%0A%0ABest%20regards%2C"
                      className="w-full py-2.5 rounded-lg border border-border text-xs sm:text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary/40 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Request Architecture Consultation</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
