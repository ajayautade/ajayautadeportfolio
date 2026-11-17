/**
 * Questions for the infrastructure checkup. They come from the "problems" lists in
 * src/lib/services.ts. A "yes" means the practice is in place; "no" or "not sure" is a gap.
 * Priority is a judgement about what hurts most when it is missing, not a measured score.
 */
export type Priority = 1 | 2 | 3;

export interface CheckupQuestion {
  id: string;
  area: string;
  question: string;
  /** Shown when the answer is "no" or "not sure": why the gap matters. */
  why: string;
  priority: Priority;
  /** Service page that covers this gap. */
  serviceId: string;
  /** Article that walks through the fix, if one exists. */
  postSlug?: string;
}

export const priorityLabels: Record<Priority, string> = {
  1: "Fix first",
  2: "Fix next",
  3: "Then",
};

export const checkupQuestions: CheckupQuestion[] = [
  {
    id: "backups-offsite",
    area: "Backups",
    question: "Are your databases backed up automatically, to somewhere other than the server they run on?",
    why: "A backup kept on the same machine is lost along with the machine.",
    priority: 1,
    serviceId: "cloud-optimization-reliability",
    postSlug: "mysql-backup-to-s3-bash-cron",
  },
  {
    id: "backups-restored",
    area: "Backups",
    question: "Has someone restored one of those backups recently, to check that it works?",
    why: "A backup nobody has restored is an assumption. The first restore should not happen during an outage.",
    priority: 1,
    serviceId: "cloud-optimization-reliability",
    postSlug: "mysql-backup-to-s3-bash-cron",
  },
  {
    id: "rollback",
    area: "Releases",
    question: "Can you roll back a bad release with steps that are written down?",
    why: "Without a known way back, every failed deploy becomes live debugging in production.",
    priority: 1,
    serviceId: "ci-cd-automation",
  },
  {
    id: "alerts",
    area: "Monitoring",
    question: "Would an alert tell you about an outage before a customer does?",
    why: "If customers are the monitoring system, every outage lasts longer than it needs to.",
    priority: 1,
    serviceId: "monitoring-observability",
  },
  {
    id: "own-credentials",
    area: "Access",
    question: "Does each person and each service have its own credentials, with no shared access keys?",
    why: "Shared keys cannot be revoked for one person, and nobody can tell who did what.",
    priority: 1,
    serviceId: "aws-cloud-infrastructure",
  },
  {
    id: "ci-short-lived",
    area: "Access",
    question: "Does your CI deploy to the cloud without long-lived access keys stored as secrets?",
    why: "A long-lived key in CI secrets keeps working for whoever copies it, until someone rotates it.",
    priority: 2,
    serviceId: "ci-cd-automation",
    postSlug: "github-actions-aws-oidc-terraform",
  },
  {
    id: "tests-on-push",
    area: "Releases",
    question: "Do tests run automatically on every push?",
    why: "Tests that run only when someone remembers will miss the change that breaks things.",
    priority: 2,
    serviceId: "ci-cd-automation",
  },
  {
    id: "no-laptop-deploys",
    area: "Releases",
    question: "Can you deploy without someone running commands from their own laptop?",
    why: "Manual deploys depend on one person's machine and memory, and the steps drift over time.",
    priority: 2,
    serviceId: "ci-cd-automation",
    postSlug: "gitops-argocd-github-actions-eks",
  },
  {
    id: "rebuild-from-code",
    area: "Infrastructure",
    question: "Could you rebuild your environment from a repository, without clicking through a cloud console?",
    why: "Resources made by hand are hard to reproduce, review or recover after a mistake.",
    priority: 2,
    serviceId: "infrastructure-as-code",
    postSlug: "aws-3-tier-architecture-terraform",
  },
  {
    id: "same-everywhere",
    area: "Infrastructure",
    question: "Does the application run the same way on a laptop as in production, for example in containers?",
    why: "Differences between environments are where “it works on my machine” bugs come from.",
    priority: 3,
    serviceId: "docker-kubernetes",
  },
  {
    id: "alerts-acted-on",
    area: "Monitoring",
    question: "When an alert fires, does someone act on it?",
    why: "Alerts that fire too often get ignored, including the one that matters.",
    priority: 3,
    serviceId: "monitoring-observability",
    postSlug: "prometheus-grafana-docker-compose-alerts",
  },
  {
    id: "bill-explained",
    area: "Cost",
    question: "Can you say what each large line on your cloud bill is for?",
    why: "Resources without an owner or a reason keep costing money after they stop being useful.",
    priority: 3,
    serviceId: "cloud-optimization-reliability",
  },
];
