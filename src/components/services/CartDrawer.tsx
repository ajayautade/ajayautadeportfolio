"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/services-data";

export default function CartDrawer() {
  const { state, removeItem, clearCart, closeDrawer, openCheckout, totalPrice } =
    useCart();

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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
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
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold text-text-primary">Your Cart</h2>
                <span className="text-xs text-text-tertiary">
                  ({state.items.length} {state.items.length === 1 ? "item" : "items"})
                </span>
              </div>
              <button
                onClick={closeDrawer}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-surface-elevated transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-12 w-12 text-text-tertiary/30 mb-4" />
                  <p className="text-text-secondary font-medium">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-text-tertiary mt-1">
                    Browse services and add them to your cart
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-text-primary truncate">
                            {item.name}
                          </h4>
                          <span
                            className={`text-[9px] font-medium uppercase px-1.5 py-0.5 rounded-full ${
                              item.type === "package"
                                ? "bg-primary/10 text-primary"
                                : "bg-accent/10 text-accent"
                            }`}
                          >
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-primary mt-0.5">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-tertiary hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
              <div className="p-5 border-t border-border space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Total</span>
                  <span className="text-xl font-bold text-text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Actions */}
                <button
                  onClick={openCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-xs text-text-tertiary hover:text-red-400 transition-colors py-1"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
