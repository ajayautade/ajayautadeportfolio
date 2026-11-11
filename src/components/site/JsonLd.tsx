import { absoluteUrl, site } from "@/lib/site";

/** Renders one schema.org JSON-LD block. Only pass data that is true and visible on the page. */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const personLd = {
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  image: absoluteUrl("/profile.png"),
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "Amazon Web Services",
    "DevOps",
    "Kubernetes",
    "Docker",
    "Terraform",
    "CI/CD",
    "GitHub Actions",
    "Jenkins",
    "Argo CD",
    "Prometheus",
    "Grafana",
    "Linux",
  ],
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
