import Link from "next/link";
import { tagSlug, type PostMeta } from "@/lib/posts";
import { formatPostDate } from "./date";

/** One article in an editorial list: a row with a hairline, not a card. */
export default function PostRow({ post, headingLevel = "h2" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  const Title = headingLevel;
  return (
    <article className="grid gap-3 border-t border-border py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-10 sm:py-10">
      <p className="type-eyebrow text-text-tertiary sm:pt-2">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span className="sm:block sm:mt-2">
          <span className="sm:hidden" aria-hidden="true"> · </span>
          {post.readingMinutes} min read
        </span>
      </p>
      <div>
        <Title className="type-headline sm:type-display-md text-text-primary text-balance">
          <Link href={`/blog/${post.slug}`} className="block py-2 hover:underline decoration-2 underline-offset-4">
            {post.title}
          </Link>
        </Title>
        <p className="mt-3 max-w-2xl text-text-secondary text-pretty">{post.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Topics">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link href={`/blog/tag/${tagSlug(tag)}`} className="tech-pill min-h-8 hover:text-text-primary transition-colors">
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
