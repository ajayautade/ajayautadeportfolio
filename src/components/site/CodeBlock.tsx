import CopyButton from "./CopyButton";
import { highlight } from "@/lib/highlight";

interface CodeBlockProps {
  code: string;
  /** Shown as a small label and used for highlighting, e.g. "bash", "yaml", "hcl". */
  lang?: string;
  /** Optional file name or caption. */
  title?: string;
}

/** Code sample card: pale surface, hairline edge, mono type, a few colour accents. Scrolls sideways instead of wrapping. */
export default function CodeBlock({ code, lang, title }: CodeBlockProps) {
  const clean = code.replace(/^\n+|\s+$/g, "");
  const lines = highlight(clean, lang);
  return (
    <figure className="panel my-6 overflow-hidden">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border py-1 pl-4 pr-2">
        <span className="min-w-0 truncate font-mono text-xs text-text-secondary">
          {title ?? <span className="type-eyebrow text-text-tertiary">{lang ?? "code"}</span>}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {title && lang && <span className="type-eyebrow text-text-tertiary">{lang}</span>}
          <CopyButton text={clean} />
        </span>
      </figcaption>
      <pre tabIndex={0} className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-[1.6] text-text-primary">
        <code>
          {lines.map((tokens, i) => (
            <span key={i}>
              {tokens.map((token, j) =>
                token.kind ? (
                  <span key={j} className={`tok-${token.kind}`}>
                    {token.text}
                  </span>
                ) : (
                  token.text
                ),
              )}
              {i < lines.length - 1 ? "\n" : ""}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
