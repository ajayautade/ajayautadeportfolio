import { meta as shrinkMlImage } from "@/content/posts/shrink-ml-docker-image-multi-stage-build";
import { meta as oidcTerraform } from "@/content/posts/github-actions-aws-oidc-terraform";
import { meta as mysqlBackup } from "@/content/posts/mysql-backup-to-s3-bash-cron";
import { meta as gitopsArgo } from "@/content/posts/gitops-argocd-github-actions-eks";
import { meta as threeTier } from "@/content/posts/aws-3-tier-architecture-terraform";
import { meta as promGrafana } from "@/content/posts/prometheus-grafana-docker-compose-alerts";
import { meta as kindCluster } from "@/content/posts/kind-multi-node-kubernetes-argocd";
import { meta as actionsVsJenkins } from "@/content/posts/github-actions-vs-jenkins-small-team";
import { meta as eksCost } from "@/content/posts/eks-cluster-cost-per-month";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string /* ISO yyyy-mm-dd */;
  /** ISO date of the last meaningful revision. Set it when you change an article's content. */
  updated?: string;
  tags: string[];
  readingMinutes: number;
}

/** Every published article, newest first. */
export const posts: PostMeta[] = [
  eksCost,
  actionsVsJenkins,
  gitopsArgo,
  threeTier,
  promGrafana,
  kindCluster,
  shrinkMlImage,
  oidcTerraform,
  mysqlBackup,
].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string): PostMeta | undefined => posts.find((post) => post.slug === slug);

/** The date search engines should treat as "last changed". */
export const lastModified = (post: PostMeta) => post.updated ?? post.date;

/** "CI/CD" → "ci-cd", "AWS S3" → "aws-s3". Used in /blog/tag/[tag] URLs. */
export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export interface TagInfo {
  name: string;
  slug: string;
  posts: PostMeta[];
}

/** Every tag in use, most-used first, then alphabetical. */
export const tags: TagInfo[] = [...new Set(posts.flatMap((post) => post.tags))]
  .map((name) => ({ name, slug: tagSlug(name), posts: posts.filter((post) => post.tags.includes(name)) }))
  .sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name));

export const getTag = (slug: string): TagInfo | undefined => tags.find((tag) => tag.slug === slug);

/** A tag page is only worth indexing once it lists more than one article. */
export const isIndexableTag = (tag: TagInfo) => tag.posts.length >= 2;
