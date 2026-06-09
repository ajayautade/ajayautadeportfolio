"use client";

import { motion } from "framer-motion";
import { Check, X, Clock, ShoppingCart } from "lucide-react";
import type { ServicePackage, ServiceAddOn } from "@/lib/services-data";
import { formatPrice } from "@/lib/services-data";
import { useCart } from "./CartProvider";

// ============================================
// MAIN SERVICE PACKAGE CARD
// ============================================

export function ServicePackageCard({ service }: { service: ServicePackage }) {
  const { addItem, state } = useCart();
  const Icon = service.icon;
  const isInCart = state.items.some((i) => i.id === service.id);

  const handleAdd = () => {
    addItem({
      id: service.id,
      name: service.name,
      price: service.price,
      currency: service.currency,
      type: "package",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative card p-0 h-full flex flex-col overflow-hidden ${
        service.popular ? "border-primary/50 shadow-lg shadow-primary/10" : ""
      }`}
    >
      {/* Popular badge */}
      {service.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent py-1.5 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">
            Most Popular
          </span>
        </div>
      )}

      <div className={`p-6 sm:p-8 flex-1 flex flex-col ${service.popular ? "pt-10" : ""}`}>
        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">{service.name}</h3>
            <p className="text-[11px] text-text-tertiary">{service.tagline}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-text-primary">
              {formatPrice(service.price)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-text-tertiary text-xs">
            <Clock className="h-3 w-3" />
            Delivery in {service.deliveryDays} days
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Feature list */}
        <div className="space-y-2.5 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary mb-2">
            What you get
          </p>
          {service.features.map((feature) => (
            <div key={feature.text} className="flex items-start gap-2.5">
              {feature.included ? (
                <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
              ) : (
                <X className="h-4 w-4 text-text-tertiary/40 mt-0.5 shrink-0" />
              )}
              <span
                className={`text-sm ${
                  feature.included
                    ? "text-text-secondary"
                    : "text-text-tertiary/50 line-through"
                }`}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          disabled={isInCart}
          className={`mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
            isInCart
              ? "bg-green-500/10 text-green-400 border border-green-500/30 cursor-default"
              : service.popular
                ? "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-md shadow-primary/20"
                : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
          }`}
        >
          {isInCart ? (
            <>
              <Check className="h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ============================================
// ADD-ON CARD
// ============================================

export function AddOnCard({ addon }: { addon: ServiceAddOn }) {
  const { addItem, state } = useCart();
  const Icon = addon.icon;
  const isInCart = state.items.some((i) => i.id === addon.id);

  const handleAdd = () => {
    addItem({
      id: addon.id,
      name: addon.name,
      price: addon.price,
      currency: addon.currency,
      type: "addon",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card p-5 flex items-center gap-4"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-elevated text-primary">
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-text-primary">{addon.name}</h4>
        <p className="text-xs text-text-tertiary mt-0.5 truncate">
          {addon.description}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-text-primary">
          {formatPrice(addon.price)}
        </p>
        <button
          onClick={handleAdd}
          disabled={isInCart}
          className={`mt-1 text-[11px] font-medium px-3 py-1 rounded-full transition-colors ${
            isInCart
              ? "bg-green-500/10 text-green-400"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}
        >
          {isInCart ? "Added ✓" : "+ Add"}
        </button>
      </div>
    </motion.div>
  );
}
