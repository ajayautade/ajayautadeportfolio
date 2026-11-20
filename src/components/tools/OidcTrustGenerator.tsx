"use client";

import { useMemo, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import CodeBlock from "@/components/site/CodeBlock";
import { buildTrust, type SubjectKind, type TrustSubject } from "@/lib/oidc-trust";
import { trackEvent } from "@/lib/track";
import { FieldLabel, inputClass } from "./fields";

const KINDS: { value: SubjectKind; label: string; placeholder?: string }[] = [
  { value: "branch", label: "Branch", placeholder: "main" },
  { value: "environment", label: "Environment", placeholder: "production" },
  { value: "tag", label: "Tag", placeholder: "v*" },
  { value: "pull_request", label: "Pull requests" },
  { value: "any", label: "Any run (:*)" },
];

const OUTPUTS = [
  { id: "json", label: "Trust policy JSON" },
  { id: "terraform", label: "Terraform" },
  { id: "cli", label: "AWS CLI" },
  { id: "workflow", label: "Workflow" },
] as const;

type OutputId = (typeof OUTPUTS)[number]["id"];

export default function OidcTrustGenerator() {
  const [accountId, setAccountId] = useState("123456789012");
  const [owner, setOwner] = useState("my-org");
  const [repo, setRepo] = useState("my-repo");
  const [roleName, setRoleName] = useState("github-actions-deploy");
  const [subjects, setSubjects] = useState<TrustSubject[]>([{ kind: "branch", value: "main" }]);
  const [output, setOutput] = useState<OutputId>("json");
  const used = useRef(false);

  const result = useMemo(
    () => buildTrust({ accountId, owner, repo, roleName, subjects }),
    [accountId, owner, repo, roleName, subjects],
  );

  function touch() {
    if (!used.current) {
      used.current = true;
      trackEvent("tool_used", { tool: "oidc-trust" });
    }
  }

  const setSubject = (index: number, next: Partial<TrustSubject>) => {
    touch();
    setSubjects((list) => list.map((s, i) => (i === index ? { ...s, ...next } : s)));
  };

  const text = (id: string, label: string, value: string, set: (v: string) => void, hint?: string) => (
    <div>
      <FieldLabel htmlFor={`oidc-${id}`} hint={hint}>
        {label}
      </FieldLabel>
      <input
        id={`oidc-${id}`}
        value={value}
        onChange={(event) => {
          touch();
          set(event.target.value);
        }}
        spellCheck={false}
        autoComplete="off"
        className={inputClass}
      />
    </div>
  );

  const code = !("error" in result)
    ? {
        json: { code: result.policyJson, lang: "json", title: "trust-policy.json" },
        terraform: { code: result.terraform, lang: "hcl", title: "main.tf" },
        cli: { code: result.cli, lang: "bash", title: "Create it with the AWS CLI" },
        workflow: { code: result.workflow, lang: "yaml", title: ".github/workflows/deploy.yml" },
      }[output]
    : null;

  return (
    <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="space-y-10">
        <fieldset>
          <legend className="type-headline text-text-primary">Where</legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {text("account", "AWS account ID", accountId, setAccountId, "12 digits")}
            {text("role", "Role name", roleName, setRoleName)}
            {text("owner", "GitHub owner", owner, setOwner, "user or org")}
            {text("repo", "Repository", repo, setRepo, "or * for all")}
          </div>
        </fieldset>

        <fieldset>
          <legend className="type-headline text-text-primary">Which runs may assume it</legend>
          <ul className="mt-5 space-y-3">
            {subjects.map((subject, i) => {
              const kind = KINDS.find((k) => k.value === subject.kind)!;
              return (
                <li key={i} className="flex flex-wrap items-end gap-3">
                  <div className="min-w-[9rem] flex-1 sm:flex-none">
                    <label htmlFor={`oidc-kind-${i}`} className="sr-only">
                      Kind of run {i + 1}
                    </label>
                    <select
                      id={`oidc-kind-${i}`}
                      value={subject.kind}
                      onChange={(event) => setSubject(i, { kind: event.target.value as SubjectKind })}
                      className={`${inputClass} mt-0 font-sans`}
                    >
                      {KINDS.map((k) => (
                        <option key={k.value} value={k.value}>
                          {k.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {kind.placeholder && (
                    <div className="min-w-[8rem] flex-1">
                      <label htmlFor={`oidc-value-${i}`} className="sr-only">
                        {kind.label} name
                      </label>
                      <input
                        id={`oidc-value-${i}`}
                        value={subject.value}
                        placeholder={kind.placeholder}
                        onChange={(event) => setSubject(i, { value: event.target.value })}
                        spellCheck={false}
                        autoComplete="off"
                        className={`${inputClass} mt-0`}
                      />
                    </div>
                  )}
                  {subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setSubjects((list) => list.filter((_, j) => j !== i))}
                      className="btn-ghost min-h-12 px-3"
                      aria-label={`Remove ${kind.label.toLowerCase()} ${subject.value}`.trim()}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => {
              touch();
              setSubjects((list) => [...list, { kind: "environment", value: "" }]);
            }}
            className="btn-outline mt-4"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add another
          </button>
        </fieldset>
      </div>

      <section aria-labelledby="oidc-result" aria-live="polite" className="min-w-0 self-start">
        <h2 id="oidc-result" className="type-eyebrow text-text-tertiary">
          Result
        </h2>
        {"error" in result ? (
          <p role="alert" className="mt-4 text-primary">
            {result.error}
          </p>
        ) : (
          <>
            <dl className="mt-4 border-t border-text-primary">
              {result.subjects.map((s) => (
                <div key={s} className="border-b border-border py-3">
                  <dt className="sr-only">Allowed subject</dt>
                  <dd className="break-all font-mono text-sm text-text-primary">{s}</dd>
                </div>
              ))}
            </dl>

            {result.warnings.length > 0 && (
              <ul className="mt-6 space-y-2 border-l-2 border-primary pl-4 text-sm text-text-secondary">
                {result.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            )}

            <div role="tablist" aria-label="Output format" className="mt-8 flex flex-wrap gap-2">
              {OUTPUTS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  role="tab"
                  aria-selected={output === o.id}
                  onClick={() => setOutput(o.id)}
                  className={`flex min-h-11 items-center rounded-sm border px-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary ${
                    output === o.id
                      ? "border-text-primary bg-text-primary text-bg"
                      : "border-border-strong text-text-primary hover:border-text-primary"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {code && <CodeBlock key={output} code={code.code} lang={code.lang} title={code.title} />}
            {output === "terraform" && (
              <p className="text-sm text-text-tertiary">
                The provider resource exists once per account. If another stack already creates it, use a{" "}
                <code className="font-mono text-text-secondary">data &quot;aws_iam_openid_connect_provider&quot;</code> lookup
                instead.
              </p>
            )}
            {output === "json" && (
              <p className="text-sm text-text-tertiary">
                This only decides who may assume the role. Attach a separate permissions policy for what the role can do.
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
