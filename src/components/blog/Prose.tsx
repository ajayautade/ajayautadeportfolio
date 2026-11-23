import Link from "next/link";

export interface Heading {
  id: string;
  title: string;
}

/**
 * The reading column. Sets measure, size and rhythm for everything inside
 * an article, so the article files can stay plain: <p>, <ul>, <code>, <a>.
 */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        "max-w-[68ch] text-[1.0625rem] sm:text-lg leading-[1.7] text-text-secondary",
        "[&_p]:mt-5 [&>p:first-child]:mt-0",
        "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_li]:mt-2 [&_li]:pl-1 [&_li]:marker:text-text-quaternary",
        "[&_strong]:font-semibold [&_strong]:text-text-primary",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-text-primary",
        "[&_:not(pre)>code]:rounded-sm [&_:not(pre)>code]:bg-surface-elevated [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5",
        "[&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.8125em] [&_:not(pre)>code]:text-text-primary [&_:not(pre)>code]:break-words",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/** Section heading with an id, so the table of contents and deep links can target it. */
export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group mt-14 scroll-mt-24 type-headline text-text-primary text-balance">
      <a href={`#${id}`} className="block py-2 !text-text-primary !no-underline">
        {children}
        <span aria-hidden="true" className="ml-2 text-text-quaternary opacity-0 transition-opacity group-hover:opacity-100">
          #
        </span>
      </a>
    </h2>
  );
}

export function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="mt-9 scroll-mt-24 type-card-title text-text-primary">
      {children}
    </h3>
  );
}

/** A side note. A rule on the left, no box. */
export function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="mt-7 border-l-2 border-primary pl-5 [&>p:first-of-type]:mt-0">
      {title && <p className="type-eyebrow text-text-primary mb-2">{title}</p>}
      {children}
    </aside>
  );
}

/** Internal link that keeps client-side navigation. */
export function A({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/**
 * A plain data table: hairlines, mono figures. On phones each row stacks
 * into a small block (see .stack-table in globals.css) so no column is
 * hidden off the edge of the screen.
 */
export function DataTable({ caption, head, rows }: { caption: string; head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="mt-7 sm:overflow-x-auto">
      <table role="table" className="stack-table w-full border-t border-text-primary text-left text-base sm:min-w-[30rem]">
        <caption className="sr-only">{caption}</caption>
        <thead role="rowgroup">
          <tr role="row" className="border-b border-border">
            {head.map((cell) => (
              <th key={cell} role="columnheader" scope="col" className="py-3 pr-5 align-bottom type-eyebrow text-text-tertiary last:pr-0">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {rows.map((row, i) => (
            <tr key={i} role="row" className="border-b border-border">
              {row.map((cell, j) => (
                <td
                  key={j}
                  role="cell"
                  data-label={j === 0 ? undefined : head[j]}
                  className={`py-3 pr-5 align-top last:pr-0 ${j === 0 ? "stack-title font-medium text-text-primary" : "font-mono text-[0.9375rem] text-text-secondary"}`}
                >
                  {/* One wrapper, so the stacked layout sees label + value as two grid items */}
                  <span className="block min-w-0">{cell}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
