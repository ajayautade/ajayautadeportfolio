/**
 * The six services offered. Copy rules:
 * - Describe the work, not outcomes. No guaranteed savings, uptime or timelines.
 * - Only list tools that appear in the public projects or the skills list.
 */
export interface Service {
  id: string;
  title: string;
  /** One line used in lists and on the home page. */
  summary: string;
  /** What the service is, in two or three sentences. */
  intro: string;
  includes: string[];
  problems: string[];
  approach: string[];
  tools: string[];
  deliverables: string[];
  /** Slug of a public project that shows this kind of work. */
  relatedProject?: { slug: string; label: string };
}

export const services: Service[] = [
  {
    id: "aws-cloud-infrastructure",
    title: "Cloud Infrastructure & AWS",
    summary: "Network, compute, storage and access on AWS, set up so it can be rebuilt from code.",
    intro:
      "I set up the AWS foundation an application runs on: the network, the machines or cluster, storage, and who is allowed to do what. The aim is an account you can understand by reading its configuration.",
    includes: [
      "VPC design: subnets, routing, security groups",
      "EC2 instances or an EKS cluster, sized for the workload",
      "S3 buckets with sensible access and lifecycle rules",
      "IAM roles and policies with least-privilege access",
    ],
    problems: [
      "Resources were created by hand in the console and nobody remembers how",
      "Everything runs in one public subnet with wide-open security groups",
      "Access keys are shared between people and services",
    ],
    approach: [
      "Start with what you run today and what it needs to talk to",
      "Draw the target layout and agree on it before building",
      "Build it in Terraform, in a separate environment first where possible",
      "Hand over with a walkthrough and written notes",
    ],
    tools: ["AWS", "VPC", "EC2", "EKS", "S3", "IAM", "Terraform"],
    deliverables: [
      "Infrastructure defined in a Git repository you own",
      "A diagram of the network and the main resources",
      "A short README covering how to apply, change and destroy it",
    ],
    relatedProject: { slug: "aws-3tier-architecture", label: "AWS 3-tier architecture" },
  },
  {
    id: "ci-cd-automation",
    title: "DevOps & CI/CD Automation",
    summary: "Pipelines that test, build and deploy on every push, so a release stops being an event.",
    intro:
      "I build the pipeline between a commit and a running deployment: tests, linting, security scanning, image builds, and the deploy step itself. I work with GitHub Actions and Jenkins.",
    includes: [
      "Build, test and lint stages that run on every push",
      "Container image builds and pushes to a registry",
      "Image and dependency scanning with Trivy",
      "Automated deployment, including GitOps with Argo CD",
    ],
    problems: [
      "Deployments are manual steps someone runs from a laptop",
      "Bugs reach production because tests only run when someone remembers",
      "Long-lived cloud credentials are stored as CI secrets",
    ],
    approach: [
      "Map the current release steps, including the undocumented ones",
      "Automate the checks first, then the build, then the deploy",
      "Use short-lived credentials (OIDC) between CI and the cloud",
      "Keep the pipeline definition in the same repository as the code",
    ],
    tools: ["GitHub Actions", "Jenkins", "Argo CD", "Docker", "Trivy", "AWS ECR"],
    deliverables: [
      "Pipeline configuration committed to your repository",
      "A documented release flow, including how to roll back",
      "Credentials set up without long-lived keys where the platform allows it",
    ],
    relatedProject: { slug: "end-to-end-cicd-pipeline", label: "End-to-end CI/CD pipeline" },
  },
  {
    id: "docker-kubernetes",
    title: "Docker & Kubernetes",
    summary: "Containerise an application and run it on Kubernetes with health checks and autoscaling.",
    intro:
      "I package applications into container images and run them on Kubernetes. That covers the Dockerfile, the manifests or Helm chart, and the settings that keep the service healthy under load.",
    includes: [
      "Multi-stage Dockerfiles that keep images small",
      "Docker Compose setups for local development",
      "Kubernetes deployments, services and ingress",
      "Helm charts with per-environment values",
      "Health probes and Horizontal Pod Autoscaling",
    ],
    problems: [
      "The app runs on one server and every deploy means downtime",
      "\"It works on my machine\" differences between laptops and production",
      "Images are several gigabytes and slow to build and pull",
    ],
    approach: [
      "Containerise one service properly before touching the rest",
      "Get it running locally with Compose or kind",
      "Add probes and resource requests so Kubernetes can manage it",
      "Move to a managed cluster once the manifests are stable",
    ],
    tools: ["Docker", "Docker Compose", "Kubernetes", "Helm", "EKS", "kind"],
    deliverables: [
      "Dockerfiles and a Compose file for local work",
      "Kubernetes manifests or a Helm chart",
      "Notes on how to deploy, scale and debug the service",
    ],
    relatedProject: { slug: "mlops-sentiment-analyzer", label: "MLOps sentiment analyzer" },
  },
  {
    id: "infrastructure-as-code",
    title: "Infrastructure as Code",
    summary: "Terraform and Ansible, so environments are created from a repository instead of by hand.",
    intro:
      "I write the code that creates and configures infrastructure. Terraform provisions the cloud resources; Ansible configures what runs on them. Changes then go through review like any other code.",
    includes: [
      "Terraform modules for networks, clusters and registries",
      "Remote state and a workflow for plan and apply",
      "Ansible playbooks for server configuration",
      "Bringing hand-made resources under Terraform management",
    ],
    problems: [
      "Staging and production have drifted apart and nobody knows how",
      "Creating a new environment takes days of console work",
      "There is no record of who changed what, or why",
    ],
    approach: [
      "Inventory what exists and decide what to import versus rebuild",
      "Write small modules with clear inputs and outputs",
      "Run plans in CI so changes are visible before they apply",
      "Document the day-to-day workflow for your team",
    ],
    tools: ["Terraform", "Ansible", "AWS", "GitHub Actions"],
    deliverables: [
      "A Terraform codebase with modules and environment configuration",
      "Playbooks for any server configuration",
      "A written workflow for making and reviewing changes",
    ],
    relatedProject: { slug: "terraform-templates", label: "Terraform templates" },
  },
  {
    id: "monitoring-observability",
    title: "Monitoring & Observability",
    summary: "Prometheus and Grafana, so you find out about a problem before your users tell you.",
    intro:
      "I set up metrics, dashboards and alerts for applications and the infrastructure under them. The goal is a small set of signals people actually look at, and alerts that mean something.",
    includes: [
      "Prometheus installed and scraping your services",
      "Application metrics exposed from your code",
      "Grafana dashboards for the things you need to watch",
      "Alert rules for the conditions worth waking up for",
    ],
    problems: [
      "You learn about outages from customers",
      "There are dashboards, but nobody trusts or opens them",
      "Alerts fire so often that everyone ignores them",
    ],
    approach: [
      "Agree on what \"healthy\" means for each service",
      "Instrument those signals first: traffic, errors, latency, saturation",
      "Build one dashboard per service, not one per metric",
      "Add alerts last, and only for things someone must act on",
    ],
    tools: ["Prometheus", "Grafana", "Alertmanager", "CloudWatch"],
    deliverables: [
      "A monitoring stack deployed alongside your workloads",
      "Dashboards and alert rules stored as code",
      "A short guide to what each alert means and what to check",
    ],
    relatedProject: { slug: "moviesmonkey", label: "MoviesMonkey monitoring stack" },
  },
  {
    id: "cloud-optimization-reliability",
    title: "Cloud Optimization & Reliability",
    summary: "A review of what you run, what it costs and where it can fail, with fixes in priority order.",
    intro:
      "I review an existing setup for waste, weak points and missing safety nets such as backups. You get a written list of findings ordered by impact, and I can implement the ones you choose.",
    includes: [
      "A review of running resources against what is actually used",
      "Right-sizing and clean-up of idle resources",
      "Backup and restore for databases, including off-site copies",
      "Troubleshooting of failing or slow deployments",
    ],
    problems: [
      "The cloud bill keeps growing and nobody can say why",
      "Backups exist in theory but have never been restored",
      "Deployments fail intermittently and the cause is unclear",
    ],
    approach: [
      "Read-only access first: look before changing anything",
      "Write up findings with the evidence for each",
      "Fix the cheap, low-risk items before the structural ones",
      "Test restores and rollbacks instead of assuming they work",
    ],
    tools: ["AWS", "S3", "CloudWatch", "Bash", "Linux", "Terraform"],
    deliverables: [
      "A findings document ordered by impact and effort",
      "Automated backups with a tested restore procedure",
      "Changes applied through code, with before and after noted",
    ],
    relatedProject: { slug: "s3-database-backup-automation", label: "S3 database backup automation" },
  },
];

export const process = [
  {
    title: "A first conversation",
    text: "You tell me what you run and what is bothering you. I ask questions. No preparation needed.",
  },
  {
    title: "A written scope",
    text: "I send a short document: what I will do, what I need from you, and what you get at the end.",
  },
  {
    title: "The work, in the open",
    text: "Everything goes into your repositories and your cloud account. You can follow progress in pull requests.",
  },
  {
    title: "Handover",
    text: "A walkthrough call and written notes, so your team can run and change it without me.",
  },
] as const;

export const faqs = [
  {
    q: "Who owns the code and the infrastructure?",
    a: "You do. I work in your Git repositories and your cloud account, so everything stays with you when the work ends.",
  },
  {
    q: "Do you work with early-stage teams?",
    a: "Yes. Small teams without a dedicated DevOps person are who most of this is aimed at. A well-scoped first project is usually one pipeline or one environment.",
  },
  {
    q: "Can you promise a specific cost saving or uptime number?",
    a: "No. Those depend on your application and traffic, and anyone promising a number before looking is guessing. I can tell you what I find and what each change is likely to affect.",
  },
  {
    q: "Which cloud do you work with?",
    a: "Mostly AWS. The Kubernetes, Docker, Terraform and CI/CD work carries over to other providers.",
  },
  {
    q: "Are you available for full-time roles?",
    a: "Yes. I'm open to Cloud and DevOps engineering roles as well as freelance projects. The contact page works for both.",
  },
] as const;
