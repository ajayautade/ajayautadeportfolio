"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Check,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  CheckCircle2,
  Calendar,
  FileCode,
  Terminal,
} from "lucide-react";
import type {
  ServicePackage,
  ServiceAddOn,
  SpecializedService,
} from "@/lib/services-data";
import { useCart } from "./CartProvider";

// ============================================
// MAIN SERVICE ENGAGEMENT CARD (TIERS)
// ============================================

export function ServicePackageCard({ service }: { service: ServicePackage }) {
  const { addItem, state } = useCart();
  const Icon = service.icon;
  const isInCart = state.items.some((i) => i.id === service.id);

  const handleToggle = () => {
    addItem({
      id: service.id,
      name: service.name,
      category: service.category,
      type: "package",
      deliveryEstimate: service.deliveryDays,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative card p-0 h-full flex flex-col overflow-hidden transition-all duration-300 ${
        service.popular
          ? "border-primary/60 shadow-xl shadow-primary/10 ring-1 ring-primary/40"
          : "hover:border-primary/40"
      }`}
    >
      {/* Popular or Category badge */}
      {service.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary via-indigo-500 to-accent py-1.5 text-center z-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white flex items-center justify-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            {service.badge || "Most Selected Solution"}
          </span>
        </div>
      )}

      {service.badge && !service.popular && (
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {service.badge}
          </span>
        </div>
      )}

      {/* Visual Header Image if available */}
      {service.image && (
        <div className="relative w-full h-44 bg-slate-950 overflow-hidden border-b border-border">
          <Image
            src={service.image}
            alt={`${service.name} — Engineering Capability Architecture by Ajay Autade`}
            fill
            className="object-cover object-center opacity-85 transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 380px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>
      )}

      <div
        className={`p-6 sm:p-7 flex-1 flex flex-col ${
          service.popular && !service.image ? "pt-10" : ""
        }`}
      >
        {/* Icon + Title */}
        <div className="flex items-start gap-3.5 mb-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white shadow-md shadow-primary/20`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0 pr-6">
            <h3 className="text-xl font-bold text-text-primary tracking-tight">
              {service.name}
            </h3>
            <p className="text-xs text-text-secondary mt-0.5 font-medium">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Engagement Horizon Banner */}
        <div className="mb-5 p-3.5 rounded-xl bg-surface-elevated/70 border border-border/80">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                Engagement Model
              </span>
              <div className="text-sm font-bold text-text-primary">
                {service.engagementModel}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                Turnaround
              </span>
              <div className="text-xs font-semibold text-primary flex items-center gap-1 justify-end">
                <Clock className="h-3 w-3" />
                <span>{service.deliveryDays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block mb-2">
            Engineered With
          </span>
          <div className="flex flex-wrap gap-1.5">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface border border-border text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features Included */}
        <div className="space-y-2.5 mb-6 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block mb-1">
            Deliverables &amp; Architectural Scope
          </span>
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              {feature.included ? (
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/15 text-success mt-0.5">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
              ) : (
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-text-tertiary mt-0.5">
                  <X className="h-2.5 w-2.5" />
                </div>
              )}
              <span
                className={
                  feature.included
                    ? "text-text-primary font-medium"
                    : "text-text-tertiary line-through"
                }
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-4 border-t border-border/80 flex flex-col gap-2">
          <button
            onClick={handleToggle}
            className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              isInCart
                ? "bg-success/15 text-success border border-success/30 hover:bg-success/20"
                : service.popular
                ? "bg-primary text-white shadow-lg shadow-primary/25 hover:opacity-95"
                : "bg-surface border border-border text-text-primary hover:border-primary/50 hover:bg-surface-elevated"
            }`}
          >
            {isInCart ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Selected in Scope Brief</span>
              </>
            ) : (
              <>
                <FileCode className="h-4 w-4" />
                <span>Add to Scope Brief</span>
              </>
            )}
          </button>

          <a
            href="mailto:contact@ajayautade.com?subject=Statement%20of%20Work%20Request%20%E2%80%94%20Engagement&body=Hi%20Ajay%2C%0A%0AWe%20are%20interested%20in%20engaging%20your%20team%20for%20a%20technical%20solution.%0A%0ACompany%3A%20%0APreferred%20Tier%20%2F%20Scope%3A%20%0AGoal%20%26%20Timeline%3A%20%0A%0ABest%20regards%2C"
            className="w-full py-2 text-center text-xs text-text-secondary hover:text-primary transition-colors flex items-center justify-center gap-1"
          >
            <span>Request Detailed SOW</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// SPECIALIZED PRACTICE CARD
// ============================================

export function SpecializedServiceCard({
  service,
}: {
  service: SpecializedService;
}) {
  const { addItem, state } = useCart();
  const Icon = service.icon;
  const isInCart = state.items.some((i) => i.id === service.id);

  const handleToggle = () => {
    addItem({
      id: service.id,
      name: service.name,
      category: service.category,
      type: "specialized",
      deliveryEstimate: service.deliveryDays,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="card p-5 sm:p-6 flex flex-col justify-between border hover:border-primary/40 transition-all duration-300 group"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-elevated border border-border text-text-tertiary">
            {service.deliveryDays}
          </span>
        </div>

        <h4 className="text-base font-bold text-text-primary mb-1">
          {service.name}
        </h4>
        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Highlights */}
        <div className="space-y-1.5 mb-5">
          {service.highlights.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11px] text-text-secondary">
              <Check className="h-3 w-3 text-accent shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-text-tertiary">
          {service.engagementModel}
        </span>

        <button
          onClick={handleToggle}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            isInCart
              ? "bg-success/15 text-success border border-success/30"
              : "bg-surface-elevated hover:bg-primary hover:text-white text-text-primary border border-border"
          }`}
        >
          {isInCart ? "In Scope" : "+ Add to Scope"}
        </button>
      </div>
    </motion.div>
  );
}

// ============================================
// ADD-ON / ENHANCEMENT CARD
// ============================================

export function AddOnCard({ addon }: { addon: ServiceAddOn }) {
  const { addItem, state } = useCart();
  const Icon = addon.icon;
  const isInCart = state.items.some((i) => i.id === addon.id);

  const handleToggle = () => {
    addItem({
      id: addon.id,
      name: addon.name,
      category: addon.category,
      type: "addon",
      deliveryEstimate: addon.deliveryDays,
    });
  };

  return (
    <div className="p-4 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-elevated text-primary mt-0.5">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h5 className="text-sm font-bold text-text-primary">{addon.name}</h5>
          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
            {addon.description}
          </p>
          <span className="text-[10px] text-text-tertiary mt-1 inline-block">
            {addon.engagementModel} • {addon.deliveryDays}
          </span>
        </div>
      </div>

      <button
        onClick={handleToggle}
        className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          isInCart
            ? "bg-success/15 text-success border border-success/30"
            : "bg-surface-elevated hover:bg-primary hover:text-white border border-border text-text-primary"
        }`}
      >
        {isInCart ? "Included" : "Include"}
      </button>
    </div>
  );
}
