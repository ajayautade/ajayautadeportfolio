"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackEvent } from "@/lib/track";

/** Copies text to the clipboard and confirms for two seconds. */
export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackEvent("code_copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-sm px-2 type-eyebrow text-text-tertiary transition-colors hover:text-text-primary"
      aria-live="polite"
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      {copied ? "Copied" : label}
    </button>
  );
}
