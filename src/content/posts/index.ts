import type { ComponentType } from "react";
import type { Heading } from "@/components/blog/Prose";
import ShrinkMlImage, { headings as shrinkMlImageHeadings } from "./shrink-ml-docker-image-multi-stage-build";
import OidcTerraform, { headings as oidcTerraformHeadings } from "./github-actions-aws-oidc-terraform";
import MysqlBackup, { headings as mysqlBackupHeadings } from "./mysql-backup-to-s3-bash-cron";
import GitopsArgo, { headings as gitopsArgoHeadings } from "./gitops-argocd-github-actions-eks";
import ThreeTier, { headings as threeTierHeadings } from "./aws-3-tier-architecture-terraform";
import PromGrafana, { headings as promGrafanaHeadings } from "./prometheus-grafana-docker-compose-alerts";
import KindCluster, { headings as kindClusterHeadings } from "./kind-multi-node-kubernetes-argocd";
import ActionsVsJenkins, { headings as actionsVsJenkinsHeadings } from "./github-actions-vs-jenkins-small-team";
import EksCost, { headings as eksCostHeadings } from "./eks-cluster-cost-per-month";

/** Article bodies by slug. Metadata lives in src/lib/posts.ts. */
export const postBodies: Record<string, { Body: ComponentType; headings: Heading[] }> = {
  "shrink-ml-docker-image-multi-stage-build": { Body: ShrinkMlImage, headings: shrinkMlImageHeadings },
  "github-actions-aws-oidc-terraform": { Body: OidcTerraform, headings: oidcTerraformHeadings },
  "mysql-backup-to-s3-bash-cron": { Body: MysqlBackup, headings: mysqlBackupHeadings },
  "gitops-argocd-github-actions-eks": { Body: GitopsArgo, headings: gitopsArgoHeadings },
  "aws-3-tier-architecture-terraform": { Body: ThreeTier, headings: threeTierHeadings },
  "prometheus-grafana-docker-compose-alerts": { Body: PromGrafana, headings: promGrafanaHeadings },
  "kind-multi-node-kubernetes-argocd": { Body: KindCluster, headings: kindClusterHeadings },
  "github-actions-vs-jenkins-small-team": { Body: ActionsVsJenkins, headings: actionsVsJenkinsHeadings },
  "eks-cluster-cost-per-month": { Body: EksCost, headings: eksCostHeadings },
};
