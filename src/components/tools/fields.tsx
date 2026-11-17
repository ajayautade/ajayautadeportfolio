/** Small shared pieces for the calculators, so the three tools read as one family. */

export const inputClass =
  "mt-2 block w-full rounded-sm border border-border-strong bg-bg px-3.5 py-3 font-mono text-base text-text-primary placeholder:text-text-quaternary focus:border-text-primary focus:outline-2 focus:outline-offset-2 focus:outline-text-primary";

export function FieldLabel({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="type-eyebrow text-text-secondary">
      {children}
      {hint && <span className="ml-2 font-normal normal-case tracking-normal text-text-tertiary">{hint}</span>}
    </label>
  );
}

/** A labelled value in a results table. Values are literals, so they use the mono voice. */
export function Row({ label, value, note }: { label: string; value: React.ReactNode; note?: React.ReactNode }) {
  return (
    <div className="grid gap-x-8 gap-y-1 border-b border-border py-3.5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <dt className="type-eyebrow text-text-tertiary sm:pt-1">{label}</dt>
      <dd className="min-w-0">
        <span className="break-words font-mono text-text-primary">{value}</span>
        {note && <span className="mt-1 block text-sm text-text-tertiary">{note}</span>}
      </dd>
    </div>
  );
}

export function Examples({ items, onPick }: { items: string[]; onPick: (value: string) => void }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-sm text-text-tertiary">Try:</span>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPick(item)}
          className="tech-pill min-h-8 font-mono normal-case tracking-normal hover:text-text-primary transition-colors"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
