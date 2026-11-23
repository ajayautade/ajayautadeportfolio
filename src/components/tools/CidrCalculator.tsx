"use client";

import { useMemo, useRef, useState } from "react";
import CopyButton from "@/components/site/CopyButton";
import { describeCidr, parseCidr, splitCidr } from "@/lib/cidr";
import { trackEvent } from "@/lib/track";
import { Examples, FieldLabel, inputClass, Row } from "./fields";

const number = (n: number) => n.toLocaleString("en-US");

export default function CidrCalculator() {
  const [input, setInput] = useState("10.0.0.0/16");
  const [newPrefix, setNewPrefix] = useState(18);
  const used = useRef(false);

  const parsed = useMemo(() => parseCidr(input), [input]);
  const ok = !("error" in parsed);
  const info = ok ? describeCidr(parsed) : null;

  // Offer splits up to 8 bits deeper; keep the chosen one inside that range.
  const options = ok ? Array.from({ length: Math.min(8, 32 - parsed.prefix) }, (_, i) => parsed.prefix + i + 1) : [];
  const chosen = options.includes(newPrefix) ? newPrefix : options[Math.min(1, options.length - 1)];
  const split = ok && chosen ? splitCidr(parsed, chosen) : null;

  function change(value: string) {
    setInput(value);
    if (!used.current) {
      used.current = true;
      trackEvent("tool_used", { tool: "cidr" });
    }
  }

  return (
    <div>
      <FieldLabel htmlFor="cidr-input">CIDR block</FieldLabel>
      <input
        id="cidr-input"
        value={input}
        onChange={(event) => change(event.target.value)}
        spellCheck={false}
        autoComplete="off"
        inputMode="text"
        aria-invalid={!ok}
        aria-describedby={!ok ? "cidr-error" : undefined}
        className={`${inputClass} max-w-md text-lg`}
      />
      <Examples items={["10.0.0.0/16", "172.31.0.0/20", "192.168.1.0/24", "10.0.3.0/28"]} onPick={change} />

      {"error" in parsed ? (
        <p id="cidr-error" role="alert" className="mt-6 text-primary">
          {parsed.error}
        </p>
      ) : (
        info && (
          <>
            <section aria-labelledby="cidr-result" className="panel mt-10 p-6 sm:p-8">
              <h2 id="cidr-result" className="type-eyebrow text-text-tertiary">
                {info.cidr}
              </h2>
              <dl className="mt-3 border-t border-text-primary">
                <Row label="Network address" value={info.network} />
                <Row label="Broadcast address" value={info.broadcast} />
                <Row label="Usable range" value={`${info.firstHost} – ${info.lastHost}`} />
                <Row label="Subnet mask" value={info.netmask} note={`Wildcard mask ${info.wildcard}`} />
                <Row label="Total addresses" value={number(info.total)} />
                <Row
                  label="Usable hosts"
                  value={number(info.usable)}
                  note={
                    parsed.prefix >= 31
                      ? "A /31 or /32 has no separate network and broadcast address."
                      : "Total minus the network and broadcast addresses."
                  }
                />
                <Row
                  label="Usable in an AWS subnet"
                  value={info.awsUsable === null ? "n/a" : number(info.awsUsable)}
                  note={
                    info.awsUsable === null
                      ? "AWS subnets must be between /16 and /28."
                      : "AWS reserves 5 addresses in every subnet: the first four and the last."
                  }
                />
                <Row label="Address type" value={info.scope} />
              </dl>
            </section>

            {split && chosen && (
              <section aria-labelledby="cidr-split" className="mt-12">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 id="cidr-split" className="type-headline text-text-primary">
                      Split it into subnets
                    </h2>
                    <p className="mt-2 text-text-secondary">
                      <span className="font-mono text-text-primary">{number(split.count)}</span> subnets of{" "}
                      <span className="font-mono text-text-primary">/{chosen}</span>, each with{" "}
                      <span className="font-mono text-text-primary">{number(split.subnets[0].usable)}</span> usable
                      hosts.
                    </p>
                  </div>
                  <div>
                    <FieldLabel htmlFor="cidr-prefix">New prefix</FieldLabel>
                    <select
                      id="cidr-prefix"
                      value={chosen}
                      onChange={(event) => setNewPrefix(Number(event.target.value))}
                      className={`${inputClass} sm:w-56`}
                    >
                      {options.map((prefix) => (
                        <option key={prefix} value={prefix}>
                          /{prefix} ({number(2 ** (prefix - parsed.prefix))} subnets)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 border-t border-text-primary sm:overflow-x-auto">
                  <table role="table" className="stack-table w-full text-left sm:min-w-[32rem]">
                    <thead role="rowgroup">
                      <tr role="row" className="border-b border-border">
                        <th role="columnheader" scope="col" className="py-3 pr-4 type-eyebrow text-text-tertiary">#</th>
                        <th role="columnheader" scope="col" className="py-3 pr-4 type-eyebrow text-text-tertiary">Subnet</th>
                        <th role="columnheader" scope="col" className="py-3 pr-4 type-eyebrow text-text-tertiary">First host</th>
                        <th role="columnheader" scope="col" className="py-3 type-eyebrow text-text-tertiary">Last host</th>
                      </tr>
                    </thead>
                    <tbody role="rowgroup" className="font-mono text-sm">
                      {split.subnets.map((subnet, i) => (
                        <tr key={subnet.cidr} role="row" className="border-b border-border">
                          <td role="cell" className="stack-title py-2.5 pr-4 text-text-tertiary">
                            <span className="sm:hidden">Subnet </span>
                            {i + 1}
                          </td>
                          <td role="cell" data-label="Subnet" className="py-2.5 pr-4 text-text-primary">
                            <span>{subnet.cidr}</span>
                          </td>
                          <td role="cell" data-label="First host" className="py-2.5 pr-4 text-text-secondary">
                            <span>{subnet.first}</span>
                          </td>
                          <td role="cell" data-label="Last host" className="py-2.5 text-text-secondary">
                            <span>{subnet.last}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-text-tertiary">
                    {split.count > split.subnets.length
                      ? `Showing the first ${split.subnets.length} of ${number(split.count)}.`
                      : "All subnets shown."}
                  </p>
                  <CopyButton text={split.subnets.map((subnet) => subnet.cidr).join("\n")} label="Copy list" />
                </div>
              </section>
            )}
          </>
        )
      )}
    </div>
  );
}
