import type { Heading } from "./Prose";

function Items({ headings }: { headings: Heading[] }) {
  return (
    <ol className="space-y-3">
      {headings.map((h) => (
        <li key={h.id}>
          <a href={`#${h.id}`} className="block text-sm leading-snug text-text-tertiary hover:text-text-primary transition-colors">
            {h.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Sticky index beside the article on large screens. */
export function TocRail({ headings }: { headings: Heading[] }) {
  return (
    <nav aria-label="On this page" className="sticky top-24 hidden lg:block">
      <p className="type-eyebrow text-text-primary mb-4">On this page</p>
      <Items headings={headings} />
    </nav>
  );
}

/** Collapsed index above the article on small screens. */
export function TocDisclosure({ headings }: { headings: Heading[] }) {
  return (
    <details className="mb-10 border-y border-border lg:hidden">
      <summary className="flex min-h-12 cursor-pointer items-center type-eyebrow text-text-primary">
        On this page
      </summary>
      <nav aria-label="On this page" className="pb-5">
        <Items headings={headings} />
      </nav>
    </details>
  );
}
