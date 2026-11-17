"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { booking, bookingDays, formatHour, slotDate, type BookingDay } from "@/lib/booking";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/track";

type Status = "idle" | "sending" | "sent" | "error";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const strip = (value: string, max: number) => value.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").slice(0, max);

const fieldClass =
  "mt-2 block w-full rounded-sm border border-border-strong bg-bg px-3.5 py-3 text-base text-text-primary placeholder:text-text-quaternary focus:border-text-primary focus:outline-2 focus:outline-offset-2 focus:outline-text-primary";

const dayLabel = (day: BookingDay) => `${WEEKDAYS[(day.weekday + 6) % 7]} ${day.day} ${MONTHS[day.month]} ${day.year}`;

/**
 * The booking calendar. A native <dialog>, so focus trapping and Escape come
 * from the browser. It is a black stage in both themes, like the hero.
 */
export default function BookCallDialog({ source, onClose }: { source: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [now] = useState(() => Date.now());
  const days = useMemo(() => bookingDays(now), [now]);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [hour, setHour] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const day = days.find((d) => d.key === dayKey) ?? null;
  const slot = day && hour !== null ? slotDate(day, hour) : null;
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localTime = (date: Date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const localSlot = slot
    ? slot.toLocaleString([], { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
    : null;

  // Month label for the grid: "Nov 2026" or "Nov – Dec 2026".
  const bookable = days.filter((d) => d.bookable);
  const firstDay = bookable[0];
  const lastDay = bookable[bookable.length - 1];
  const monthLabel =
    firstDay && lastDay
      ? firstDay.month === lastDay.month
        ? `${MONTHS[firstDay.month]} ${firstDay.year}`
        : `${MONTHS[firstDay.month]} – ${MONTHS[lastDay.month]} ${lastDay.year}`
      : "";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const about = String(data.get("about") ?? "").trim();

    // Honeypot: real people never fill this in.
    if (data.get("company_website")) {
      setStatus("sent");
      return;
    }

    const next: Record<string, string> = {};
    if (!day || hour === null || !slot) next.slot = "Please pick a day and a time.";
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length > 0 || !day || hour === null || !slot) return;

    setStatus("sending");
    try {
      const when = `${dayLabel(day)}, ${formatHour(hour)} ${booking.timeZoneLabel}`;
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.formAccessKey,
          subject: `Call request: ${when}`,
          from_name: "ajayautade.com",
          name: strip(name, 100),
          email: email.slice(0, 254),
          requested_time: when,
          requested_time_utc: slot.toISOString(),
          visitor_time_zone: localZone,
          visitor_local_time: localSlot ?? "",
          message: strip(about, 1500) || "(no note)",
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error("Form service rejected the request");
      trackEvent("booking_requested", { source, weekday: WEEKDAYS[(day.weekday + 6) % 7], hour });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === ref.current) ref.current?.close();
      }}
      aria-labelledby="book-call-title"
      className="stage m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-sm border border-border-strong p-0 backdrop:bg-black/75"
    >
      <div className="p-6 sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="type-eyebrow text-text-tertiary">Free · {booking.minutes} minutes · video call</p>
            <h2 id="book-call-title" className="mt-3 type-display-md text-text-primary text-balance">
              Book an intro call
            </h2>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-text-tertiary transition-colors hover:text-text-primary"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {status === "sent" ? (
          <div role="status" className="mt-8">
            <Check className="h-6 w-6 text-success" aria-hidden="true" />
            <p className="mt-4 type-headline text-text-primary">Request sent.</p>
            <p className="mt-3 max-w-lg text-text-secondary">
              {day && hour !== null && (
                <>
                  You asked for{" "}
                  <strong className="text-text-primary">
                    {dayLabel(day)}, {formatHour(hour)} {booking.timeZoneLabel}
                  </strong>
                  .{" "}
                </>
              )}
              I&rsquo;ll confirm by email with a video link, or suggest another time if that one is taken.
            </p>
            <button type="button" onClick={() => ref.current?.close()} className="btn-outline mt-7">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-6">
            <p className="max-w-lg text-text-secondary">
              Tell me what you run and what is bothering you. No preparation needed, and no charge. Pick a time and
              I&rsquo;ll confirm it by email.
            </p>

            <fieldset className="mt-8">
              <legend className="flex w-full items-baseline justify-between type-eyebrow text-text-secondary">
                <span>1. Pick a day</span>
                <span className="font-mono normal-case tracking-normal text-text-tertiary">{monthLabel}</span>
              </legend>
              <div className="mt-3 grid grid-cols-7 gap-1" role="group" aria-label="Available days">
                {WEEKDAYS.map((name) => (
                  <span key={name} className="pb-1 text-center type-eyebrow text-text-quaternary" aria-hidden="true">
                    {name}
                  </span>
                ))}
                {days.map((d) => {
                  const selected = d.key === dayKey;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      disabled={!d.bookable}
                      aria-pressed={selected}
                      aria-label={dayLabel(d)}
                      onClick={() => {
                        setDayKey(d.key);
                        setHour(null);
                      }}
                      className={`flex h-11 items-center justify-center rounded-sm border font-mono text-sm transition-colors ${
                        selected
                          ? "border-text-primary bg-text-primary text-bg"
                          : d.bookable
                            ? "border-border-strong text-text-primary hover:border-text-primary"
                            : "border-transparent text-text-quaternary opacity-50"
                      }`}
                    >
                      {d.day}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-8" disabled={!day}>
              <legend className="type-eyebrow text-text-secondary">2. Pick a time</legend>
              {!day ? (
                <p className="mt-3 text-sm text-text-tertiary">Choose a day first.</p>
              ) : (
                <>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {booking.startHours.map((h) => {
                      const selected = h === hour;
                      const local = localTime(slotDate(day, h));
                      return (
                        <button
                          key={h}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setHour(h)}
                          className={`flex min-h-12 flex-col items-center justify-center rounded-sm border px-2 py-1.5 transition-colors ${
                            selected
                              ? "border-text-primary bg-text-primary text-bg"
                              : "border-border-strong text-text-primary hover:border-text-primary"
                          }`}
                        >
                          <span className="font-mono text-sm">
                            {formatHour(h)} {booking.timeZoneLabel}
                          </span>
                          <span className={`text-xs ${selected ? "" : "text-text-tertiary"}`}>{local} your time</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-text-tertiary">
                    Times are India Standard Time. &ldquo;Your time&rdquo; uses your device&rsquo;s time zone ({localZone}).
                  </p>
                </>
              )}
              {errors.slot && (
                <p role="alert" className="mt-2 text-sm text-primary">
                  {errors.slot}
                </p>
              )}
            </fieldset>

            <fieldset className="mt-8">
              <legend className="type-eyebrow text-text-secondary">3. Your details</legend>
              <div className="mt-1 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="bc-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="bc-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Name"
                    required
                    maxLength={100}
                    aria-invalid={Boolean(errors.name)}
                    className={fieldClass}
                  />
                  {errors.name && <p className="mt-2 text-sm text-primary">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="bc-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="bc-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                    maxLength={254}
                    aria-invalid={Boolean(errors.email)}
                    className={fieldClass}
                  />
                  {errors.email && <p className="mt-2 text-sm text-primary">{errors.email}</p>}
                </div>
              </div>
              <label htmlFor="bc-about" className="sr-only">
                What would you like to talk about? (optional)
              </label>
              <textarea
                id="bc-about"
                name="about"
                rows={3}
                maxLength={1500}
                placeholder="What would you like to talk about? (optional)"
                className={`${fieldClass} mt-5`}
              />
            </fieldset>

            <div className="hidden" aria-hidden="true">
              <label>
                Company website
                <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {status === "error" && (
              <p role="alert" className="mt-5 text-sm text-primary">
                The request could not be sent. Please try again, or email{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>
                .
              </p>
            )}

            <div className="mt-8 flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:items-center">
              <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending
                  </>
                ) : (
                  <>
                    Request this time
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="text-sm text-text-tertiary" aria-live="polite">
                {day && hour !== null
                  ? `${dayLabel(day)}, ${formatHour(hour)} ${booking.timeZoneLabel}`
                  : "No time selected yet"}
              </p>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
