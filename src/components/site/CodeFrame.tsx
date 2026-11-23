"use client";

import { useState } from "react";
import { WrapText } from "lucide-react";
import CopyButton from "./CopyButton";

interface CodeFrameProps {
  /** Left side of the caption: file name or language label. */
  label: React.ReactNode;
  /** Right side, before the controls: the language when a file name is shown. */
  meta?: React.ReactNode;
  /** Plain text for the clipboard. */
  copyText: string;
  /** Offer a line-wrap toggle (phones only, for blocks with long lines). */
  wrappable: boolean;
  /** The highlighted <code> element. */
  children: React.ReactNode;
}

/**
 * Caption and scroll area of a code sample. Code scrolls sideways by default,
 * which keeps indentation honest; on a phone, long lines can be wrapped
 * instead so the reader does not have to pan through every line.
 */
export default function CodeFrame({ label, meta, copyText, wrappable, children }: CodeFrameProps) {
  const [wrap, setWrap] = useState(false);

  return (
    <>
      <figcaption className="flex items-center justify-between gap-4 border-b border-border py-1 pl-4 pr-2">
        <span className="min-w-0 truncate font-mono text-xs text-text-secondary">{label}</span>
        <span className="flex shrink-0 items-center gap-2">
          {meta}
          {wrappable && (
            <button
              type="button"
              onClick={() => setWrap((on) => !on)}
              aria-pressed={wrap}
              className={`hit inline-flex min-h-8 items-center gap-1.5 rounded-sm px-2 type-eyebrow transition-colors sm:hidden ${
                wrap ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              <WrapText className="h-3.5 w-3.5" aria-hidden="true" />
              Wrap
            </button>
          )}
          <CopyButton text={copyText} />
        </span>
      </figcaption>
      <pre
        tabIndex={0}
        className={`px-4 py-4 font-mono text-[13px] leading-[1.6] text-text-primary ${
          wrap ? "whitespace-pre-wrap [overflow-wrap:anywhere]" : "overflow-x-auto"
        }`}
      >
        {children}
      </pre>
    </>
  );
}
