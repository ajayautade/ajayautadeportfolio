import { meta as shrinkMlImage } from "@/content/posts/shrink-ml-docker-image-multi-stage-build";
import { meta as oidcTerraform } from "@/content/posts/github-actions-aws-oidc-terraform";
import { meta as mysqlBackup } from "@/content/posts/mysql-backup-to-s3-bash-cron";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string /* ISO yyyy-mm-dd */;
  tags: string[];
  readingMinutes: number;
}

/** Every published article, newest first. */
export const posts: PostMeta[] = [shrinkMlImage, oidcTerraform, mysqlBackup].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const getPost = (slug: string): PostMeta | undefined => posts.find((post) => post.slug === slug);

