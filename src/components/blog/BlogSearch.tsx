"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import PostRow from "./PostRow";
import type { PostMeta } from "@/lib/posts";
import { searchPosts, type SearchDoc } from "@/lib/post-search";

interface BlogSearchProps {
  posts: PostMeta[];
  /** Section headings per slug, so a search can find a topic inside an article. */
  headings: Record<string, string[]>;
  /** A few tags offered as one-click searches. */
  suggestions: string[];
}

/** Search box and article list for /blog. Without a query it shows every article, newest first. */
export default function BlogSearch({ posts, headings, suggestions }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);

  // Read ?q= after mount, so the server-rendered list (all articles) matches the first client render.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      const id = requestAnimationFrame(() => setQuery(q));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  // Keep the query in the URL, so a search can be shared or survive a reload, without adding history entries.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [query]);

  // "/" focuses the search box, as on many developer sites.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      if (target.closest("input, textarea, select, [contenteditable=true]")) return;
      event.preventDefault();
      input.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const docs: SearchDoc[] = useMemo(
    () => posts.map((p) => ({ slug: p.slug, title: p.title, description: p.description, tags: p.tags, headings: headings[p.slug] ?? [] })),
    [posts, headings],
  );
  const matches = useMemo(() => searchPosts(docs, query), [docs, query]);
  const shown = matches === null ? posts : matches.map((slug) => posts.find((p) => p.slug === slug)!);

  const status =
    matches === null
      ? `${posts.length} ${posts.length === 1 ? "article" : "articles"}, newest first`
      : shown.length === 0
        ? `No articles match “${query.trim()}”`
        : `${shown.length} of ${posts.length} articles match “${query.trim()}”`;

  return (
    <>
      <form role="search" onSubmit={(event) => event.preventDefault()} className="max-w-2xl">
        <label htmlFor="blog-search" className="type-eyebrow text-text-secondary">
          Search articles
        </label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" aria-hidden="true" />
          <input
            ref={input}
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === "Escape" && setQuery("")}
            placeholder="Terraform, OIDC, backups…"
            autoComplete="off"
            spellCheck={false}
            aria-describedby="blog-search-status"
            className="block w-full rounded-sm border border-border-strong bg-bg py-3 pl-10 pr-12 text-base text-text-primary placeholder:text-text-quaternary focus:border-text-primary focus:outline-2 focus:outline-offset-2 focus:outline-text-primary [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                input.current?.focus();
              }}
              className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-sm border border-border px-1.5 font-mono text-xs text-text-tertiary sm:block">
              /
            </kbd>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-sm text-text-tertiary">Try:</span>
          {suggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              aria-pressed={query.trim().toLowerCase() === tag.toLowerCase()}
              className="tech-pill min-h-8 hover:text-text-primary transition-colors aria-pressed:bg-text-primary aria-pressed:text-bg"
            >
              {tag}
            </button>
          ))}
        </div>
      </form>

      <h2 id="articles-heading" className="mt-14 mb-8 type-eyebrow text-text-tertiary">
        <span id="blog-search-status" role="status" aria-live="polite">
          {status}
        </span>
      </h2>
      {shown.length > 0 ? (
        <div className="border-b border-border">
          {shown.map((post) => (
            <PostRow key={post.slug} post={post} headingLevel="h3" />
          ))}
        </div>
      ) : (
        <div className="border-t border-text-primary pt-6">
          <p className="max-w-xl text-text-secondary">
            Nothing on that yet. Try a broader word, or{" "}
            <Link href="/contact" className="text-text-primary underline decoration-primary decoration-2 underline-offset-4">
              ask me about it
            </Link>
            .
          </p>
          <button type="button" onClick={() => setQuery("")} className="btn-outline mt-6">
            Show all articles
          </button>
        </div>
      )}
    </>
  );
}
