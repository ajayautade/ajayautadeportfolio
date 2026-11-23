"use client";

import { useMemo, useRef, useState } from "react";
import { explainPolicy } from "@/lib/iam-policy";
import { trackEvent } from "@/lib/track";
import { FieldLabel, inputClass, Row } from "./fields";

const EXAMPLES: { label: string; policy: object }[] = [
  {
    label: "Public website bucket",
    policy: {
      Version: "2012-10-17",
      Statement: [
        { Sid: "PublicRead", Effect: "Allow", Principal: "*", Action: "s3:GetObject", Resource: "arn:aws:s3:::my-site/*" },
        {
          Sid: "HttpsOnly",
          Effect: "Deny",
          Principal: "*",
          Action: "s3:*",
          Resource: ["arn:aws:s3:::my-site", "arn:aws:s3:::my-site/*"],
          Condition: { Bool: { "aws:SecureTransport": "false" } },
        },
      ],
    },
  },
  {
    label: "CI push to ECR",
    policy: {
      Version: "2012-10-17",
      Statement: [
        { Effect: "Allow", Action: "ecr:GetAuthorizationToken", Resource: "*" },
        {
          Effect: "Allow",
          Action: ["ecr:BatchCheckLayerAvailability", "ecr:InitiateLayerUpload", "ecr:UploadLayerPart", "ecr:CompleteLayerUpload", "ecr:PutImage"],
          Resource: "arn:aws:ecr:us-east-1:123456789012:repository/my-app",
        },
      ],
    },
  },
  {
    label: "Too broad",
    policy: {
      Version: "2012-10-17",
      Statement: [
        { Effect: "Allow", Action: "s3:*", Resource: "*" },
        { Effect: "Allow", Action: ["s3:GetObject", "s3:ListBucket"], Resource: "arn:aws:s3:::backups" },
        { Effect: "Allow", Action: "iam:PassRole", Resource: "*" },
      ],
    },
  },
  {
    label: "GitHub OIDC trust",
    policy: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { Federated: "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com" },
          Action: "sts:AssumeRoleWithWebIdentity",
          Condition: {
            StringEquals: {
              "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
              "token.actions.githubusercontent.com:sub": "repo:my-org/my-repo:ref:refs/heads/main",
            },
          },
        },
      ],
    },
  },
];

const KIND_LABEL = {
  identity: "Identity policy: attached to a user, group or role",
  resource: "Resource policy: attached to a bucket, queue, key or similar",
  trust: "Trust policy: says who may assume a role",
};

const pretty = (o: object) => JSON.stringify(o, null, 2);

export default function IamPolicyExplainer() {
  const [input, setInput] = useState(() => pretty(EXAMPLES[0].policy));
  const used = useRef(false);
  const result = useMemo(() => explainPolicy(input), [input]);

  function change(value: string) {
    setInput(value);
    if (!used.current) {
      used.current = true;
      trackEvent("tool_used", { tool: "iam-policy" });
    }
  }

  return (
    <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0">
        <FieldLabel htmlFor="policy-input" hint="IAM, S3 bucket or trust policy">
          Policy JSON
        </FieldLabel>
        <textarea
          id="policy-input"
          value={input}
          onChange={(event) => change(event.target.value)}
          spellCheck={false}
          autoComplete="off"
          rows={20}
          aria-invalid={"error" in result}
          aria-describedby={"error" in result ? "policy-error" : undefined}
          className={`${inputClass} resize-y sm:text-[13px] leading-[1.6]`}
        />
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-sm text-text-tertiary">Try:</span>
          {EXAMPLES.map((example) => (
            <button
              key={example.label}
              type="button"
              onClick={() => change(pretty(example.policy))}
              className="tech-pill min-h-8 hover:text-text-primary transition-colors"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <section aria-labelledby="policy-result" aria-live="polite" className="min-w-0 self-start">
        <h2 id="policy-result" className="type-eyebrow text-text-tertiary">
          In plain English
        </h2>
        {"error" in result ? (
          <p id="policy-error" role="alert" className="mt-4 text-primary">
            {result.error}
          </p>
        ) : (
          <>
            <p className="mt-3 text-text-secondary">{KIND_LABEL[result.kind]}</p>
            <ol className="mt-6 space-y-6">
              {result.statements.map((s) => (
                <li key={s.index} className="panel p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`tech-pill ${s.effect === "Deny" ? "bg-text-primary text-bg" : ""}`}
                    >
                      {s.effect}
                    </span>
                    <span className="font-mono text-xs text-text-tertiary">
                      Statement {s.index}
                      {s.sid ? ` · ${s.sid}` : ""}
                    </span>
                  </div>
                  <p className="mt-3 type-card-title text-text-primary text-pretty">{s.sentence}</p>
                  <dl className="mt-4 border-t border-border">
                    <Row label="Actions" value={s.actions} />
                    <Row label="Resources" value={s.resources} />
                    {s.conditions.length > 0 && <Row label="Only when" value={s.conditions.join("; ")} />}
                  </dl>
                  {s.warnings.length > 0 && (
                    <ul className="mt-4 space-y-2 border-l-2 border-primary pl-4 text-sm text-text-secondary">
                      {s.warnings.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
            {result.warnings.length > 0 && (
              <ul className="mt-6 space-y-2 text-sm text-text-tertiary">
                {result.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </div>
  );
}
