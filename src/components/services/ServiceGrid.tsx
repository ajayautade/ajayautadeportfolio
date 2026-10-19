"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  servicePackages,
  serviceAddOns,
  specializedServices,
  type ServiceCategory,
} from "@/lib/services-data";
import {
  ServicePackageCard,
  SpecializedServiceCard,
  AddOnCard,
} from "./ServiceCard";
import {
  Sparkles,
  Cloud,
  Bot,
  Globe,
  Layers,
  Zap,
  Wrench,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function ServiceGrid() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");

  // Filter packages based on active category
  const filteredPackages = servicePackages.filter((pkg) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "cloud-devops")
      return pkg.category === "cloud-devops" || pkg.category === "bundle";
    if (activeCategory === "automation")
      return pkg.category === "automation" || pkg.category === "bundle";
    if (activeCategory === "web-app")
      return pkg.category === "web-app" || pkg.category === "bundle";
    return true;
  });

  const filteredSpecialized = specializedServices.filter((srv) => {
    if (activeCategory === "all") return true;
    return srv.category === activeCategory;
  });

  return (
    <section id="practices" className="py-16 sm:py-20 w-full">
      <div
        className="section-container"
        style={{ width: "100%", maxWidth: "72rem", marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Section Heading & Category Tabs */}
        <div
          className="text-center max-w-2xl mx-auto mb-12"
          style={{ width: "100%", maxWidth: "44rem", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            Core Service Engagements
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-3">
            Structured Technical Solutions
          </h2>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            Tailored engineering engagements for scaling startups, modern tech companies, and enterprise teams globally. Every engagement includes complete code ownership, automated verification, and post-launch SLA warranty.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginLeft: "auto", marginRight: "auto" }}
          >
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/40"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>All Disciplines</span>
            </button>

            <button
              onClick={() => setActiveCategory("cloud-devops")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === "cloud-devops"
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/40"
              }`}
            >
              <Cloud className="h-3.5 w-3.5" />
              <span>Cloud &amp; DevOps CI/CD</span>
            </button>

            <button
              onClick={() => setActiveCategory("automation")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === "automation"
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/40"
              }`}
            >
              <Bot className="h-3.5 w-3.5" />
              <span>Workflow Automation</span>
            </button>

            <button
              onClick={() => setActiveCategory("web-app")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === "web-app"
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/40"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Websites &amp; SaaS Platforms</span>
            </button>
          </div>
        </div>

        {/* Core Practice Tiers */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {filteredPackages.map((service) => (
            <ServicePackageCard key={service.id} service={service} />
          ))}
        </div>

        {/* Specialized Single-Milestone Solutions */}
        {filteredSpecialized.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  Focused Implementations
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mt-1">
                  Specialized Technical Practice Solutions
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  Targeted, high-velocity engineering engagements delivered in 3 to 10 business days.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredSpecialized.map((service) => (
                <SpecializedServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Add-on Services & Retainers */}
        <div className="mt-16 sm:mt-24">
          <div
            className="text-center mb-8"
            style={{ width: "100%", maxWidth: "42rem", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated text-text-secondary text-xs font-semibold mb-2">
              <Zap className="h-3.5 w-3.5 text-accent" />
              <span>Modular Enhancements</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
              Engineering Add-Ons &amp; SRE Retainers
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Augment any engagement with dedicated monitoring clusters, security compliance audits, cloud cost optimization, or ongoing Fractional SRE support.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAddOns.map((addon) => (
              <AddOnCard key={addon.id} addon={addon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
