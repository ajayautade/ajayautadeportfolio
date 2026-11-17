/**
 * Published prices. These are offers, not results: nothing here promises an outcome.
 * "from" prices are the starting point for the scope described; the final amount is
 * fixed in a written scope before any payment is taken.
 */
export interface PriceItem {
  id: string;
  title: string;
  /** Amount in whole US dollars. */
  amount: number;
  /** True when the amount is a starting price that depends on scope. */
  from: boolean;
  /** What the price covers, in one or two sentences. */
  covers: string;
  /** Matching entry in src/lib/services.ts, if there is one. */
  serviceId?: string;
}

export const currency = "USD";

export const priceItems: PriceItem[] = [
  {
    id: "intro-call",
    title: "Intro call, 30 minutes",
    amount: 0,
    from: false,
    covers:
      "A free video call to hear what you run and what is bothering you, and to see whether I can help. No preparation needed and no obligation.",
  },
  {
    id: "consultation",
    title: "Working session, 60 minutes",
    amount: 29,
    from: false,
    covers:
      "A paid video call where we work through one problem in detail: I look at your setup with you and say what I would do first. You get a short written summary by email afterwards.",
  },
  {
    id: "infrastructure-review",
    title: "Infrastructure and cost review",
    amount: 149,
    from: true,
    covers:
      "Read-only review of one AWS account or environment, with a written list of findings ordered by impact and effort.",
    serviceId: "cloud-optimization-reliability",
  },
  {
    id: "ci-cd-pipeline",
    title: "CI/CD pipeline",
    amount: 199,
    from: true,
    covers:
      "Build, test, scan and deploy pipeline for one repository and one environment, in GitHub Actions or Jenkins, with a documented release flow.",
    serviceId: "ci-cd-automation",
  },
  {
    id: "monitoring-stack",
    title: "Monitoring stack",
    amount: 199,
    from: true,
    covers:
      "Prometheus and Grafana for one application: metrics scraping, one dashboard per service, and alert rules stored as code.",
    serviceId: "monitoring-observability",
  },
  {
    id: "containerise-and-deploy",
    title: "Containerise and deploy to Kubernetes",
    amount: 249,
    from: true,
    covers:
      "Dockerfile, local Compose setup and Kubernetes manifests or a Helm chart for one service, with health probes and resource requests.",
    serviceId: "docker-kubernetes",
  },
  {
    id: "terraform-codebase",
    title: "Terraform codebase",
    amount: 249,
    from: true,
    covers:
      "Terraform modules, remote state and a plan-and-apply workflow for one environment, including importing existing resources where practical.",
    serviceId: "infrastructure-as-code",
  },
  {
    id: "aws-foundation",
    title: "AWS foundation",
    amount: 299,
    from: true,
    covers:
      "VPC, subnets, security groups, compute and IAM roles for one environment, defined in Terraform in a repository you own, with a diagram and README.",
    serviceId: "aws-cloud-infrastructure",
  },
];

/** 199 → "$199" */
export const formatUsd = (amount: number) => (amount === 0 ? "Free" : `$${amount.toLocaleString("en-US")}`);
export const formatPrice = formatUsd;
export const formatInr = formatUsd;

export const priceLabel = (item: PriceItem) => `${item.from ? "From " : ""}${formatPrice(item.amount)}`;

export const priceForService = (serviceId: string) => priceItems.find((item) => item.serviceId === serviceId);
