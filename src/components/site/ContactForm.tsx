"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/track";

const TOPICS = [
  "Cloud infrastructure on AWS",
  "CI/CD automation",
  "Docker & Kubernetes",
  "Infrastructure as Code",
  "Monitoring & observability",
  "A consultation call",
  "Pricing or a quote",
  "A role or interview",
  "Something else",
] as const;

type Status = "idle" | "sending" | "sent" | "error";

const strip = (value: string, max: number) => value.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").slice(0, max);

const fieldClass =
  "mt-2 block w-full rounded-sm border border-border-strong bg-bg px-3.5 py-3 text-base text-text-primary placeholder:text-text-quaternary focus:border-text-primary focus:outline-2 focus:outline-offset-2 focus:outline-text-primary";

/** The contact form, prefilled from `?topic=` and `?summary=`. Needs a Suspense boundary above it. */
export function ContactFormFromQuery() {
  const params = useSearchParams();
  const topic = params.get("topic") ?? undefined;
  const summary = params.get("summary") ?? undefined;
  return (
    <ContactForm
      defaultTopic={TOPICS.find((known) => known === topic)}
      defaultMessage={summary ? strip(summary, 3000) : undefined}
    />
  );
}

export default function ContactForm({ defaultTopic, defaultMessage }: { defaultTopic?: string; defaultMessage?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastSent, setLastSent] = useState(0);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();

    // Honeypot: real people never fill this in. Pretend success and send nothing.
    if (data.get("company_website")) {
      setStatus("sent");
      return;
    }

    const next: Record<string, string> = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 20) next.message = "Please add a little more detail (at least 20 characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }

    // Simple client-side throttle: one message per 30 seconds.
    if (Date.now() - lastSent < 30_000) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.formAccessKey,
          subject: `Website inquiry: ${topic}`,
          from_name: "ajayautade.com",
          name: strip(name, 100),
          email: email.slice(0, 254),
          topic,
          message: strip(message, 3000),
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error("Form service rejected the message");
      setLastSent(Date.now());
      trackEvent("contact_submitted", { topic });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="card p-8">
        <Check className="h-6 w-6 text-success" aria-hidden="true" />
        <h3 className="mt-4 type-headline text-text-primary">Message sent.</h3>
        <p className="mt-3 text-text-secondary">
          Thanks for getting in touch. I read everything myself and reply by email.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-outline mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="type-eyebrow text-text-secondary">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className={fieldClass}
          />
          {errors.name && (
            <p id="cf-name-error" className="mt-2 text-sm text-primary">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-email" className="type-eyebrow text-text-secondary">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={fieldClass}
          />
          {errors.email && (
            <p id="cf-email-error" className="mt-2 text-sm text-primary">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="cf-topic" className="type-eyebrow text-text-secondary">
          What is it about?
        </label>
        <select id="cf-topic" name="topic" defaultValue={defaultTopic ?? TOPICS[0]} className={fieldClass}>
          {TOPICS.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="type-eyebrow text-text-secondary">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          required
          maxLength={3000}
          defaultValue={defaultMessage}
          placeholder="What are you running today, and what would you like to change?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={fieldClass}
        />
        {errors.message && (
          <p id="cf-message-error" className="mt-2 text-sm text-primary">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot field, hidden from people and assistive tech */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-primary">
          The message could not be sent. Please try again in a moment, or email{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>{" "}
          directly.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
