"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { nextRuns, parseCron } from "@/lib/cron";
import { trackEvent } from "@/lib/track";
import { Examples, FieldLabel, inputClass, Row } from "./fields";

const EXAMPLES = ["0 2 * * *", "*/15 * * * *", "0 9-17 * * 1-5", "30 4 1,15 * *", "0 0 * * 0", "@hourly"];

export default function CronExplainer() {
  const [input, setInput] = useState("0 2 * * *");
  const [utc, setUtc] = useState(true);
  // The clock is read after mount, so the server-rendered HTML and the first client render agree.
  const [now, setNow] = useState<Date | null>(null);
  const used = useRef(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setNow(new Date()));
    return () => cancelAnimationFrame(id);
  }, []);

  const parsed = useMemo(() => parseCron(input), [input]);
  const runs = useMemo(() => (now && !("error" in parsed) ? nextRuns(parsed, now, 5, utc) : []), [parsed, now, utc]);

  function change(value: string) {
    setInput(value);
    if (!used.current) {
      used.current = true;
      trackEvent("tool_used", { tool: "cron" });
    }
  }

  const format = (date: Date, timeZone?: string) =>
    date.toLocaleString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    });

  return (
    <div>
      <FieldLabel htmlFor="cron-input" hint="minute hour day-of-month month day-of-week">
        Cron expression
      </FieldLabel>
      <input
        id="cron-input"
        value={input}
        onChange={(event) => change(event.target.value)}
        spellCheck={false}
        autoComplete="off"
        aria-invalid={"error" in parsed}
        aria-describedby={"error" in parsed ? "cron-error" : "cron-summary"}
        className={`${inputClass} max-w-xl text-lg`}
      />
      <Examples items={EXAMPLES} onPick={change} />

      {"error" in parsed ? (
        <p id="cron-error" role="alert" className="mt-6 text-primary">
          {parsed.error}
        </p>
      ) : (
        <>
          <section aria-labelledby="cron-meaning" className="panel mt-10 p-6 sm:p-8">
            <h2 id="cron-meaning" className="type-eyebrow text-text-tertiary">
              In plain English
            </h2>
            <p id="cron-summary" aria-live="polite" className="mt-3 type-display-md text-text-primary text-balance">
              {parsed.summary}
            </p>
            {parsed.fields[2].any === false && parsed.fields[4].any === false && (
              <p className="mt-4 max-w-2xl text-sm text-text-secondary">
                Both day fields are set. Cron runs the job when <strong className="text-text-primary">either</strong> one
                matches, not only when both do.
              </p>
            )}
            <dl className="mt-6 border-t border-text-primary">
              {parsed.fields.map((field) => (
                <Row key={field.label} label={field.label} value={field.raw} note={field.meaning} />
              ))}
            </dl>
          </section>

          <section aria-labelledby="cron-next" className="mt-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="cron-next" className="type-headline text-text-primary">
                Next 5 runs
              </h2>
              <div role="radiogroup" aria-label="Clock the server uses" className="flex gap-2">
                {[
                  { value: true, label: "Server on UTC" },
                  { value: false, label: "Server on my time zone" },
                ].map((option) => (
                  <label key={option.label} className="relative">
                    <input
                      type="radio"
                      name="cron-clock"
                      checked={utc === option.value}
                      onChange={() => setUtc(option.value)}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-11 cursor-pointer items-center rounded-sm border border-border-strong px-3.5 text-sm font-medium text-text-primary transition-colors hover:border-text-primary peer-checked:border-text-primary peer-checked:bg-text-primary peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-text-primary">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-6 overflow-x-auto border-t border-text-primary">
              <table className="w-full min-w-[30rem] text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="py-3 pr-4 type-eyebrow text-text-tertiary">#</th>
                    <th scope="col" className="py-3 pr-4 type-eyebrow text-text-tertiary">UTC</th>
                    <th scope="col" className="py-3 type-eyebrow text-text-tertiary">Your time</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {runs.map((run, i) => (
                    <tr key={run.getTime()} className="border-b border-border">
                      <td className="py-2.5 pr-4 text-text-tertiary">{i + 1}</td>
                      <td className="py-2.5 pr-4 text-text-primary">{format(run, "UTC")}</td>
                      <td className="py-2.5 text-text-secondary">{format(run)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {now && runs.length === 0 && (
              <p className="mt-4 text-text-secondary">This schedule never matches a real date, for example 31 February.</p>
            )}
            <p className="mt-3 text-sm text-text-tertiary">
              Cron uses the server&rsquo;s clock. Many servers and most CI schedulers run on UTC; check with{" "}
              <code className="font-mono text-text-secondary">timedatectl</code> before trusting either column.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
