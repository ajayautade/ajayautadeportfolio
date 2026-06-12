"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  Clock,
  Calendar,
} from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { personalInfo } from "@/lib/data";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formState.subject
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    )}`;
    window.open(mailtoUrl, "_blank");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="section-container relative z-10">
        <ScrollReveal>
          <SectionHeading
            title="Let's Work Together"
            subtitle="Looking for a DevOps Engineer who can hit the ground running? Let's talk."
          />
        </ScrollReveal>

        {/* Availability Banner */}
        <ScrollReveal delay={0.1}>
          <div className="mx-auto max-w-2xl mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 rounded-2xl border border-success/20 bg-success/5 p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
                </span>
                <span className="text-sm font-semibold text-success">
                  Available for Hire
                </span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-text-secondary">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs">Responds within 24 hours</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-text-secondary">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs">Can start immediately</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Actions */}
        <ScrollReveal delay={0.15}>
          <div className="mx-auto max-w-3xl mb-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="group card p-4 sm:p-5 flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 sm:gap-0 hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:mb-3 group-hover:bg-primary/20 transition-colors">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-text-primary">Email Me</h3>
                <p className="text-xs text-text-tertiary truncate">
                  {personalInfo.email}
                </p>
              </div>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group card p-4 sm:p-5 flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 sm:gap-0 hover:border-[#0A66C2]/40 transition-all duration-300"
            >
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] sm:mb-3 group-hover:bg-[#0A66C2]/20 transition-colors">
                <LinkedinIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-text-primary">
                  Connect on LinkedIn
                </h3>
                <p className="text-xs text-text-tertiary">
                  Let&apos;s grow our network
                </p>
              </div>
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group card p-4 sm:p-5 flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 sm:gap-0 hover:border-text-primary/20 transition-all duration-300"
            >
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-text-primary/10 text-text-primary sm:mb-3 group-hover:bg-text-primary/20 transition-colors">
                <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-text-primary">
                  Check My Code
                </h3>
                <p className="text-xs text-text-tertiary">
                  Open-source projects &amp; contributions
                </p>
              </div>
            </a>
          </div>
        </ScrollReveal>

        {/* Send a Message Form */}
        <ScrollReveal delay={0.2}>
          <div className="mx-auto max-w-2xl">
            <div className="card p-6 sm:p-8 relative overflow-hidden">
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-success" />

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-text-primary">
                  Send a Message
                </h3>
                <p className="mt-2 text-sm text-text-tertiary">
                  Have a specific role in mind? Tell me about it.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} suppressHydrationWarning>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    required
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, subject: e.target.value }))
                    }
                    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="Job Opportunity — DevOps Engineer"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    placeholder="Hi Ajay, we have an opening for a DevOps Engineer and I'd love to discuss..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className={`mt-6 relative w-full flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden ${
                    isSubmitted
                      ? "bg-success text-white shadow-lg shadow-success/25"
                      : "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
                  }`}
                >
                  {!isSubmitted && (
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitted ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Contact details footer */}
              <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs text-text-tertiary">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {personalInfo.email}
                </a>
                <a
                  href={`tel:+91${personalInfo.phone}`}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  +91 {personalInfo.phone}
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {personalInfo.location}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
