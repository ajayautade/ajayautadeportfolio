"use client";

import { useMemo, useRef, useState } from "react";
import { estimate, formatUsd, HOURS_PER_MONTH, instanceTypes, PRICES_AS_OF, regions, type CostInput, type Region } from "@/lib/aws-cost";
import { trackEvent } from "@/lib/track";
import { FieldLabel, inputClass } from "./fields";

type NumberField = "count" | "volumeGB" | "natGateways" | "natDataGB" | "loadBalancers" | "publicIps";

const PRESETS: Record<CostInput["mode"], CostInput> = {
  // The setup priced in the EKS cost article, so the two agree.
  eks: { region: "us-east-1", mode: "eks", instanceType: "t3.medium", count: 2, volumeGB: 20, natGateways: 1, natDataGB: 0, loadBalancers: 1, publicIps: 3, extendedSupport: false },
  ec2: { region: "us-east-1", mode: "ec2", instanceType: "t3.small", count: 1, volumeGB: 20, natGateways: 0, natDataGB: 0, loadBalancers: 0, publicIps: 1, extendedSupport: false },
};

const NUMBER_FIELDS: { id: NumberField; label: string; hint: string; max: number }[] = [
  { id: "count", label: "Instances", hint: "running all month", max: 500 },
  { id: "volumeGB", label: "Disk per instance", hint: "GB of gp3", max: 16384 },
  { id: "natGateways", label: "NAT gateways", hint: "one per AZ is common", max: 20 },
  { id: "natDataGB", label: "Data through NAT", hint: "GB per month", max: 1_000_000 },
  { id: "loadBalancers", label: "Load balancers", hint: "ALB", max: 50 },
  { id: "publicIps", label: "Public IPv4 addresses", hint: "incl. ALB and NAT", max: 500 },
];

export default function AwsCostEstimator() {
  const [input, setInput] = useState<CostInput>(PRESETS.eks);
  const [raw, setRaw] = useState<Record<NumberField, string>>(() => toRaw(PRESETS.eks));
  const used = useRef(false);
  const result = useMemo(() => estimate(input), [input]);

  function touch() {
    if (!used.current) {
      used.current = true;
      trackEvent("tool_used", { tool: "aws-cost" });
    }
  }

  function update(next: Partial<CostInput>) {
    touch();
    setInput((current) => ({ ...current, ...next }));
  }

  function setNumber(field: (typeof NUMBER_FIELDS)[number], value: string) {
    setRaw((current) => ({ ...current, [field.id]: value }));
    const n = Number(value);
    if (value.trim() === "" || (Number.isFinite(n) && n >= 0)) update({ [field.id]: Math.min(field.max, Math.round(n || 0)) });
  }

  function preset(mode: CostInput["mode"]) {
    const next = { ...PRESETS[mode], region: input.region };
    touch();
    setInput(next);
    setRaw(toRaw(next));
  }

  const invalid = (id: NumberField) => raw[id].trim() !== "" && !(Number(raw[id]) >= 0);

  return (
    <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-10">
        <fieldset>
          <legend className="type-headline text-text-primary">What you run</legend>
          <div role="radiogroup" aria-label="Setup" className="mt-5 flex flex-wrap gap-2">
            {(
              [
                { value: "eks", label: "EKS cluster" },
                { value: "ec2", label: "EC2 instances" },
              ] as const
            ).map((option) => (
              <label key={option.value} className="relative">
                <input type="radio" name="cost-mode" checked={input.mode === option.value} onChange={() => preset(option.value)} className="peer sr-only" />
                <span className="flex min-h-11 cursor-pointer items-center rounded-sm border border-border-strong px-3.5 text-sm font-medium text-text-primary transition-colors hover:border-text-primary peer-checked:border-text-primary peer-checked:bg-text-primary peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-text-primary">
                  {option.label}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="cost-region">Region</FieldLabel>
              <select id="cost-region" value={input.region} onChange={(e) => update({ region: e.target.value as Region })} className={`${inputClass} font-sans`}>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label} · {r.id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel htmlFor="cost-type" hint={input.mode === "eks" ? "worker nodes" : undefined}>
                Instance type
              </FieldLabel>
              <select id="cost-type" value={input.instanceType} onChange={(e) => update({ instanceType: e.target.value })} className={inputClass}>
                {instanceTypes.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name} · {t.vcpu} vCPU · {t.memGiB} GiB{t.arch === "arm" ? " · Arm" : ""}
                  </option>
                ))}
              </select>
            </div>
            {NUMBER_FIELDS.map((field) => (
              <div key={field.id}>
                <FieldLabel htmlFor={`cost-${field.id}`} hint={field.hint}>
                  {field.label}
                </FieldLabel>
                <input
                  id={`cost-${field.id}`}
                  value={raw[field.id]}
                  onChange={(e) => setNumber(field, e.target.value)}
                  inputMode="numeric"
                  autoComplete="off"
                  aria-invalid={invalid(field.id)}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          {input.mode === "eks" && (
            <label className="mt-5 flex cursor-pointer items-start gap-3 text-text-secondary">
              <input
                type="checkbox"
                checked={input.extendedSupport}
                onChange={(e) => update({ extendedSupport: e.target.checked })}
                className="mt-1 h-4 w-4 accent-[var(--color-text-primary)]"
              />
              <span>Kubernetes version is in extended support (control plane $0.60 an hour instead of $0.10)</span>
            </label>
          )}
        </fieldset>
      </div>

      <section aria-labelledby="cost-result" aria-live="polite" className="panel self-start p-6 sm:p-8">
        <h2 id="cost-result" className="type-eyebrow text-text-tertiary">
          Per month, on-demand
        </h2>
        <p className="mt-3 type-display-lg text-text-primary">{formatUsd(result.total)}</p>
        <p className="mt-2 text-text-secondary">
          About {formatUsd(result.total * 12)} a year. The {input.mode === "eks" ? "nodes" : "instances"} are{" "}
          {Math.round(result.computeShare * 100)}% of it.
        </p>

        <div className="mt-6 overflow-x-auto border-t border-text-primary">
          <table className="w-full min-w-[22rem] text-left">
            <caption className="sr-only">Monthly cost line by line</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-3 pr-4 type-eyebrow text-text-tertiary">Item</th>
                <th scope="col" className="py-3 text-right type-eyebrow text-text-tertiary">Month</th>
              </tr>
            </thead>
            <tbody>
              {result.lines.map((line) => (
                <tr key={line.item} className="border-b border-border align-top">
                  <td className="py-3 pr-4">
                    <span className="block text-text-primary">{line.item}</span>
                    <span className="block font-mono text-xs text-text-tertiary">{line.unit}</span>
                  </td>
                  <td className="py-3 text-right font-mono text-text-primary">{formatUsd(line.monthly)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" className="py-3 pr-4 text-left type-eyebrow text-text-primary">Total</th>
                <td className="py-3 text-right font-mono font-bold text-text-primary">{formatUsd(result.total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mt-5 text-sm text-text-tertiary">
          On-demand Linux prices in US dollars from the AWS Price List, as of {PRICES_AS_OF}. A month is {HOURS_PER_MONTH} hours.
          Not included: tax, data transfer out to the internet, load balancer capacity units, CloudWatch, snapshots and
          anything else in the account. Check the{" "}
          <a href="https://calculator.aws/" className="underline decoration-primary decoration-2 underline-offset-4" rel="noopener" target="_blank">
            AWS Pricing Calculator
          </a>{" "}
          before you commit to a budget.
        </p>
      </section>
    </div>
  );
}

function toRaw(input: CostInput): Record<NumberField, string> {
  return {
    count: String(input.count),
    volumeGB: String(input.volumeGB),
    natGateways: String(input.natGateways),
    natDataGB: String(input.natDataGB),
    loadBalancers: String(input.loadBalancers),
    publicIps: String(input.publicIps),
  };
}
