import Link from "next/link";
import JsonLd, { breadcrumbLd } from "./JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. "Home" is added for you. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 type-eyebrow text-text-tertiary">
          {trail.map((item, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={item.path} className={`flex items-center gap-2 ${last ? "min-w-0 max-w-full" : ""}`}>
                {last ? (
                  <span aria-current="page" title={item.name} className="truncate py-1 text-text-secondary sm:whitespace-normal">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="tap hover:text-text-primary transition-colors">
                      {item.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(trail)} />
    </>
  );
}
