import CodeFrame from "./CodeFrame";
import { highlight } from "@/lib/highlight";

interface CodeBlockProps {
  code: string;
  /** Shown as a small label and used for highlighting, e.g. "bash", "yaml", "hcl". */
  lang?: string;
  /** Optional file name or caption. */
  title?: string;
}

/** About as many Martian Mono characters at 13px as fit a 320px phone's code panel. */
const PHONE_LINE_CHARS = 36;

/**
 * Code sample card: pale surface, hairline edge, mono type, a few colour accents.
 * Scrolls sideways instead of wrapping; on phones, long lines can be wrapped on demand.
 */
export default function CodeBlock({ code, lang, title }: CodeBlockProps) {
  const clean = code.replace(/^\n+|\s+$/g, "");
  const lines = highlight(clean, lang);
  const longest = Math.max(...clean.split("\n").map((line) => line.length));

  return (
    <figure className="panel my-6 overflow-hidden">
      <CodeFrame
        label={title ?? <span className="type-eyebrow text-text-tertiary">{lang ?? "code"}</span>}
        meta={title && lang ? <span className="type-eyebrow text-text-tertiary">{lang}</span> : undefined}
        copyText={clean}
        wrappable={longest > PHONE_LINE_CHARS}
      >
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
      </CodeFrame>
    </figure>
  );
}
