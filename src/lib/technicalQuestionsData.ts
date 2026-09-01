export interface TechnicalQA {
  id: string;
  category: string;
  question: string;
  answer: string;
  techTags: string[];
  metrics?: string[];
  projectRef?: string;
}

export const qaCategories = [
  "All",
  "Cloud & Architecture",
  "Kubernetes & Security",
  "CI/CD & DevSecOps",
  "Incidents & Reliability",
  "Career & Culture",
] as const;

export type QACategory = (typeof qaCategories)[number];

export const technicalQuestions: TechnicalQA[] = [
  // ─── 1. Complex Production Cloud Platform ───
  {
    id: "cloud-platform",
    category: "Cloud & Architecture",
    question:
      "Describe the most complex production cloud platform or infrastructure environment you have personally designed, built, or operated.",
    answer: `The biggest thing I've built end-to-end is the infrastructure behind my MLOps Sentiment Analyzer project. It's a multi-tier setup on AWS — I wrote modular Terraform to spin up an EKS cluster across multiple availability zones, with separate node groups for the API layer and the ML inference workloads.

The part I'm most proud of is how everything connects. Terraform provisions the VPC with private subnets and NAT gateways, sets up the EKS cluster with OIDC for IAM Roles for Service Accounts, and configures the ECR repos. Then ArgoCD watches the GitOps repo and auto-syncs any manifest changes within 3 minutes. Karpenter handles node autoscaling so I'm not paying for idle compute when traffic is low.

At Invictus, I automated the provisioning of EC2, S3, VPC, and IAM resources using Terraform modules. What used to take the team hours of clicking through the console — I turned that into a single "terraform apply" that completes in minutes. The modules were reusable across projects, which saved even more time for the next team that needed infrastructure.

I also set up Prometheus and Grafana on the cluster with custom PromQL queries — things like container memory usage rates, request latency percentiles, and pod restart counts. When something spikes, I get alerted before users notice.`,
    techTags: [
      "AWS EKS",
      "Terraform",
      "ArgoCD",
      "Karpenter",
      "Prometheus",
      "Grafana",
      "VPC",
      "IAM",
    ],
    metrics: [
      "Multi-AZ EKS cluster",
      "3-min GitOps sync",
      "Hours to minutes provisioning",
    ],
    projectRef: "MLOps Sentiment Analyzer",
  },

  // ─── 2. Kubernetes in Production ───
  {
    id: "kubernetes-production",
    category: "Kubernetes & Security",
    question:
      "Describe your hands-on experience securing and operating Kubernetes in production.",
    answer: `I've been working with Kubernetes pretty heavily across both my projects and my internship at Invictus. During the internship, I containerized 4+ client applications with Docker and deployed them on Kubernetes clusters with zero-downtime rolling updates.

For my own projects — like MoviesMonkey — I took security more seriously than most people do in personal projects because I wanted to learn it properly. I enforced Pod Security Standards at the "restricted" level, which means no root containers, read-only root filesystems, and dropping all Linux capabilities. Every container runs as a non-root user with a specific UID.

I set up RBAC with least-privilege service accounts — each microservice gets only the permissions it actually needs. For network isolation, I wrote Calico NetworkPolicies with default-deny ingress and egress, then explicitly whitelisted only the traffic paths that should exist. So the API pod can talk to the ML inference service, but the inference service can't reach the internet directly.

For image security, I integrated Trivy into the CI pipeline. Any image with a CRITICAL or HIGH CVE gets blocked from deploying. The images themselves are multi-stage builds based on distroless — the final image has no shell, no package manager, nothing an attacker could use.

I also configured HPA to scale pods from 2 to 10 based on CPU (70% threshold) and memory (80% threshold), so the cluster handles traffic spikes automatically without me getting paged at 2am.`,
    techTags: [
      "Kubernetes",
      "RBAC",
      "Pod Security Standards",
      "Calico",
      "NetworkPolicies",
      "Trivy",
      "HPA",
      "Distroless",
    ],
    metrics: [
      "Zero-downtime deployments",
      "4+ apps containerized",
      "2 to 10 pod autoscaling",
      "0 critical CVEs in prod",
    ],
    projectRef: "MoviesMonkey",
  },

  // ─── 3. Infrastructure as Code ───
  {
    id: "iac-terraform",
    category: "Cloud & Architecture",
    question:
      "Describe how you have used Infrastructure as Code to provision and control production infrastructure.",
    answer: `Terraform is probably the tool I use most. I've structured my IaC as reusable modules — one for VPC, one for EKS, one for ECR, one for IAM roles. Each module takes variables like environment name, CIDR ranges, and instance types, so I can deploy dev, staging, and production from the same codebase just by swapping the tfvars file.

For state management, I use an S3 backend with DynamoDB locking. This was something I learned the hard way early on — I corrupted state once by running terraform apply from two terminals simultaneously. After that, I set up DynamoDB locking and never had the issue again.

In my CI/CD setup, when someone opens a PR that touches Terraform files, GitHub Actions runs "terraform plan" and posts the output as a PR comment. The team can review exactly what infrastructure changes will happen before anyone approves. After merge, it automatically applies.

At Invictus, I automated their entire AWS provisioning — EC2 instances, S3 buckets, VPCs with proper subnet segmentation, and IAM policies. The big win was consistency: every environment was identical because it came from the same Terraform code. No more "works in staging but not in prod" because someone manually tweaked a security group.

I also use Ansible for configuration management on top of Terraform. Terraform builds the infrastructure, Ansible configures what runs on it — installing Docker, setting up monitoring agents, configuring log shipping.`,
    techTags: [
      "Terraform",
      "AWS",
      "S3 Backend",
      "DynamoDB",
      "GitHub Actions",
      "Ansible",
      "Modular IaC",
    ],
    metrics: [
      "Multi-env from single codebase",
      "PR-based plan reviews",
      "Manual setup to automated",
    ],
    projectRef: "MLOps Sentiment Analyzer",
  },

  // ─── 4. Secrets & Key Management ───
  {
    id: "secrets-management",
    category: "Kubernetes & Security",
    question:
      "Describe a production implementation where you used Vault, AWS KMS/Secrets Manager, or an equivalent system for secrets or key management.",
    answer: `I'm very strict about one thing: no secrets in Git, ever. Not even in "private" repos.

In my EKS projects, I use AWS Secrets Manager combined with the External Secrets Operator (ESO). The flow works like this: secrets are stored in AWS Secrets Manager, ESO watches for ExternalSecret custom resources in Kubernetes, pulls the values from AWS, and creates native Kubernetes Secrets that pods can mount as volumes or env vars. If the secret rotates in AWS, ESO picks up the change automatically.

The authentication between EKS and AWS uses IRSA (IAM Roles for Service Accounts). Each service account gets a narrowly-scoped IAM role — the API service can read database credentials but not the ML model keys, and vice versa. No shared credentials.

For my CI/CD pipelines, GitHub Actions secrets store the AWS access keys and Docker registry tokens. These are injected at runtime and never written to logs — I've added explicit masking rules and set shell options to prevent accidental echo.

During my internship, I helped the team move away from hardcoded credentials in docker-compose files and environment scripts. We migrated everything to parameterized configs where secrets came from the CI system or a vault, not from files checked into version control.

It's not the most glamorous work, but getting secrets management right from the start saves you from the nightmare of rotating every credential in your system after a breach.`,
    techTags: [
      "AWS Secrets Manager",
      "External Secrets Operator",
      "IRSA",
      "GitHub Actions Secrets",
      "IAM",
      "KMS",
    ],
    metrics: [
      "Zero secrets in Git",
      "Auto-rotation via ESO",
      "Least-privilege IRSA",
    ],
  },

  // ─── 5. Security-Sensitive CI/CD Pipeline ───
  {
    id: "cicd-security",
    category: "CI/CD & DevSecOps",
    question:
      "Describe a CI/CD pipeline you designed or significantly improved for a security-sensitive production system.",
    answer: `My MoviesMonkey project has what I consider a properly hardened CI/CD pipeline — I designed it as a dual-pipeline system using GitHub Actions.

The first pipeline handles the application side: on every push, it runs linting, unit tests, builds the Docker image with a multi-stage Dockerfile, then runs Trivy to scan for vulnerabilities. If Trivy finds anything CRITICAL or HIGH, the pipeline fails and the image never gets pushed. Only clean images make it to ECR.

The second pipeline is the GitOps side. Once the image is pushed, it updates the Kubernetes manifest in the GitOps repo with the new image tag. ArgoCD detects the change and auto-syncs to the EKS cluster within 3 minutes. This separation is important — the application team never has direct kubectl access to production. Everything goes through Git.

At Invictus, I redesigned their deployment process. Before I joined, releases meant someone SSHing into a server and pulling the latest code. I built Jenkins and GitHub Actions pipelines that automated the entire flow — build, test, containerize, deploy. Release time dropped by 60% across 4+ applications, and more importantly, every deployment was repeatable and auditable.

One thing I always do is sign container images. I use Cosign to sign images after they pass all checks, and ArgoCD verifies signatures before deploying. This way, even if someone pushes a malicious image to ECR directly, ArgoCD won't deploy it because the signature won't match.

I also generate SBOMs (Software Bill of Materials) with Syft for every build. It's not required right now, but regulatory requirements are moving that direction, and having it from day one means we're already compliant.`,
    techTags: [
      "GitHub Actions",
      "ArgoCD",
      "Trivy",
      "Cosign",
      "Syft",
      "SBOM",
      "Docker",
      "Jenkins",
    ],
    metrics: [
      "60% faster releases",
      "Dual-pipeline architecture",
      "Zero CVEs in deployed images",
      "Image signing with Cosign",
    ],
    projectRef: "MoviesMonkey",
  },

  // ─── 6. Network Isolation ───
  {
    id: "network-isolation",
    category: "Kubernetes & Security",
    question:
      "Describe how you implemented network isolation and policy enforcement for production workloads.",
    answer: `Network isolation is something I take seriously because it's the kind of thing nobody notices until it fails — and then it fails catastrophically.

In my EKS deployments, I start with the AWS layer: private subnets for all workloads, public subnets only for the load balancer. NAT gateways for outbound traffic so pods can pull images and call external APIs, but nothing from the internet can reach pods directly. Security Groups are configured per-service, not per-cluster.

Inside Kubernetes, I use Calico for NetworkPolicy enforcement. My default policy is deny-all ingress and deny-all egress for every namespace. Then I add explicit allow rules for each legitimate traffic flow. For example, in MoviesMonkey the API pods can receive traffic from the Ingress controller on port 8080, and they can send requests to MongoDB on port 27017 — but they can't reach the Prometheus namespace or the kube-system namespace directly.

I also segment by namespace — each project gets its own namespace with its own RBAC and network policies. This way, even if an attacker compromises one service, they can't lateral-move to unrelated workloads.

For DNS, I restrict egress DNS to only the CoreDNS service within the cluster. This prevents data exfiltration through DNS tunneling, which is a real attack vector people often overlook.

At the application level, all service-to-service communication goes through Kubernetes Services, never direct pod IPs. This gives me a stable abstraction layer and makes policy enforcement much cleaner.`,
    techTags: [
      "Calico",
      "NetworkPolicies",
      "AWS VPC",
      "Security Groups",
      "Private Subnets",
      "NAT Gateway",
      "CoreDNS",
    ],
    metrics: [
      "Default deny-all policies",
      "Per-service Security Groups",
      "Namespace-level isolation",
    ],
  },

  // ─── 7. Hardened Workloads ───
  {
    id: "hardened-workloads",
    category: "Kubernetes & Security",
    question:
      "Describe your experience with hardened, sandboxed, or confidential-computing workloads.",
    answer: `I haven't worked with full confidential computing (like Intel SGX enclaves) yet — I want to be honest about that. But I have spent a lot of time hardening container workloads to minimize the attack surface.

Every container I deploy follows a strict baseline: readOnlyRootFilesystem set to true so the container filesystem is immutable at runtime. runAsNonRoot with a specific UID (usually 10001) — no root, period. All Linux capabilities dropped, then I only add back the specific ones needed (if any). Seccomp profiles set to RuntimeDefault at minimum. And no privilege escalation allowed.

My Docker images are built with multi-stage builds. The build stage has all the compilers and tools, but the final runtime image is based on distroless or alpine with the minimal packages needed. For my MLOps project, this shrank the image from 3GB to about 800MB — a 73% reduction. Smaller image means smaller attack surface and faster pulls.

I enforce these standards at the cluster level using Pod Security Standards (PSS) in "restricted" mode. If someone tries to deploy a pod that runs as root or mounts a host path, the admission controller rejects it immediately.

For additional isolation on sensitive workloads, I've experimented with gVisor (runsc runtime) which provides a user-space kernel between the container and the host. It's heavier than standard runc but gives much stronger isolation — useful for running untrusted code or multi-tenant scenarios.`,
    techTags: [
      "Pod Security Standards",
      "Distroless",
      "Seccomp",
      "gVisor",
      "Multi-stage Builds",
      "Linux Capabilities",
    ],
    metrics: [
      "73% image size reduction",
      "3GB to 800MB images",
      "PSS Restricted enforcement",
    ],
    projectRef: "MLOps Sentiment Analyzer",
  },

  // ─── 8. Production Incident ───
  {
    id: "production-incident",
    category: "Incidents & Reliability",
    question:
      "Describe a serious production infrastructure incident you personally diagnosed and resolved.",
    answer: `The scariest moment was during load testing of my MLOps Sentiment Analyzer. I was simulating a traffic spike with 500 concurrent requests, and suddenly pods started getting OOMKilled in a cascade. One pod would die, traffic would shift to the remaining pods, they'd get overwhelmed too, and within 2 minutes I had zero healthy pods.

My first instinct was to check Grafana. The container_memory_working_set_bytes metric showed the ML model was eating way more memory than I'd allocated. I had set the memory limit to 512Mi, but the sentiment analysis model needed about 600Mi at peak inference load. Under low traffic it was fine, but concurrent requests caused the model to hold multiple inference batches in memory simultaneously.

Here's what I did: First, immediate fix — bumped the memory limit to 1Gi and request to 768Mi. Pods stopped dying. Second, root cause — the FastAPI application was creating a new model instance per request instead of sharing one. I refactored it to load the model once at startup and reuse it across requests. Third, prevention — I added HPA headroom. Instead of scaling at 80% memory, I dropped it to 65% so new pods spin up before existing ones are under pressure. I also added a Redis-backed request queue for backpressure, so during extreme spikes, requests queue up instead of overwhelming the inference pods. Fourth, monitoring — I created a dedicated Grafana dashboard with panels for model inference latency, memory usage rate-of-change, and pod restart counts. I also added a PromQL alert that fires when memory usage exceeds 70% for more than 2 minutes.

After these changes, the same 500-concurrent-request test ran cleanly with zero OOMKills and p99 latency under 400ms.`,
    techTags: [
      "Prometheus",
      "Grafana",
      "PromQL",
      "HPA",
      "OOMKill",
      "Kubernetes",
      "Redis",
      "FastAPI",
    ],
    metrics: [
      "500 concurrent requests handled",
      "0 OOMKills after fix",
      "p99 latency under 400ms",
      "70% memory alert threshold",
    ],
    projectRef: "MLOps Sentiment Analyzer",
  },

  // ─── 9. DevSecOps Architecture Challenge ───
  {
    id: "devsecops-architecture",
    category: "CI/CD & DevSecOps",
    question:
      "DevSecOps Architecture Challenge: Design the production platform for a security-sensitive multi-tenant backend running containerized services that must scale horizontally and strongly isolate workloads and secrets.",
    answer: `This is how I'd approach it, drawing from what I've already built and extending it for multi-tenancy.

Cluster Layer: One EKS cluster with dedicated node groups per tenant using taints and tolerations. Tenant A's pods can only schedule on Tenant A's nodes. This gives hardware-level isolation without the cost of separate clusters. Karpenter manages the node groups with Spot instances for non-critical workloads and On-Demand for production.

Namespace Isolation: Each tenant gets their own namespace with ResourceQuotas to prevent one tenant from starving others, LimitRanges to enforce minimum/maximum resource requests per pod, NetworkPolicies (default deny-all, explicit allow per-service), and separate RBAC roles so tenant admins can only see their own namespace.

Secrets Architecture: Each tenant gets a dedicated path in AWS Secrets Manager (e.g., /tenants/acme/db-creds). IAM Roles for Service Accounts (IRSA) ensure that Tenant A's pods can only access Tenant A's secrets. External Secrets Operator syncs them into Kubernetes Secrets scoped to the tenant namespace. Secrets rotate on a 30-day schedule automatically.

CI/CD: Separate GitHub Actions workflows per tenant, each with its own set of secrets. Images are scanned with Trivy, signed with Cosign, and pushed to tenant-specific ECR repos. ArgoCD ApplicationSets dynamically generate one ArgoCD Application per tenant, watching their specific GitOps directory.

Security Controls: AWS WAF on the ALB for L7 protection. Pod Security Standards in "restricted" mode cluster-wide. Falco for runtime anomaly detection. Audit logs shipped to CloudWatch Logs and a SIEM for centralized monitoring. All service-to-service communication over mTLS via a service mesh.

Observability: Prometheus with tenant-label-aware recording rules, Grafana dashboards filtered by tenant, and PagerDuty integration with escalation policies per tenant's SLA tier.`,
    techTags: [
      "EKS",
      "Multi-Tenancy",
      "IRSA",
      "Karpenter",
      "Falco",
      "AWS WAF",
      "Cosign",
      "ArgoCD ApplicationSets",
      "mTLS",
    ],
    metrics: [
      "Per-tenant node isolation",
      "30-day secret rotation",
      "Namespace-scoped RBAC",
    ],
  },

  // ─── 10. Observability & SLOs ───
  {
    id: "observability-slos",
    category: "Incidents & Reliability",
    question:
      "How do you set up monitoring, define SLIs/SLOs, and handle incident response?",
    answer: `My monitoring setup follows the same pattern across all my projects because I want consistency.

Stack: Prometheus for metrics collection, Grafana for dashboards, and CloudWatch as the secondary source for AWS-level metrics. I also use Prometheus Alertmanager for routing alerts.

For my MLOps project, I track 9 real-time inference metrics. The key SLIs I define are: Availability — percentage of successful HTTP responses (non-5xx) over a 5-minute window. Latency — p50, p95, and p99 response times for the /predict endpoint. Error Rate — rate of 5xx responses as a percentage of total requests.

Based on these SLIs, I set SLOs like "99.9% availability over a 30-day rolling window" and "p99 latency under 500ms." The error budget is the gap between the SLO and 100% — if I burn through it too fast, I stop deploying features and focus on reliability.

Alert Rules: I wrote 4 custom PromQL alert rules for MoviesMonkey. For example, one fires if the error rate exceeds 1% for 5 consecutive minutes. Another alerts when pod restart count increases more than 3 times in 10 minutes — that usually means an OOMKill loop.

For incident response, I follow a simple playbook: Acknowledge the alert within 5 minutes. Assess severity (P1 = users impacted, P2 = degraded performance, P3 = internal only). Mitigate first, root-cause later — get traffic flowing again before debugging. Write a blameless post-mortem with timeline, root cause, and action items.

I believe monitoring should be set up before the first deployment, not after the first outage. Every project I start gets a Prometheus + Grafana stack from day one.`,
    techTags: [
      "Prometheus",
      "Grafana",
      "CloudWatch",
      "Alertmanager",
      "PromQL",
      "SLIs",
      "SLOs",
    ],
    metrics: [
      "9 real-time metrics",
      "4 custom alert rules",
      "99.9% availability SLO",
      "p99 under 500ms target",
    ],
    projectRef: "MLOps Sentiment Analyzer",
  },

  // ─── 11. Cost Optimization (FinOps) ───
  {
    id: "cost-optimization",
    category: "Incidents & Reliability",
    question:
      "How would you approach cloud cost optimization without compromising reliability?",
    answer: `Cost is something I think about from the architecture phase, not as an afterthought.

In my EKS projects, the biggest cost lever is compute. Here's what I do:

Right-sizing: Before deploying, I load test to understand actual resource needs. Then I set requests based on the p95 usage and limits based on the peak + 20% headroom. Most people either over-provision (wasting money) or under-provision (causing OOMKills). I aim for the sweet spot.

Autoscaling: I use Karpenter instead of Cluster Autoscaler because it's faster and smarter. Karpenter can provision the exact right instance type based on pending pod requirements, and it supports Spot instances natively. For non-critical workloads like batch processing or dev environments, I run 80% Spot with On-Demand fallback. For production APIs, I use On-Demand with Reserved Instance coverage for the baseline.

Architecture-level savings: Multi-stage Docker builds reduced image sizes by 73%, which means faster pulls, less ECR storage, and faster scaling. S3 lifecycle policies to move old logs from Standard to Glacier after 30 days. Terraform modules that enforce tagging on every resource — if it's not tagged with team, project, and environment, it gets flagged in the weekly cost review.

The Terraform approach is key here. Because all infrastructure is codified, I can easily audit what's running and kill anything unnecessary. No more "mystery instances" that nobody remembers creating.

At Invictus, the infrastructure I automated with Terraform was inherently more cost-efficient because it was repeatable — we stopped leaving dev environments running over weekends because spinning them up Monday morning took minutes, not hours.`,
    techTags: [
      "Karpenter",
      "Spot Instances",
      "Reserved Instances",
      "S3 Lifecycle",
      "Terraform",
      "Right-sizing",
      "Cost Tagging",
    ],
    metrics: [
      "73% smaller images",
      "80% Spot for non-prod",
      "Automated teardown for dev envs",
    ],
  },

  // ─── 12. Disaster Recovery ───
  {
    id: "disaster-recovery",
    category: "Incidents & Reliability",
    question:
      "How do you design for disaster recovery and business continuity?",
    answer: `I think about DR in layers: infrastructure, data, and application state.

Infrastructure Recovery: Because everything is in Terraform, I can rebuild an entire environment from scratch. If an entire region goes down, I run "terraform apply" with a different region in the tfvars and the cluster comes up. The key is that nothing about the infrastructure exists only in the console — if it's not in code, it doesn't exist.

Data Backups: For Kubernetes workloads, I use Velero for cluster-level backups — it snapshots namespaces, persistent volumes, and custom resources. Backups run on a schedule (daily for prod, weekly for staging) and are stored in a cross-region S3 bucket. For databases, I configure automated EBS snapshots with lifecycle policies — daily snapshots retained for 30 days, weekly snapshots retained for 90 days.

Application State: Since I follow GitOps with ArgoCD, the desired application state is always in Git. If I lose the entire cluster, I provision a new EKS cluster with Terraform, install ArgoCD, point ArgoCD at the GitOps repo, and ArgoCD automatically reconciles everything — all deployments, services, configmaps come back exactly as they were.

Testing: I'm a big believer in actually testing recovery procedures. I've deliberately deleted namespaces and restored from Velero backups to verify my RTO. For my setup, full namespace recovery takes under 15 minutes and data loss (RPO) is under 5 minutes because of the snapshot frequency.

The most important thing about DR isn't the tools — it's the documentation. I keep a runbook that any team member can follow to restore services, even if I'm not available. If only one person can recover from a disaster, you have a single point of failure in your process, which is just as bad as a single point of failure in your architecture.`,
    techTags: [
      "Velero",
      "Terraform",
      "ArgoCD",
      "EBS Snapshots",
      "Cross-region S3",
      "GitOps Recovery",
    ],
    metrics: [
      "RTO under 15 minutes",
      "RPO under 5 minutes",
      "Full rebuild from Terraform",
    ],
  },

  // ─── 13. Why should we hire you? ───
  {
    id: "why-hire",
    category: "Career & Culture",
    question:
      "Why should we hire you over someone with more years of experience?",
    answer: `Fair question. Here's my honest take.

I don't have 10 years of experience, but I've packed a lot into the time I have. I built real infrastructure — not toy projects — that uses the same tools and patterns production teams use daily: EKS, Terraform, ArgoCD, GitHub Actions, Prometheus, Grafana, Helm.

My MLOps Sentiment Analyzer reduced deployment time from 45 minutes to 8 minutes. My MoviesMonkey project has a dual-pipeline CI/CD system with security scanning, image signing, and automated GitOps sync. These aren't tutorials I followed — I designed and debugged every piece myself.

What I bring that someone with 10 years might not: I have zero legacy habits. I've never done deployments by SSHing into servers and running scripts (well, except when I replaced that process at Invictus with proper pipelines). I think in Infrastructure as Code, GitOps, and containerization by default because that's how I learned.

I'm also hungry in a way that experienced engineers sometimes aren't. I'm currently preparing for three certifications simultaneously — AWS Solutions Architect, CKA, and Terraform Associate — because I want the depth, not just the breadth.

And practically speaking, I bring strong fundamentals from my CS degree at MGM JNEC — data structures, networking, OS internals — which means I can debug at the system level, not just the YAML level.

I'm not pretending to know everything. I haven't managed a 500-person infrastructure team. But for a team that needs someone who can design, build, secure, and monitor cloud infrastructure from day one — I can do that, and I've proven it.`,
    techTags: [
      "AWS Solutions Architect",
      "CKA",
      "Terraform Associate",
      "B.Tech CS",
    ],
    metrics: [
      "45min to 8min deployments",
      "3 certs in progress",
      "60% faster releases at Invictus",
    ],
  },

  // ─── 14. Disagreement with a senior ───
  {
    id: "disagreement",
    category: "Career & Culture",
    question:
      "Tell me about a time you disagreed with a team member or senior engineer about a technical decision.",
    answer: `At Anlage Infotech, we were deploying a Flask-based API service that the team wanted to ship using a simple docker-compose setup on a single EC2 instance. The senior developer's reasoning was that it was fast and the client had a tight deadline.

I pushed back — not aggressively, but I shared my concern. If that single instance went down, the entire service was offline. There was no health check, no auto-restart, no load balancing. I proposed that we at least use Docker Compose with restart policies, a reverse proxy (Nginx), and a simple CI pipeline through GitHub Actions so we weren't deploying by SSH.

The senior dev was initially resistant because it seemed like more work. So instead of arguing, I spent an evening building a proof of concept. I set up the Docker Compose with health checks and restart-unless-stopped, added an Nginx reverse proxy with basic load balancing, and created a GitHub Actions workflow that ran tests and deployed on merge to main.

The next morning, I demoed it. The total setup time going forward was zero — just push code and it deploys. The senior dev actually liked it and we shipped that approach to the client. That was a good lesson: don't argue about what's better, just show it.

I think disagreements are healthy as long as they're about the work, not egos. In this case, the deadline was real, but so was the reliability risk. Finding the middle ground — a solution that was both fast to implement and more robust — was the right call.`,
    techTags: [
      "Docker Compose",
      "Nginx",
      "GitHub Actions",
      "Health Checks",
      "CI/CD",
    ],
    metrics: [
      "Zero-effort deployments after setup",
      "Auto-restart on failure",
    ],
  },

  // ─── 15. Areas to grow ───
  {
    id: "weakness",
    category: "Career & Culture",
    question:
      "What's an area where you feel you need to grow or improve?",
    answer: `A few things, honestly.

First, I don't have deep production experience with multi-cloud setups. I've worked primarily with AWS and touched GCP, but I haven't done a real cross-cloud deployment with unified networking and identity federation. I'm aware of the tools — like Terraform's multi-provider support and solutions like Consul for service mesh across clouds — but I haven't battle-tested them yet.

Second, I want more depth in observability beyond metrics. I'm strong with Prometheus and Grafana, but distributed tracing with tools like Jaeger or OpenTelemetry is something I've only set up in lab environments. For a complex microservices architecture, I know I'd need that skill, so I'm actively learning it.

Third, on the soft skills side, I sometimes go deep into implementation details when I should step back and think about the business problem first. During my internship, there were times I spent hours optimizing a pipeline for a service that only got 10 requests per day. I've gotten better at asking "does this matter right now?" before diving in.

I'm also working on getting more comfortable with ambiguity. In internships, the problems were well-defined. In senior roles, I know I'll need to define the problems myself — figure out what to build, not just how to build it. That's a muscle I'm building through personal projects where nobody tells me the requirements.

I'd rather be honest about my gaps than pretend they don't exist. The important thing is that I know what they are and I'm actively working on each one.`,
    techTags: [
      "Multi-Cloud",
      "OpenTelemetry",
      "Jaeger",
      "Distributed Tracing",
    ],
    metrics: [
      "Actively preparing 3 certs",
      "Learning OpenTelemetry",
      "Practicing system design",
    ],
  },
];
