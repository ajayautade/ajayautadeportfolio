"use client";

import { useMemo, useRef, useState } from "react";
import { checkDockerfile, type Severity } from "@/lib/dockerfile";
import { trackEvent } from "@/lib/track";
import { FieldLabel, inputClass } from "./fields";

const EXAMPLES: { label: string; text: string }[] = [
  {
    label: "Needs work",
    text: `FROM python:latest
RUN apt-get update
RUN apt-get install -y gcc
COPY . .
RUN pip install -r requirements.txt
ENV API_KEY=changeme
EXPOSE 8000
CMD python app.py`,
  },
  {
    label: "Multi-stage Python",
    text: `FROM python:3.12-slim AS build
WORKDIR /app
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim
RUN useradd --create-home app
WORKDIR /app
COPY --from=build /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY --chown=app:app . .
USER app
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
  },
  {
    label: "Node",
    text: `FROM node:20
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN chown -R node:node /usr/src/app
EXPOSE 3000
CMD npm start`,
  },
];

const SEVERITY: Record<Severity, { label: string; className: string }> = {
  high: { label: "Fix", className: "bg-text-primary text-bg" },
  medium: { label: "Should fix", className: "" },
  low: { label: "Consider", className: "bg-transparent border border-border-strong" },
};

export default function DockerfileChecker() {
  const [input, setInput] = useState(EXAMPLES[0].text);
  const used = useRef(false);
  const result = useMemo(() => checkDockerfile(input), [input]);

  function change(value: string) {
    setInput(value);
    if (!used.current) {
      used.current = true;
      trackEvent("tool_used", { tool: "dockerfile" });
    }
  }

  const counts = "error" in result ? null : {
    high: result.findings.filter((f) => f.severity === "high").length,
    medium: result.findings.filter((f) => f.severity === "medium").length,
    low: result.findings.filter((f) => f.severity === "low").length,
  };

  return (
    <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0">
        <FieldLabel htmlFor="dockerfile-input">Dockerfile</FieldLabel>
        <textarea
          id="dockerfile-input"
          value={input}
          onChange={(event) => change(event.target.value)}
          spellCheck={false}
          autoComplete="off"
          rows={20}
          aria-invalid={"error" in result}
          aria-describedby={"error" in result ? "dockerfile-error" : undefined}
          className={`${inputClass} resize-y sm:text-[13px] leading-[1.6]`}
        />
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-sm text-text-tertiary">Try:</span>
          {EXAMPLES.map((example) => (
            <button
              key={example.label}
              type="button"
              onClick={() => change(example.text)}
              className="tech-pill min-h-8 hover:text-text-primary transition-colors"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <section aria-labelledby="dockerfile-result" aria-live="polite" className="min-w-0 self-start">
        <h2 id="dockerfile-result" className="type-eyebrow text-text-tertiary">
          Result
        </h2>
        {"error" in result || !counts ? (
          <p id="dockerfile-error" role="alert" className="mt-4 text-primary">
            {"error" in result ? result.error : ""}
          </p>
        ) : (
          <>
            <p className="mt-3 type-display-md text-text-primary">
              {result.findings.length === 0
                ? "Nothing to flag."
                : `${result.findings.length} ${result.findings.length === 1 ? "thing" : "things"} to look at`}
            </p>
            <p className="mt-2 font-mono text-sm text-text-tertiary">
              {counts.high} fix · {counts.medium} should fix · {counts.low} consider · {result.instructions.length} instructions ·{" "}
              {result.stages} {result.stages === 1 ? "stage" : "stages"}
            </p>

            {result.findings.length > 0 && (
              <ol className="mt-6 border-t border-text-primary">
                {result.findings.map((f, i) => (
                  <li key={`${f.id}-${f.line ?? i}`} className="border-b border-border py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`tech-pill ${SEVERITY[f.severity].className}`}>{SEVERITY[f.severity].label}</span>
                      {f.line && <span className="font-mono text-xs text-text-tertiary">line {f.line}</span>}
                    </div>
                    <p className="mt-2 type-card-title text-text-primary">{f.title}</p>
                    <p className="mt-1 text-sm text-text-secondary">{f.detail}</p>
                  </li>
                ))}
              </ol>
            )}

            {result.passed.length > 0 && (
              <>
                <h3 className="mt-8 type-eyebrow text-text-tertiary">Looks right</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-text-secondary">
                  {result.passed.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden="true" className="text-text-primary">
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}
