import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/*
 * Everything is open to crawlers, including the AI crawlers that read /llms.txt.
 * Pages that should stay out of search results (/resume, single-article tag pages) use a noindex
 * meta tag instead of a Disallow here: a blocked page can't be crawled, so its noindex would never be seen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Blog search results (/blog?q=...) are the same page as /blog, filtered in the browser.
        disallow: ["/blog?q="],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
