import type { ComponentType } from "react";
import type { Heading } from "@/components/blog/Prose";
import ShrinkMlImage, { headings as shrinkMlImageHeadings } from "./shrink-ml-docker-image-multi-stage-build";
import OidcTerraform, { headings as oidcTerraformHeadings } from "./github-actions-aws-oidc-terraform";
import MysqlBackup, { headings as mysqlBackupHeadings } from "./mysql-backup-to-s3-bash-cron";

/** Article bodies by slug. Metadata lives in src/lib/posts.ts. */
export const postBodies: Record<string, { Body: ComponentType; headings: Heading[] }> = {
  "shrink-ml-docker-image-multi-stage-build": { Body: ShrinkMlImage, headings: shrinkMlImageHeadings },
  "github-actions-aws-oidc-terraform": { Body: OidcTerraform, headings: oidcTerraformHeadings },
  "mysql-backup-to-s3-bash-cron": { Body: MysqlBackup, headings: mysqlBackupHeadings },
};
