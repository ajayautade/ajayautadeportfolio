interface CodeBlockProps {
  code: string;
  /** Shown as a small label, e.g. "bash", "yaml", "hcl". */
  lang?: string;
  /** Optional file name or caption. */
  title?: string;
}

/** Code sample card: pale surface, hairline edge, mono type. Scrolls sideways instead of wrapping. */
export default function CodeBlock({ code, lang, title }: CodeBlockProps) {
  return (
    <figure className="panel my-6 overflow-hidden">
      {(title || lang) && (
        <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-text-secondary truncate">{title}</span>
          {lang && <span className="type-eyebrow text-text-tertiary shrink-0">{lang}</span>}
        </figcaption>
      )}
      <pre
        tabIndex={0}
        className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-[1.6] text-text-primary"
      >
        <code>{code.replace(/^\n+|\s+$/g, "")}</code>
      </pre>
    </figure>
  );
}
