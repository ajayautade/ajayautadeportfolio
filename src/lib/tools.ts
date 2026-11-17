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
];

export const toolPath = (slug: string) => `/tools/${slug}`;
export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
