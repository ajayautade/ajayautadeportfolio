/** The free tools. Each runs entirely in the browser. */
export interface Tool {
  slug: string;
  title: string;
  summary: string;
  /** Short label for chips and cross-links. */
  short: string;
}

export const tools: Tool[] = [
  {
    slug: "infrastructure-checkup",
    title: "Infrastructure checkup",
    short: "Checkup",
    summary: "Twelve yes-or-no questions about backups, releases, access, monitoring and cost. You get a list of gaps in the order to fix them.",
  },
  {
    slug: "cidr-subnet-calculator",
    title: "CIDR subnet calculator",
    short: "CIDR calculator",
    summary: "Enter a CIDR block to see its range, mask and usable addresses, then split it into equal subnets. Includes the AWS reserved-address count.",
  },
  {
    slug: "cron-expression-explainer",
    title: "Cron expression explainer",
    short: "Cron explainer",
    summary: "Paste a five-field cron expression to read it in plain English, field by field, with the next run times in your time zone and UTC.",
  },
  {
    slug: "kubernetes-resource-calculator",
    title: "Kubernetes resource calculator",
    short: "K8s resources",
    summary: "Enter requests, limits and replicas to see the QoS class, total reservation, how many pods fit on a node, and the YAML to paste.",
  },
  {
    slug: "github-oidc-trust-policy",
    title: "GitHub OIDC trust policy generator",
    short: "OIDC trust policy",
    summary: "Build the IAM trust policy that lets GitHub Actions assume an AWS role without access keys, locked to one repository and branch or environment. JSON, Terraform or CLI.",
  },
  {
    slug: "iam-policy-explainer",
    title: "IAM policy explainer",
    short: "IAM explainer",
    summary: "Paste an IAM, S3 bucket or trust policy to read each statement in plain English, with warnings for public access, broad wildcards and ARNs that match nothing.",
  },
  {
    slug: "dockerfile-checker",
    title: "Dockerfile checker",
    short: "Dockerfile checker",
    summary: "Paste a Dockerfile to find unpinned images, root users, single-stage builds, secrets in ENV and cache-busting COPY order, with the fix for each.",
  },
  {
    slug: "aws-cost-estimator",
    title: "EKS and EC2 cost estimator",
    short: "AWS cost",
    summary: "Price an EKS cluster or EC2 instances per month, line by line, including NAT gateways, load balancers and public IPv4, from AWS's published on-demand prices.",
  },
];

export const toolPath = (slug: string) => `/tools/${slug}`;
export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
