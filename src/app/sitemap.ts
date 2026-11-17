import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { projects } from "@/lib/projects";
import { isIndexableTag, lastModified, posts, tags } from "@/lib/posts";
import { services } from "@/lib/services";

// Bump when the static pages change in a way worth re-crawling.
const SITE_UPDATED = "2026-11-15";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/services",
    "/pricing",
    "/projects",
    "/blog",
    "/about",
    "/contact",
    "/tools",
    "/tools/infrastructure-checkup",
    "/tools/cidr-subnet-calculator",
    "/tools/cron-expression-explainer",
    "/tools/kubernetes-resource-calculator",
    "/certifications",
    "/deep-dives",
    "/privacy",
    "/terms",
    "/refund-policy",
    "/shipping-policy",
  ];

  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path),
      lastModified: SITE_UPDATED,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.id}`),
      lastModified: SITE_UPDATED,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: SITE_UPDATED,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: lastModified(post),
    })),
    // Tag pages with a single article are noindex, so they stay out of the sitemap too.
    ...tags.filter(isIndexableTag).map((tag) => ({
      url: absoluteUrl(`/blog/tag/${tag.slug}`),
      lastModified: tag.posts.map(lastModified).sort().at(-1),
    })),
  ];
}
