import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";

// Bump when the static pages change in a way worth re-crawling.
const SITE_UPDATED = "2026-11-13";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services", "/projects", "/blog", "/about", "/contact", "/certifications", "/deep-dives"];

  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path),
      lastModified: SITE_UPDATED,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: SITE_UPDATED,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.date,
    })),
  ];
}
