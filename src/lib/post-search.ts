/**
 * Client-side search over the blog. Every word in the query must appear somewhere in the
 * article's title, description, tags or section headings. Results are ranked by where the
 * words matched: title first, then tags, headings and description.
 */

export interface SearchDoc {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  headings: string[];
}

const WEIGHTS = { title: 8, tags: 5, headings: 3, description: 2 } as const;

/** Lower-case, strip accents, and treat punctuation as spaces, so "ci/cd" matches "CI CD". */
export const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const queryTerms = (query: string) => normalize(query).split(" ").filter(Boolean);

/** Slugs of matching articles, best match first. An empty query returns null: show everything. */
export function searchPosts(docs: SearchDoc[], query: string): string[] | null {
  const terms = queryTerms(query);
  if (terms.length === 0) return null;

  const scored: { slug: string; score: number; index: number }[] = [];
  docs.forEach((doc, index) => {
    const fields = {
      title: normalize(doc.title),
      tags: normalize(doc.tags.join(" ")),
      headings: normalize(doc.headings.join(" ")),
      description: normalize(doc.description),
    };
    let score = 0;
    for (const term of terms) {
      let best = 0;
      for (const key of Object.keys(fields) as (keyof typeof fields)[]) {
        const text = fields[key];
        if (!text.includes(term)) continue;
        // A whole-word match beats a prefix or substring match.
        const whole = ` ${text} `.includes(` ${term} `);
        best = Math.max(best, WEIGHTS[key] * (whole ? 2 : 1));
      }
      if (best === 0) return; // every term must match somewhere
      score += best;
    }
    scored.push({ slug: doc.slug, score, index });
  });

  // Keep the newest-first order of the list as the tie-break.
  return scored.sort((a, b) => b.score - a.score || a.index - b.index).map((s) => s.slug);
}
