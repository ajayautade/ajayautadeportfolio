import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getPost, posts } from "@/lib/posts";

export const alt = "Article by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({ eyebrow: post ? post.tags.slice(0, 3).join(" · ") : "Blog", title: post?.title ?? "Blog" });
}
