"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function ServicesPageHero() {
  const { itemCount, toggleDrawer } = useCart();

  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 section-container">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <button
            onClick={toggleDrawer}
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-text-secondary hover:text-primary hover:border-primary/50 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm font-medium">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Available for Freelance Projects
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
            DevOps{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Services
            </span>
          </h1>

          <p className="mt-4 text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            From containerization to full-scale cloud infrastructure — I help
            teams ship faster, scale smarter, and sleep better at night.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
