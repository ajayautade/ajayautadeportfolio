import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { projects } from "@/lib/projects";
import { isIndexableTag, lastModified, posts, tags } from "@/lib/posts";
import { services } from "@/lib/services";
import { toolPath, tools } from "@/lib/tools";

// Bump when the static pages change in a way worth re-crawling.
const SITE_UPDATED = "2026-11-22";

/** Newest "last changed" date among the articles: the blog index changes whenever one does. */
const BLOG_UPDATED = posts.map(lastModified).sort().at(-1) ?? SITE_UPDATED;

/*
 * Every indexable page, and only those. Left out on purpose:
 * - /resume (and /coverletter, which redirects to it): noindex
 * - tag pages with one article: noindex (see isIndexableTag)
 * - /feed.xml, share images and other non-HTML routes
 * Services, projects, posts, tags and tools come from their data files, so new ones are added here automatically.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/services",
    "/pricing",
    "/projects",
    "/about",
    "/contact",
    "/tools",
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
    { url: absoluteUrl("/blog"), lastModified: BLOG_UPDATED },
    ...tools.map((tool) => ({
      url: absoluteUrl(toolPath(tool.slug)),
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
