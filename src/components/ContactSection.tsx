"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
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


const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: `+91 ${personalInfo.phone}`,
    href: `tel:+91${personalInfo.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: "#",
  },
];

const socialLinks = [
  { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
  { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

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
    <section id="contact" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title="Get In Touch"
            subtitle="Have a project in mind or want to hire me? Let's connect!"
          />
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-3">
            {contactInfo.map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 0.1}>
                <a href={item.href} className="card flex items-center gap-3 p-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-elevated text-primary">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-text-tertiary uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-text-primary truncate group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              </ScrollReveal>
            ))}

            {/* Social Links */}
            <ScrollReveal delay={0.3}>
              <div className="card p-4">
                <p className="mb-3 text-xs font-medium text-text-tertiary uppercase tracking-wide">
                  Connect
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-tertiary transition-all hover:border-primary hover:text-primary hover:-translate-y-0.5"
                      aria-label={link.label}
                    >
                      <link.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal direction="right" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card p-5 sm:p-6" suppressHydrationWarning>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-medium text-text-secondary"
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
                    className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-medium text-text-secondary"
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
                    className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-xs font-medium text-text-secondary"
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
                  className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none transition-colors"
                  placeholder="Job Opportunity"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-medium text-text-secondary"
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
                  className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Hi Ajay, I'd like to discuss..."
                />
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className={`btn-primary w-full ${isSubmitted ? "!bg-success" : ""}`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
