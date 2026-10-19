"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, FileCode, ArrowRight, ShieldCheck, CheckCircle2, Clock } from "lucide-react";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { state, removeItem, clearCart, closeDrawer, openCheckout } = useCart();
  const { isDrawerOpen } = state;

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeDrawer();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isDrawerOpen, closeDrawer]);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "package":
        return "bg-primary/10 text-primary border-primary/20";
      case "specialized":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    }
  };

  return (
    <AnimatePresence>
      {state.isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-bg border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-surface-elevated/40">
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                <h2 className="text-base font-bold text-text-primary">
                  Solution Scope Brief
                </h2>
                <span className="text-xs text-text-tertiary font-medium">
                  ({state.items.length}{" "}
                  {state.items.length === 1 ? "capability" : "capabilities"})
                </span>
              </div>
              <button
                onClick={closeDrawer}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-surface-elevated transition-colors"
                aria-label="Close scope brief"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-elevated text-text-tertiary mb-4">
                    <FileCode className="h-8 w-8 opacity-40" />
                  </div>
                  <p className="text-text-primary font-bold text-base">
                    Your Scope Brief is Empty
                  </p>
                  <p className="text-xs text-text-secondary mt-1 max-w-xs leading-relaxed">
                    Select an engineering tier, specialized solution, or practice module to assemble your customized project scope.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-text-secondary">
                    <span className="font-semibold text-text-primary">Tailored Scope Assembly:</span> The capabilities below will be included in your Statement of Work (SOW) request.
                  </div>

                  {state.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-text-primary truncate">
                            {item.name}
                          </h4>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getTypeBadge(
                              item.type
                            )}`}
                          >
                            {item.type}
                          </span>
                        </div>
                        {item.deliveryEstimate && (
                          <div className="flex items-center gap-1 text-[11px] text-text-tertiary">
                            <Clock className="h-3 w-3 text-primary" />
                            <span>{item.deliveryEstimate}</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-tertiary hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="p-5 border-t border-border bg-surface-elevated/40 space-y-4">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-[11px] text-green-500">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>100% Client Ownership • Mutual NDA Available • SLA Warranty</span>
                </div>

                {/* Actions */}
                <button
                  onClick={openCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                >
                  <span>Request Statement of Work &amp; Proposal</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-xs text-text-tertiary hover:text-red-400 transition-colors py-1 text-center"
                >
                  Clear Scope Brief
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
