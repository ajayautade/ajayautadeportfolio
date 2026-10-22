"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { useCart } from "./CartProvider";
import { personalInfo } from "@/lib/data";

export default function ConsultationModal() {
  const { state, closeConsultation } = useCart();
  const { isConsultationOpen, consultationData } = state;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  // Synchronize initial data whenever consultation opens
  useEffect(() => {
    if (isConsultationOpen) {
      setFormState({
        name: "",
        email: "",
        subject:
          consultationData.subject ||
          "Consultation Request — Cloud & DevOps Engineering",
        message: consultationData.message || "",
      });
      setIsSubmitted(false);
      setErrorMessage("");
    }
  }, [isConsultationOpen, consultationData]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isConsultationOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeConsultation();
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
  }, [isConsultationOpen, closeConsultation]);

  const sanitize = (input: string, maxLength: number = 500) => {
    return input
      .replace(/<[^>]*>/g, "")
      .replace(/[<>]/g, "")
      .slice(0, maxLength);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Honeypot check
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }

    // Rate limiting: max 3 submissions per 5 minutes
    const now = Date.now();
    if (now - lastSubmitTime < 300000 && submitCount >= 3) {
      setErrorMessage(
        "Submission limit reached. Please email directly at contact@ajayautade.com"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "da2a32de-3577-47d5-aeda-d5322f125776",
          name: sanitize(formState.name, 100),
          email: formState.email.slice(0, 254),
          subject:
            sanitize(formState.subject, 200) ||
            "Consultation Request — Ajay Autade",
          message: sanitize(formState.message, 3000),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setSubmitCount((c) => c + 1);
        setLastSubmitTime(now);
      } else {
        console.error("Web3Forms error:", result);
        setErrorMessage(
          "Unable to submit form. Please send an email directly to contact@ajayautade.com."
        );
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setErrorMessage(
        "Network issue submitting form. Please send an email directly to contact@ajayautade.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isConsultationOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeConsultation}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              className="w-full max-w-2xl bg-bg border border-border rounded-2xl shadow-2xl overflow-hidden pointer-events-auto my-6 max-h-[92vh] flex flex-col relative"
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-success z-20" />

              {/* Close Button */}
              <button
                type="button"
                onClick={closeConsultation}
                className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-elevated text-text-tertiary hover:text-text-primary hover:border-primary/40 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {isSubmitted ? (
                  /* Success View */
                  <div className="text-center py-8 space-y-5">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-text-primary">
                        Message Sent Successfully!
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out. Your consultation request has
                        been delivered directly to Ajay. I typically review all
                        project briefs and respond within a few hours.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={closeConsultation}
                        className="btn-primary px-6 py-2.5 text-xs sm:text-sm font-semibold"
                      >
                        Done
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormState({
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                          });
                        }}
                        className="btn-outline px-5 py-2.5 text-xs font-semibold text-text-secondary hover:text-text-primary"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Consultation Form matching screenshot */
                  <>
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8 pr-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                        Send a Message
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-text-tertiary max-w-md mx-auto">
                        Have a specific project or engineering consultation in mind?
                        Tell me about it.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} suppressHydrationWarning>
                      {/* Honeypot */}
                      <input
                        type="text"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        style={{
                          position: "absolute",
                          left: "-9999px",
                          opacity: 0,
                          height: 0,
                          width: 0,
                        }}
                        aria-hidden="true"
                      />

                      {/* Name & Email Fields */}
                      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="consultation-name"
                            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                          >
                            NAME
                          </label>
                          <input
                            type="text"
                            id="consultation-name"
                            required
                            maxLength={100}
                            value={formState.name}
                            onChange={(e) =>
                              setFormState((s) => ({
                                ...s,
                                name: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="consultation-email"
                            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                          >
                            EMAIL
                          </label>
                          <input
                            type="email"
                            id="consultation-email"
                            required
                            maxLength={254}
                            value={formState.email}
                            onChange={(e) =>
                              setFormState((s) => ({
                                ...s,
                                email: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="mt-4 sm:mt-5">
                        <label
                          htmlFor="consultation-subject"
                          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                        >
                          SUBJECT
                        </label>
                        <input
                          type="text"
                          id="consultation-subject"
                          required
                          maxLength={200}
                          value={formState.subject}
                          onChange={(e) =>
                            setFormState((s) => ({
                              ...s,
                              subject: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                          placeholder="Job Opportunity — DevOps Engineer"
                        />
                      </div>

                      {/* Message */}
                      <div className="mt-4 sm:mt-5">
                        <label
                          htmlFor="consultation-message"
                          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                        >
                          MESSAGE
                        </label>
                        <textarea
                          id="consultation-message"
                          required
                          maxLength={3000}
                          rows={5}
                          value={formState.message}
                          onChange={(e) =>
                            setFormState((s) => ({
                              ...s,
                              message: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none leading-relaxed"
                          placeholder="Hi Ajay, we have an opening for a DevOps Engineer and I'd love to discuss..."
                        />
                      </div>

                      {errorMessage && (
                        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-500">
                          <span>{errorMessage}</span>{" "}
                          <a
                            href={`mailto:${personalInfo.email}`}
                            className="font-bold underline ml-1"
                          >
                            Click to Email Directly
                          </a>
                        </div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className={`mt-6 relative w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 px-4 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden cursor-pointer ${
                          isSubmitting
                            ? "bg-surface-elevated text-text-tertiary cursor-not-allowed border border-border"
                            : "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
                        }`}
                      >
                        {!isSubmitting && (
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending Message...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              <span>Send Message</span>
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>
                  </>
                )}

                {/* Contact details footer matching screenshot */}
                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-text-tertiary">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{personalInfo.email}</span>
                  </a>
                  <a
                    href={`mailto:${personalInfo.secondaryEmail}`}
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{personalInfo.secondaryEmail}</span>
                  </a>
                  <a
                    href={`tel:+91${personalInfo.phone}`}
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>+91 {personalInfo.phone}</span>
                  </a>
                  <span className="flex items-center gap-1.5 text-center sm:text-left">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{personalInfo.location}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
