import { ChevronDown } from "lucide-react";
import type { Heading } from "./Prose";

function Items({ headings }: { headings: Heading[] }) {
  return (
    <ol className="lg:space-y-3">
      {headings.map((h) => (
        <li key={h.id}>
          <a href={`#${h.id}`} className="flex min-h-11 items-center lg:block lg:min-h-0 text-sm leading-snug text-text-tertiary hover:text-text-primary transition-colors">
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
    <details className="group mb-10 border-y border-border lg:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 type-eyebrow text-text-primary [&::-webkit-details-marker]:hidden">
        <span>
          On this page <span className="ml-1 font-normal text-text-tertiary">{headings.length} sections</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-text-tertiary transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <nav aria-label="On this page" className="pb-5">
        <Items headings={headings} />
      </nav>
    </details>
  );
}
