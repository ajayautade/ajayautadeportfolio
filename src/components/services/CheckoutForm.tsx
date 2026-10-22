"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  ArrowLeft,
  User,
  Mail,
  Building,
  Globe,
  Clock,
  ShieldCheck,
  Copy,
  CheckCheck,
  FileCode,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useCart } from "./CartProvider";

export default function CheckoutForm() {
  const { state, closeCheckout, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    timezone: "US Eastern (EST/EDT)",
    preferredChannel: "Slack Channel / Huddle",
    timeline: "Within 1–2 Weeks",
    requireNda: true,
    projectDescription: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const { isCheckoutOpen } = state;
  // Handle Escape key & body scroll lock
  // Use effect for keyboard Escape and body scroll lock
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeCheckout();
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
  }, [isCheckoutOpen, closeCheckout]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const getEmailBody = () => {
    const itemsList = state.items
      .map(
        (item) =>
          `• ${item.name} [${item.type.toUpperCase()}]${
            item.deliveryEstimate ? ` — Est: ${item.deliveryEstimate}` : ""
          }`
      )
      .join("\n");

    return `Hi Ajay,

We would like to request a formal technical proposal and Statement of Work (SOW) for an engineering engagement.

--- CONFIGURED SCOPE & CAPABILITIES ---
${itemsList || "• Full Architecture Consultation & Scoping"}

--- ORGANIZATION DETAILS ---
Name: ${formData.name}
Organization / Company: ${formData.company || "N/A"}
Work Email: ${formData.email}
Timezone / Region: ${formData.timezone}
Preferred Communication Channel: ${formData.preferredChannel}
Target Start / Completion Horizon: ${formData.timeline}
Mutual NDA Requested Prior to Kickoff: ${formData.requireNda ? "YES" : "NO"}

--- PROJECT OBJECTIVES & ARCHITECTURE SPECIFICATIONS ---
${formData.projectDescription || "Please provide recommendations based on the selected capabilities above."}

Looking forward to your architecture proposal and scheduling our initial technical discovery session.

Best regards,
${formData.name}`.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const emailBody = getEmailBody();
    const subject = `[SOW & Proposal Request] Engineering Engagement — ${
      formData.company || formData.name
    }`;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "da2a32de-3577-47d5-aeda-d5322f125776",
          name: formData.name.slice(0, 100),
          email: formData.email.slice(0, 254),
          subject: subject.slice(0, 200),
          message: emailBody,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error("Web3Forms error:", result);
        setErrorMessage(
          "Unable to submit proposal request online. Please email directly to contact@ajayautade.com."
        );
      }
    } catch (err) {
      console.error("Error submitting SOW request", err);
      setErrorMessage(
        "Network error submitting request. Please email directly to contact@ajayautade.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyInquiry = () => {
    navigator.clipboard.writeText(getEmailBody());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleReset = () => {
    clearCart();
    setIsSubmitted(false);
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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-bg border border-border rounded-2xl shadow-2xl overflow-hidden pointer-events-auto my-8 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-surface-elevated/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-text-primary">
                      {isSubmitted
                        ? "Proposal Request Ready"
                        : "Request Statement of Work & Proposal"}
                    </h2>
                    <p className="text-xs text-text-secondary">
                      {isSubmitted
                        ? "Your technical scope brief has been prepared"
                        : "Review your configured capabilities and submit your project requirements"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCheckout}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-surface-elevated transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {isSubmitted ? (
                  <div className="text-center py-6 space-y-6">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-text-primary">
                        Proposal Request Submitted Successfully!
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                        Thank you for submitting your scope brief. Your requirements have been sent directly to Ajay. I will review your specifications and respond with a formal Statement of Work within 24 hours.
                      </p>
                    </div>

                    {/* Pre-formatted block for copying */}
                    <div className="p-4 rounded-xl bg-surface border border-border text-left">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
                          Formatted Technical Scope Brief
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyInquiry}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {copied ? (
                            <>
                              <CheckCheck className="h-3.5 w-3.5" />
                              <span>Copied to Clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Brief</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-xs text-text-secondary font-mono whitespace-pre-wrap max-h-48 overflow-y-auto p-3 rounded-lg bg-surface-elevated">
                        {getEmailBody()}
                      </pre>
                    </div>

                    <div className="pt-4 flex items-center justify-center gap-3">
                      <button
                        onClick={handleReset}
                        className="btn-outline text-xs px-5 py-2.5"
                      >
                        Start New Scope Brief
                      </button>
                      <button
                        onClick={closeCheckout}
                        className="btn-primary text-xs px-6 py-2.5"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Scope Overview Card */}
                    <div className="p-4 rounded-xl bg-surface-elevated/70 border border-border/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block mb-2">
                        Configured Capabilities ({state.items.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {state.items.map((item) => (
                          <span
                            key={item.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface border border-border text-xs font-medium text-text-primary"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{item.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="e.g. Sarah Jenkins"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary placeholder:text-text-tertiary text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">
                          Work Email <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="sarah@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary placeholder:text-text-tertiary text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">
                          Company / Organization
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                          <input
                            type="text"
                            name="company"
                            placeholder="Acme Technologies Inc."
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary placeholder:text-text-tertiary text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">
                          Timezone / Region
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                          <select
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          >
                            <option value="US Eastern (EST/EDT)">US Eastern (EST/EDT)</option>
                            <option value="US Pacific (PST/PDT)">US Pacific (PST/PDT)</option>
                            <option value="US Central / Mountain (CST/MST)">US Central / Mountain (CST/MST)</option>
                            <option value="Europe / UK (GMT/BST)">Europe / UK (GMT/BST)</option>
                            <option value="Central Europe (CET/CEST)">Central Europe (CET/CEST)</option>
                            <option value="Asia / India (IST)">Asia / India (IST)</option>
                            <option value="Asia-Pacific (SGT/JST/AEST)">Asia-Pacific (SGT / JST / AEST)</option>
                            <option value="Other Global Region">Other Global Region</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">
                          Preferred Communication Channel
                        </label>
                        <select
                          name="preferredChannel"
                          value={formData.preferredChannel}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        >
                          <option value="Slack Channel / Huddle">Dedicated Slack Channel / Huddle</option>
                          <option value="Google Meet / Zoom Call">Google Meet / Zoom Video Call</option>
                          <option value="Microsoft Teams">Microsoft Teams</option>
                          <option value="Email / Async">Email / Async Documentation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">
                          Target Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        >
                          <option value="Immediate / Emergency Sprint (1–3 Days)">Immediate Sprint (1–3 Days)</option>
                          <option value="Within 1–2 Weeks">Within 1–2 Weeks</option>
                          <option value="Within 2–4 Weeks">Within 2–4 Weeks</option>
                          <option value="Long-term Ongoing Retainer">Long-Term Retainer / Monthly SRE</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">
                        Technical Requirements &amp; Existing Tech Stack
                      </label>
                      <textarea
                        name="projectDescription"
                        rows={3}
                        placeholder="Brief overview of your architecture, goals, existing cloud provider (AWS/GCP), code repositories, or specific bottlenecks..."
                        value={formData.projectDescription}
                        onChange={handleChange}
                        className="w-full p-3.5 rounded-xl border border-border bg-surface text-text-primary placeholder:text-text-tertiary text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none leading-relaxed"
                      />
                    </div>

                    {/* NDA Checkbox */}
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-elevated/60 border border-border">
                      <input
                        type="checkbox"
                        id="requireNda"
                        name="requireNda"
                        checked={formData.requireNda}
                        onChange={handleChange}
                        className="h-4 w-4 rounded text-primary focus:ring-primary border-border bg-surface cursor-pointer"
                      />
                      <label
                        htmlFor="requireNda"
                        className="text-xs text-text-secondary cursor-pointer select-none"
                      >
                        <strong className="text-text-primary">Request Mutual NDA:</strong> Please provide a standard mutual Non-Disclosure Agreement before technical repository access.
                      </label>
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-500 text-center">
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn-primary w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 cursor-pointer ${
                          isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Submitting Proposal Request...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>Submit Architecture Proposal Request</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-text-tertiary">
                      All communications are strictly confidential. We respond with a tailored Statement of Work within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
