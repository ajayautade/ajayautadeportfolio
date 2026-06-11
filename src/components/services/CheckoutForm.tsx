"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowLeft, User, Mail, Phone, FileText, Check } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/services-data";

export default function CheckoutForm() {
  const { state, closeCheckout, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build the email body
    const itemsList = state.items
      .map((item) => `• ${item.name} (${item.type}) — ${formatPrice(item.price)}`)
      .join("\n");

    const emailBody = `
Hi Ajay,

I'd like to inquire about your DevOps services.

--- ORDER SUMMARY ---
${itemsList}

Total: ${formatPrice(totalPrice)}

--- MY DETAILS ---
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

--- PROJECT DESCRIPTION ---
${formData.projectDescription}

Looking forward to hearing from you!
    `.trim();

    const subject = encodeURIComponent(
      `DevOps Service Inquiry — ${formatPrice(totalPrice)}`
    );
    const body = encodeURIComponent(emailBody);
    const mailtoUrl = `mailto:ajayautade2@gmail.com?subject=${subject}&body=${body}`;

    // Open the email client
    window.open(mailtoUrl, "_blank");
    setIsSubmitted(true);
  };

  const handleDone = () => {
    setIsSubmitted(false);
    clearCart();
    closeCheckout();
  };

  return (
    <AnimatePresence>
      {state.isCheckoutOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCheckout}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-bg border border-border rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-bg border-b border-border p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={closeCheckout}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-surface-elevated transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <h2 className="text-lg font-bold text-text-primary">Checkout</h2>
              </div>
              <button
                onClick={closeCheckout}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-surface-elevated transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {isSubmitted ? (
              /* Success State */
              <div className="p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Inquiry Sent!
                </h3>
                <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
                  Your service inquiry has been sent via email. I&apos;ll get back to you
                  within 24 hours with a detailed proposal.
                </p>
                <button
                  onClick={handleDone}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="p-5 sm:p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Order Summary */}
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                      Order Summary
                    </h3>
                    <div className="space-y-2">
                      {state.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-2 border-b border-border/50"
                        >
                          <div>
                            <p className="text-sm font-medium text-text-primary">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-text-tertiary uppercase">
                              {item.type}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-text-primary">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="text-sm font-semibold text-text-secondary">
                        Total
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                      Your Details
                    </h3>

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="checkout-name"
                        className="text-xs text-text-tertiary font-medium mb-1.5 flex items-center gap-1.5"
                      >
                        <User className="h-3 w-3" />
                        Name
                      </label>
                      <input
                        id="checkout-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="checkout-email"
                        className="text-xs text-text-tertiary font-medium mb-1.5 flex items-center gap-1.5"
                      >
                        <Mail className="h-3 w-3" />
                        Email
                      </label>
                      <input
                        id="checkout-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="checkout-phone"
                        className="text-xs text-text-tertiary font-medium mb-1.5 flex items-center gap-1.5"
                      >
                        <Phone className="h-3 w-3" />
                        Phone
                      </label>
                      <input
                        id="checkout-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXXXXXXX"
                        className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                      />
                    </div>

                    {/* Project Description */}
                    <div>
                      <label
                        htmlFor="checkout-project"
                        className="text-xs text-text-tertiary font-medium mb-1.5 flex items-center gap-1.5"
                      >
                        <FileText className="h-3 w-3" />
                        Project Description
                      </label>
                      <textarea
                        id="checkout-project"
                        name="projectDescription"
                        required
                        value={formData.projectDescription}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                    >
                      <Send className="h-4 w-4" />
                      Send Inquiry
                    </button>

                    <p className="text-[10px] text-text-tertiary text-center">
                      This will open your email client with a pre-filled message.
                      No payment is collected at this stage.
                    </p>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
