"use client";

import { useMemo, useRef, useState } from "react";
import CopyButton from "@/components/site/CopyButton";
import { calculate, formatCpu, formatMem } from "@/lib/k8s-resources";
import { trackEvent } from "@/lib/track";
import { FieldLabel, inputClass, Row } from "./fields";

type Values = Record<string, string>;

const DEFAULTS: Values = {
  replicas: "3",
  cpuRequest: "250",
  cpuLimit: "500",
  memRequest: "256",
  memLimit: "512",
  nodeCpu: "2",
  nodeMemGiB: "4",
  reservedPercent: "10",
};

const FIELDS: { id: string; label: string; hint: string; group: "pod" | "node" }[] = [
  { id: "replicas", label: "Replicas", hint: "pods", group: "pod" },
  { id: "cpuRequest", label: "CPU request", hint: "millicores, blank for none", group: "pod" },
  { id: "cpuLimit", label: "CPU limit", hint: "millicores, blank for none", group: "pod" },
  { id: "memRequest", label: "Memory request", hint: "MiB, blank for none", group: "pod" },
  { id: "memLimit", label: "Memory limit", hint: "MiB, blank for none", group: "pod" },
  { id: "nodeCpu", label: "Node CPU", hint: "vCPU", group: "node" },
  { id: "nodeMemGiB", label: "Node memory", hint: "GiB", group: "node" },
  { id: "reservedPercent", label: "Reserved for the system", hint: "% of the node", group: "node" },
];

const optional = (value: string) => (value.trim() === "" ? null : Math.max(0, Math.round(Number(value))));

export default function K8sResourceCalculator() {
  const [values, setValues] = useState<Values>(DEFAULTS);
  const used = useRef(false);

  const invalid = FIELDS.filter((field) => values[field.id].trim() !== "" && !Number.isFinite(Number(values[field.id])));
  const result = useMemo(() => {
    if (invalid.length > 0) return null;
    return calculate({
      replicas: Math.max(1, Math.round(Number(values.replicas) || 1)),
      cpuRequest: optional(values.cpuRequest),
      cpuLimit: optional(values.cpuLimit),
      memRequest: optional(values.memRequest),
      memLimit: optional(values.memLimit),
      nodeCpu: Math.max(0.1, Number(values.nodeCpu) || 0.1),
      nodeMemGiB: Math.max(0.1, Number(values.nodeMemGiB) || 0.1),
      reservedPercent: Math.min(90, Math.max(0, Number(values.reservedPercent) || 0)),
    });
  }, [values, invalid.length]);

  function change(id: string, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
    if (!used.current) {
      used.current = true;
      trackEvent("tool_used", { tool: "k8s-resources" });
    }
  }

  const group = (name: "pod" | "node", title: string) => (
    <fieldset>
      <legend className="type-headline text-text-primary">{title}</legend>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {FIELDS.filter((field) => field.group === name).map((field) => (
          <div key={field.id}>
            <FieldLabel htmlFor={`k8s-${field.id}`} hint={field.hint}>
              {field.label}
            </FieldLabel>
            <input
              id={`k8s-${field.id}`}
              value={values[field.id]}
              onChange={(event) => change(field.id, event.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={invalid.some((bad) => bad.id === field.id)}
              className={inputClass}
            />
          </div>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-10">
        {group("pod", "One container")}
        {group("node", "One node")}
        <button type="button" onClick={() => setValues(DEFAULTS)} className="btn-ghost">
          Reset to the example
        </button>
      </div>

      <section aria-labelledby="k8s-result" aria-live="polite" className="panel self-start p-6 sm:p-8">
        <h2 id="k8s-result" className="type-eyebrow text-text-tertiary">
          Result
        </h2>
        {!result ? (
          <p role="alert" className="mt-4 text-primary">
            {invalid.map((field) => field.label).join(", ")}: enter a number.
          </p>
        ) : (
          <>
            <p className="mt-3 type-display-md text-text-primary">{result.qos}</p>
            <p className="mt-3 text-text-secondary">{result.qosReason}</p>

            <dl className="mt-6 border-t border-text-primary">
              <Row
                label="Reserved by requests"
                value={`${formatCpu(result.totalCpuRequest)} · ${formatMem(result.totalMemRequest)}`}
                note="What the scheduler sets aside across all replicas."
              />
              <Row
                label="Ceiling from limits"
                value={`${result.totalCpuLimit === null ? "no CPU limit" : formatCpu(result.totalCpuLimit)} · ${
                  result.totalMemLimit === null ? "no memory limit" : formatMem(result.totalMemLimit)
                }`}
                note="The most the replicas can use together."
              />
              <Row
                label="Allocatable per node"
                value={`${formatCpu(result.allocCpu)} · ${formatMem(result.allocMem)}`}
                note="Node size minus the share reserved for the system."
              />
              <Row
                label="Pods that fit per node"
                value={result.podsPerNode === null ? "no limit from requests" : String(result.podsPerNode)}
                note="By requests alone. Other pods on the node, and the node's pod limit, reduce this."
              />
              <Row
                label="Nodes needed"
                value={result.nodes === null ? "n/a" : String(result.nodes)}
                note="For these replicas only, with nothing else running."
              />
            </dl>

            {result.warnings.length > 0 && (
              <ul className="mt-6 space-y-2 border-l-2 border-primary pl-4 text-sm text-text-secondary">
                {result.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
              <span className="type-eyebrow text-text-tertiary">Paste into the container spec</span>
              <CopyButton text={result.yaml} />
            </div>
            <pre tabIndex={0} className="mt-2 overflow-x-auto font-mono text-[13px] leading-[1.6] text-text-primary">
              <code>{result.yaml}</code>
            </pre>
          </>
        )}
      </section>
    </div>
  );
}
