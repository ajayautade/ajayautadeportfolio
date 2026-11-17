"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, RotateCcw } from "lucide-react";
import { trackEvent } from "@/lib/track";
import { checkupQuestions, priorityLabels, type Priority } from "@/lib/checkup";

type Answer = "yes" | "no" | "unsure";

const OPTIONS: { value: Answer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

interface Props {
  /** Display names, resolved on the server so this component ships no service or post data. */
  serviceTitles: Record<string, string>;
  postTitles: Record<string, string>;
}

/** A twelve-question self-check. Everything stays in the browser: nothing is stored or sent. */
export default function InfraCheckup({ serviceTitles, postTitles }: Props) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [copied, setCopied] = useState(false);

  const total = checkupQuestions.length;
  const answered = Object.keys(answers).length;
  const done = answered === total;

  const gaps = useMemo(
    () =>
      checkupQuestions
        .filter((q) => answers[q.id] === "no" || answers[q.id] === "unsure")
        .sort((a, b) => a.priority - b.priority),
    [answers],
  );
  const inPlace = checkupQuestions.filter((q) => answers[q.id] === "yes");

  const summary = useMemo(() => {
    const lines = [`Infrastructure checkup: ${inPlace.length} of ${total} in place.`];
    ([1, 2, 3] as Priority[]).forEach((priority) => {
      const group = gaps.filter((q) => q.priority === priority);
      if (group.length === 0) return;
      lines.push("", `${priorityLabels[priority]}:`);
      group.forEach((q) => lines.push(`- ${q.question} ${answers[q.id] === "unsure" ? "Not sure." : "No."}`));
    });
    return lines.join("\n");
  }, [answers, gaps, inPlace.length, total]);

  const contactHref = `/contact?topic=${encodeURIComponent("Something else")}&summary=${encodeURIComponent(`${summary}\n\n`)}`;

  function answer(id: string, value: Answer) {
    const next = { ...answers, [id]: value };
    // Fire once, on the answer that completes the set.
    if (Object.keys(answers).length < total && Object.keys(next).length === total) {
      trackEvent("checkup_completed", { in_place: Object.values(next).filter((v) => v === "yes").length });
    }
    setAnswers(next);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function reset() {
    setAnswers({});
    setCopied(false);
    document.getElementById("checkup")?.scrollIntoView({ block: "start" });
  }

  return (
    <div id="checkup" className="scroll-mt-24">
      <div className="sticky top-16 z-10 -mx-1 flex items-center justify-between gap-4 border-b border-border bg-bg px-1 py-3">
        <p className="type-eyebrow text-text-secondary" aria-live="polite">
          <span className="font-mono">
            {answered} / {total}
          </span>{" "}
          answered
        </p>
        <div className="h-1 w-32 bg-surface-elevated sm:w-56" aria-hidden="true">
          <div className="h-full bg-text-primary transition-[width]" style={{ width: `${(answered / total) * 100}%` }} />
        </div>
      </div>

      <ol>
        {checkupQuestions.map((q, i) => (
          <li key={q.id} className="border-b border-border py-7">
            <div className="grid gap-x-10 gap-y-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="flex gap-4">
                <span className="pt-1 font-mono text-sm text-text-tertiary" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="type-eyebrow text-text-tertiary">{q.area}</p>
                  <p id={`q-${q.id}`} className="mt-1.5 text-lg font-medium text-text-primary text-pretty">
                    {q.question}
                  </p>
                </div>
              </div>
              <div role="radiogroup" aria-labelledby={`q-${q.id}`} className="flex gap-2 pl-10 lg:pl-0">
                {OPTIONS.map((option) => (
                  <label key={option.value} className="relative flex-1 lg:flex-none">
                    <input
                      type="radio"
                      name={q.id}
                      value={option.value}
                      checked={answers[q.id] === option.value}
                      onChange={() => answer(q.id, option.value)}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-sm border border-border-strong px-4 text-sm font-medium text-text-primary transition-colors hover:border-text-primary peer-checked:border-text-primary peer-checked:bg-text-primary peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-text-primary">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section aria-labelledby="results-heading" aria-live="polite" className="panel mt-12 p-6 sm:p-10">
        <h2 id="results-heading" className="type-eyebrow text-text-tertiary">
          Your results
        </h2>

        {!done ? (
          <p className="mt-4 type-body-lg text-text-secondary">
            Answer all {total} questions and your list appears here. {total - answered} to go.
          </p>
        ) : (
          <>
            <p className="mt-4 type-display-md text-text-primary">
              <span className="font-mono">
                {inPlace.length} / {total}
              </span>{" "}
              in place
            </p>

            {gaps.length === 0 ? (
              <p className="mt-5 max-w-2xl type-body-lg text-text-secondary">
                Every item is covered. The next step is checking that each one still works as you believe it does:
                run a restore, trigger an alert on purpose, and roll back a release in a test environment.
              </p>
            ) : (
              <>
                <p className="mt-5 max-w-2xl text-text-secondary">
                  {gaps.length} {gaps.length === 1 ? "gap" : "gaps"}, in the order I would look at them. The order
                  is a general judgement; your situation may move things around.
                </p>
                <ol className="mt-8 border-t border-text-primary">
                  {gaps.map((q) => (
                    <li key={q.id} className="grid gap-x-8 gap-y-2 border-b border-border py-5 sm:grid-cols-[7rem_minmax(0,1fr)]">
                      <p className="type-eyebrow text-text-tertiary sm:pt-1.5">
                        {priorityLabels[q.priority]}
                        {answers[q.id] === "unsure" && <span className="block mt-1 normal-case tracking-normal font-normal">Not sure</span>}
                      </p>
                      <div>
                        <h3 className="type-card-title text-text-primary text-pretty">{q.question}</h3>
                        <p className="mt-2 text-text-secondary">{q.why}</p>
                        <p className="mt-3 flex flex-col gap-x-6 text-sm sm:flex-row sm:flex-wrap">
                          <Link
                            href={`/services/${q.serviceId}`}
                            className="tap font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4"
                          >
                            Service: {serviceTitles[q.serviceId]}
                          </Link>
                          {q.postSlug && postTitles[q.postSlug] && (
                            <Link href={`/blog/${q.postSlug}`} className="tap text-text-secondary underline underline-offset-4 hover:text-text-primary">
                              How-to: {postTitles[q.postSlug]}
                            </Link>
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {gaps.length > 0 && (
                <Link href={contactHref} className="btn-primary">
                  Send me this list
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              <button type="button" onClick={copy} className="btn-outline">
                {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? "Copied" : "Copy as text"}
              </button>
              <button type="button" onClick={reset} className="btn-ghost">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Start again
              </button>
            </div>
            <p className="mt-5 text-sm text-text-tertiary">
              &ldquo;Send me this list&rdquo; opens the contact form with your answers filled in. Nothing is sent
              until you submit that form.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
