import {
  Cloud,
  Server,
  Rocket,
  Shield,
  Activity,
  GitBranch,
  Container,
  Workflow,
  Headphones,
  Wrench,
  Lock,
  Globe,
  Code,
  Zap,
  Cpu,
  Bot,
  Database,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Terminal,
  FileCode,
  Check,
} from "lucide-react";

// ============================================
// SERVICE TYPES
// ============================================

export interface ServiceFeature {
  text: string;
  included: boolean;
}

export type ServiceCategory = "all" | "cloud-devops" | "automation" | "web-app";

export interface ServicePackage {
  id: string;
  name: string;
  category: "cloud-devops" | "automation" | "web-app" | "bundle";
  badge?: string;
  tagline: string;
  description: string;
  engagementModel: string;
  scopeLevel: string;
  icon: typeof Cloud;
  popular: boolean;
  deliveryDays: string;
  features: ServiceFeature[];
  deliverables: string[];
  techStack: string[];
  color: string;
  image?: string;
}

export interface SpecializedService {
  id: string;
  name: string;
  category: "automation" | "web-app" | "cloud-devops";
  tagline: string;
  description: string;
  engagementModel: string;
  deliveryDays: string;
  icon: typeof Bot;
  highlights: string[];
  image?: string;
}

export interface ServiceAddOn {
  id: string;
  name: string;
  category: "cloud-devops" | "automation" | "web-app" | "support";
  description: string;
  engagementModel: string;
  icon: typeof Cloud;
  deliveryDays: string;
}

export interface ClientBenefit {
  icon: typeof Clock;
  title: string;
  description: string;
  tag: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WorkStep {
  step: string;
  title: string;
  description: string;
  timeline: string;
  icon: typeof Terminal;
}

export interface ScopeOption {
  id: string;
  category: "devops" | "automation" | "web" | "security";
  title: string;
  description: string;
  days: number;
}

// ============================================
// CORE SERVICE ENGAGEMENTS (ENTERPRISE TIERS)
// ============================================

export const servicePackages: ServicePackage[] = [
  {
    id: "foundation",
    name: "Cloud Infrastructure & Deployment Foundation",
    category: "cloud-devops",
    badge: "Rapid Production Launch",
    tagline: "Turnkey cloud environment, containerized deployment & automated CI/CD",
    description:
      "A rock-solid production foundation for early-stage tech companies, venture-backed startups, and growing teams. We architect secure AWS cloud infrastructure, containerize your applications, and implement automated CI/CD pipelines so your engineering team ships safely from day one.",
    engagementModel: "Fixed-Milestone Sprint",
    scopeLevel: "Core Workload Foundation",
    icon: Rocket,
    popular: false,
    deliveryDays: "3–5 Business Days",
    color: "from-blue-500 to-cyan-500",
    image: "/images/services/cloud-architecture.jpg",
    techStack: ["Docker", "GitHub Actions", "AWS EC2/ECS", "Nginx", "TLS/SSL", "IAM"],
    deliverables: [
      "Production-ready Docker multi-stage containerization",
      "Automated GitHub Actions CI/CD pipeline with build verification",
      "AWS cloud environment provisioning (EC2, ECS, or VPC networking)",
      "Automated SSL/TLS certificate configuration with zero-downtime renewal",
      "Reverse proxy hardening with security headers & rate limiting",
      "Automated operational alerts (Slack, Discord, or Email notifications)",
      "Comprehensive infrastructure documentation & architecture diagrams",
      "Recorded video technical handover for engineering team onboarding",
      "Post-launch warranty & standby operational support",
    ],
    features: [
      { text: "Production containerization for core application stack", included: true },
      { text: "Automated test & deploy CI/CD pipeline", included: true },
      { text: "AWS infrastructure setup with secure VPC networking", included: true },
      { text: "Automated SSL/TLS & custom domain mapping", included: true },
      { text: "Operational alert routing (Slack / Email / Webhook)", included: true },
      { text: "Reverse proxy configuration & security headers", included: true },
      { text: "Recorded Loom video walkthrough & technical READMEs", included: true },
      { text: "Multi-cluster AWS EKS Kubernetes orchestration", included: false },
      { text: "Enterprise Terraform IaC modular repository", included: false },
      { text: "Full Prometheus + Grafana observability cluster", included: false },
      { text: "Ongoing dedicated Fractional SRE retainer", included: false },
    ],
  },
  {
    id: "growth-suite",
    name: "Production DevOps, Web Platform & Workflow Suite",
    category: "bundle",
    badge: "Most Selected Solution",
    tagline: "Complete production Kubernetes, GitOps automation, modern web platform & business workflows",
    description:
      "The comprehensive technical partnership for scaling technology companies worldwide. We architect high-availability AWS EKS Kubernetes clusters via modular Terraform IaC, implement GitOps continuous delivery, deploy modern Next.js web applications, and engineer end-to-end automated business workflows.",
    engagementModel: "Comprehensive Architecture Sprint",
    scopeLevel: "Full Platform Infrastructure",
    icon: Workflow,
    popular: true,
    deliveryDays: "7–10 Business Days",
    color: "from-purple-500 to-indigo-500",
    image: "/images/services/workflow-automation.jpg",
    techStack: [
      "AWS EKS",
      "Terraform",
      "GitHub Actions",
      "ArgoCD",
      "Next.js",
      "Prometheus",
      "Grafana",
      "Python",
      "n8n",
    ],
    deliverables: [
      "Modular, reproducible Terraform Infrastructure as Code repository",
      "Enterprise GitOps CI/CD delivery pipeline (GitHub Actions + ArgoCD)",
      "High-availability AWS EKS Kubernetes cluster with Horizontal Pod Autoscaling (HPA)",
      "Grafana + Prometheus observability stack with custom PromQL dashboards",
      "High-performance Next.js web application or dashboard platform deployment",
      "Multi-system workflow automation engine (CRMs, payment webhooks, database sync)",
      "Isolated environment segregation (Development, Staging, Production)",
      "Enterprise security hardening, IAM least-privilege policies & secrets management",
      "Complete architecture blueprint, runbooks & team training sessions",
      "Dedicated priority warranty & operational SLA support",
    ],
    features: [
      { text: "Containerization & microservices orchestration", included: true },
      { text: "Full GitOps continuous delivery (GitHub Actions + ArgoCD)", included: true },
      { text: "Production AWS EKS Kubernetes cluster with auto-scaling", included: true },
      { text: "Modular Infrastructure as Code with Terraform", included: true },
      { text: "Full Prometheus + Grafana observability & metrics", included: true },
      { text: "Modern high-performance web platform / web app (Next.js)", included: true },
      { text: "Multi-tool workflow automation (Stripe, Slack, CRMs, APIs)", included: true },
      { text: "Strict multi-environment segregation (Dev / Staging / Prod)", included: true },
      { text: "Self-healing workloads & zero-downtime rolling deployments", included: true },
      { text: "Full architecture blueprint & code ownership transfer", included: true },
      { text: "Priority warranty & post-delivery support period", included: true },
      { text: "24/7 dedicated enterprise on-call incident retainer", included: false },
    ],
  },
  {
    id: "enterprise-architecture",
    name: "Enterprise Cloud, Custom SaaS & Automation Engine",
    category: "bundle",
    badge: "Enterprise Scale",
    tagline: "End-to-end cloud modernization, custom full-stack application build & company-wide automations",
    description:
      "A complete technical overhaul and custom engineering delivery for established businesses, high-growth SaaS firms, and digital agencies. Includes multi-cloud / hybrid Kubernetes architectures, bespoke full-stack SaaS application development, company-wide event-driven automation pipelines, and comprehensive FinOps cost optimization.",
    engagementModel: "Enterprise Strategic Engagement",
    scopeLevel: "Enterprise-Wide Modernization",
    icon: Shield,
    popular: false,
    deliveryDays: "12–16 Business Days",
    color: "from-amber-500 to-orange-500",
    image: "/images/services/web-platform.jpg",
    techStack: [
      "AWS EKS / GCP",
      "Terraform",
      "ArgoCD",
      "Next.js 15",
      "FastAPI / Node",
      "Prometheus",
      "Grafana",
      "Trivy",
      "Vault",
      "Redis",
      "PostgreSQL",
    ],
    deliverables: [
      "Multi-tier, highly resilient AWS / GCP cloud infrastructure via Terraform",
      "Custom full-stack web application or enterprise SaaS platform build",
      "Enterprise GitOps zero-downtime deployment pipelines across clusters",
      "Company-wide workflow automation engine integrating internal tools, APIs & AI services",
      "Full observability suite with custom business metrics, alerting & synthetic monitoring",
      "Security audit with IAM least-privilege, container vulnerability scans & secrets vaulting",
      "FinOps cloud cost optimization audit (delivering documented 20% to 40% monthly savings)",
      "High-availability multi-region database replication & Redis distributed caching",
      "Executive architecture documentation, disaster recovery runbooks & team onboarding",
      "Extended enterprise warranty support with guaranteed response times",
    ],
    features: [
      { text: "Unlimited microservices & background worker orchestration", included: true },
      { text: "Enterprise multi-stage GitOps delivery pipelines", included: true },
      { text: "Multi-AZ AWS EKS cluster with HPA & Cluster Autoscaler", included: true },
      { text: "Custom full-stack web application or enterprise SaaS platform", included: true },
      { text: "Complex company-wide workflow automation engine (n8n, Python, APIs)", included: true },
      { text: "Modular Terraform & Ansible configuration management", included: true },
      { text: "Full observability stack with custom PromQL alert rules", included: true },
      { text: "Cloud security audit, Trivy container scans & IAM lockdown", included: true },
      { text: "Cloud cost optimization audit (FinOps cloud reduction)", included: true },
      { text: "Disaster recovery, automated backup & failover protocols", included: true },
      { text: "Executive architecture blueprints & senior engineer consulting", included: true },
      { text: "Extended priority warranty & dedicated SLA support", included: true },
    ],
  },
];

// ============================================
// SPECIALIZED PRACTICE SOLUTIONS
// ============================================

export const specializedServices: SpecializedService[] = [
  {
    id: "workflow-automation",
    name: "Enterprise Workflow & Process Automation",
    category: "automation",
    tagline: "Automate manual operations, webhook pipelines, CRM sync & API integrations",
    description:
      "Eliminate repetitive operational overhead and human error. We architect robust event-driven automations connecting your software ecosystem—Slack, Stripe, HubSpot/Salesforce, databases, and internal APIs—utilizing resilient n8n/Python microservices.",
    engagementModel: "Targeted Solution Sprint",
    deliveryDays: "3–5 Business Days",
    icon: Bot,
    image: "/images/services/workflow-automation.jpg",
    highlights: [
      "Custom webhook listeners, rate-limited queues & API orchestrations",
      "Slack / Discord operational incident & customer alert bots",
      "Bi-directional CRM & database synchronization pipelines",
      "Automated Stripe payment reconciliation & billing workflows",
      "Scheduled data scrapers, ETL pipelines & executive reporting",
    ],
  },
  {
    id: "website-building",
    name: "High-Performance Web Platforms & Landing Sites",
    category: "web-app",
    tagline: "Ultra-fast Next.js web applications with modern animations and 95+ Lighthouse",
    description:
      "An impeccably engineered, visually stunning web platform designed to establish enterprise authority and maximize conversion. Architected with Next.js, TypeScript, and modern CSS, delivering sub-second edge response times and top-tier SEO.",
    engagementModel: "Targeted Solution Sprint",
    deliveryDays: "5–8 Business Days",
    icon: Globe,
    image: "/images/services/web-platform.jpg",
    highlights: [
      "Next.js App Router / React with responsive, multi-device layouts",
      "Sub-second load times & 95+ Google Lighthouse Core Web Vitals",
      "Sophisticated micro-animations & dark/light theme systems",
      "Enterprise SEO: OpenGraph, JSON-LD schemas & semantic tags",
      "Global CDN edge caching, security headers & lead capture integrations",
    ],
  },
  {
    id: "app-building",
    name: "Full-Stack Web Application & SaaS Engineering",
    category: "web-app",
    tagline: "Architect and build production-ready, scalable cloud applications",
    description:
      "From database architecture to responsive frontend dashboards and secure REST/GraphQL APIs. We build resilient, high-performance web applications and SaaS platforms with role-based authentication, billing, and cloud infrastructure.",
    engagementModel: "Custom Engineering Engagement",
    deliveryDays: "8–14 Business Days",
    icon: Code,
    image: "/images/services/web-platform.jpg",
    highlights: [
      "Full-stack architecture (Next.js frontend + Node/Python microservices)",
      "Relational & NoSQL database schemas (PostgreSQL, Supabase, Redis)",
      "Enterprise authentication (OAuth, JWT, NextAuth, Clerk)",
      "Stripe recurring subscription billing & checkout integration",
      "Dockerized container setup with automated cloud deployment",
    ],
  },
  {
    id: "cicd-devops-sprint",
    name: "Zero-Downtime CI/CD & GitOps Automation",
    category: "cloud-devops",
    tagline: "Push to main → automatically tested, built, and deployed in minutes",
    description:
      "Transform your engineering team's shipping velocity. Replace fragile manual deployments with enterprise automated pipelines using GitHub Actions, ArgoCD, or Jenkins, complete with automated unit tests, security scans, and instant Slack notifications.",
    engagementModel: "Targeted Solution Sprint",
    deliveryDays: "3–5 Business Days",
    icon: GitBranch,
    image: "/images/services/cloud-architecture.jpg",
    highlights: [
      "GitHub Actions or Jenkins multi-branch deployment pipelines",
      "GitOps with ArgoCD for continuous Kubernetes state reconciliation",
      "Multi-stage Docker builds with 60%+ image size reduction",
      "Automated linting, test suites & Trivy container vulnerability scanning",
      "Real-time deployment notifications with commit diffs & rollback triggers",
    ],
  },
];

// ============================================
// SPECIALIZED ADD-ONS & RETAINERS
// ============================================

export const serviceAddOns: ServiceAddOn[] = [
  {
    id: "addon-workflow",
    name: "Bespoke Event-Driven Workflow Automation",
    category: "automation",
    description: "Orchestrate complex multi-service workflows (Stripe, Slack, CRM, DB) with custom error handling",
    engagementModel: "Targeted Enhancement",
    icon: Zap,
    deliveryDays: "2–3 Days",
  },
  {
    id: "addon-monitoring",
    name: "Enterprise Observability & Prometheus Stack",
    category: "cloud-devops",
    description: "Production Grafana + Prometheus metrics dashboards with custom PromQL alerts & PagerDuty/Slack routing",
    engagementModel: "Targeted Enhancement",
    icon: Activity,
    deliveryDays: "3–4 Days",
  },
  {
    id: "addon-security",
    name: "Cloud Security, IAM & Compliance Hardening",
    category: "cloud-devops",
    description: "Least-privilege IAM audit, secrets rotation, Trivy image vulnerability scanning & SOC2 alignment",
    engagementModel: "Targeted Enhancement",
    icon: Lock,
    deliveryDays: "3–4 Days",
  },
  {
    id: "addon-cost-optimization",
    name: "FinOps Cloud Cost Optimization Audit",
    category: "cloud-devops",
    description: "In-depth cloud architecture audit delivering documented 20% to 40% reduction in monthly AWS/GCP bills",
    engagementModel: "Targeted Enhancement",
    icon: Server,
    deliveryDays: "3–4 Days",
  },
  {
    id: "addon-migration",
    name: "Zero-Downtime Cloud Migration",
    category: "cloud-devops",
    description: "Seamless workload, database & DNS migration from legacy VPS/bare-metal to modern AWS cloud",
    engagementModel: "Targeted Enhancement",
    icon: Cloud,
    deliveryDays: "4–6 Days",
  },
  {
    id: "addon-support",
    name: "Dedicated Fractional SRE & DevOps Retainer",
    category: "support",
    description: "Ongoing infrastructure management, monthly security updates, continuous monitoring & incident response SLA",
    engagementModel: "Monthly Ongoing Retainer",
    icon: Headphones,
    deliveryDays: "Monthly Ongoing",
  },
];

// ============================================
// ENTERPRISE VALUE PILLARS & TRUST SIGNALS
// ============================================

export const clientBenefits: ClientBenefit[] = [
  {
    icon: Clock,
    title: "Global Timezone Coverage & Rapid Async Comms",
    description:
      "Direct business-hour overlap across the US (EST/PST), Europe & UK (GMT/CET), and Asia-Pacific (APAC/IST) for real-time standups, technical syncs, and dedicated Slack channels.",
    tag: "Global Timezone Overlap",
  },
  {
    icon: Shield,
    title: "100% Client-Owned IP & Infrastructure",
    description:
      "All Terraform blueprints, pipelines, configurations, and codebases are built directly inside your company's AWS, GCP, and GitHub accounts. Zero lock-in.",
    tag: "Complete IP Ownership",
  },
  {
    icon: Zap,
    title: "Agile, Milestone-Driven Delivery",
    description:
      "Predictable technical execution delivered in structured milestone sprints (3 to 14 business days). No agency bloat, no bureaucracy, no endless delays.",
    tag: "High Velocity Sprints",
  },
  {
    icon: FileCode,
    title: "Executive Architecture & Handover Runbooks",
    description:
      "Every delivery is accompanied by complete architecture documentation, disaster recovery runbooks, and recorded video walkthroughs for your engineering team.",
    tag: "Turnkey Knowledge Transfer",
  },
  {
    icon: Lock,
    title: "Strict NDA & Security Confidentiality",
    description:
      "We routinely execute mutual non-disclosure agreements (NDAs) prior to examining proprietary architectures, code repositories, or operational data.",
    tag: "Enterprise Confidentiality",
  },
  {
    icon: CheckCircle2,
    title: "Production-Tested 99.9% Uptime Standards",
    description:
      "Battle-tested engineering practices with automated health checks, self-healing container configurations, and zero-downtime rolling deployments.",
    tag: "High Availability SLA",
  },
];

// ============================================
// 4-STAGE DELIVERY METHODOLOGY
// ============================================

export const workProcessSteps: WorkStep[] = [
  {
    step: "01",
    title: "Technical Discovery & Architecture Intake",
    description:
      "We conduct a deep-dive review of your system requirements, existing architecture, and business goals via an engineering intake session or async brief.",
    timeline: "Stage 1",
    icon: Terminal,
  },
  {
    step: "02",
    title: "Technical Specification & Scope Agreement",
    description:
      "You receive a comprehensive Statement of Work (SOW) outlining exact deliverables, architecture blueprints, milestone timelines, and SLAs.",
    timeline: "Stage 2",
    icon: Layers,
  },
  {
    step: "03",
    title: "Sprint Execution & Continuous Integration",
    description:
      "We engineer your cloud infrastructure, automated pipelines, or web applications with continuous async progress updates via Slack and staging environments.",
    timeline: "Stage 3",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Production Cutover, Video Handover & SLA Support",
    description:
      "Final production deployment, end-to-end verification, recorded video technical walkthroughs, team documentation, and included warranty support.",
    timeline: "Stage 4",
    icon: Sparkles,
  },
];

// ============================================
// FREQUENTLY ASKED QUESTIONS
// ============================================

export const serviceFaqs: FAQItem[] = [
  {
    question: "How do you coordinate with our internal engineering team across global timezones?",
    answer:
      "We maintain flexible overlapping business hours across North America (EST/CST/PST), Europe & UK (GMT/BST/CET), and Asia-Pacific (APAC/IST). We integrate directly into your workflow via Slack, Discord, or Teams for rapid async communication, and schedule video reviews via Google Meet or Zoom for architecture alignment and milestone demonstrations.",
  },
  {
    question: "Do we retain full ownership of the infrastructure, code, and cloud credentials?",
    answer:
      "Yes, 100%. All Terraform code, Kubernetes manifests, CI/CD pipelines, and application source code are authored directly in your company's GitHub/GitLab repositories and deployed into your own AWS or GCP organization. We do not retain any proprietary dependencies or vendor lock-in.",
  },
  {
    question: "How are enterprise proposals and engagements structured without fixed cookie-cutter pricing?",
    answer:
      "Every company's infrastructure, compliance requirements, and scale are unique. Rather than offering one-size-fits-all packages, we provide tailored Statements of Work (SOW) with clear milestone deliverables, defined turnaround timelines, and transparent quotes based on your exact technical scope.",
  },
  {
    question: "Can we sign a Non-Disclosure Agreement (NDA) before sharing our codebase and cloud access?",
    answer:
      "Absolutely. We routinely sign standard mutual NDAs or your organization's legal agreements before reviewing any proprietary architecture, code repositories, or infrastructure credentials.",
  },
  {
    question: "What post-launch warranty and ongoing operational support do you provide?",
    answer:
      "Every project delivery includes a dedicated warranty support window (14 to 30 days) to ensure seamless production operation. For continuous monitoring, ongoing cluster maintenance, and incident response, we also offer dedicated Fractional SRE and DevOps retainers.",
  },
  {
    question: "Can an engagement combine Cloud DevOps, Workflow Automation, and Web Platform engineering?",
    answer:
      "Yes. Most of our clients engage us for cross-functional initiatives—such as deploying a Next.js web application, orchestrating an automated AWS EKS Kubernetes cluster via Terraform, and engineering automated webhook workflows for CRM and payments. You can configure your multi-pillar scope using our Scope Builder.",
  },
];

// ============================================
// SCOPE ESTIMATOR MODULES
// ============================================

export const ESTIMATOR_OPTIONS: ScopeOption[] = [
  {
    id: "scope-containerization",
    category: "devops",
    title: "Multi-Stage Docker Containerization",
    description: "Production Dockerfiles, docker-compose & container optimization for all services",
    days: 2,
  },
  {
    id: "scope-cicd",
    category: "devops",
    title: "Automated CI/CD & GitOps Pipeline",
    description: "GitHub Actions, ArgoCD or Jenkins with automated test, build & deployment stages",
    days: 3,
  },
  {
    id: "scope-aws-cloud",
    category: "devops",
    title: "AWS Cloud Infrastructure & Networking",
    description: "Secure VPC, multi-AZ networking, ALB load balancers & EC2/ECS/EKS setup",
    days: 4,
  },
  {
    id: "scope-terraform",
    category: "devops",
    title: "Terraform Infrastructure as Code (IaC)",
    description: "Modular, version-controlled IaC blueprints for repeatable cloud deployments",
    days: 3,
  },
  {
    id: "scope-monitoring",
    category: "devops",
    title: "Observability, Grafana & Prometheus",
    description: "Full metrics stack with custom dashboards, PromQL alerting & Slack incident routing",
    days: 3,
  },
  {
    id: "scope-security",
    category: "security",
    title: "Security Hardening & IAM Governance",
    description: "Least-privilege IAM policies, secrets manager integration & Trivy vulnerability scans",
    days: 2,
  },
  {
    id: "scope-automation",
    category: "automation",
    title: "Event-Driven Business Workflow Automation",
    description: "Automate cross-platform tasks across Slack, Stripe, CRMs, webhooks & APIs using n8n/Python",
    days: 3,
  },
  {
    id: "scope-website",
    category: "web",
    title: "High-Performance Next.js Web Platform",
    description: "Modern, responsive Next.js web application with 95+ Lighthouse scores & custom animations",
    days: 5,
  },
  {
    id: "scope-fullstack-app",
    category: "web",
    title: "Full-Stack Application & SaaS MVP Build",
    description: "Custom database schema, user authentication, REST APIs & frontend dashboard platform",
    days: 8,
  },
  {
    id: "scope-cost-optimization",
    category: "security",
    title: "FinOps Cloud Cost Optimization Audit",
    description: "Comprehensive AWS/GCP architecture audit delivering 20% to 40% documented cost reduction",
    days: 3,
  },
];

// ============================================
// CART / SCOPE ITEM TYPE
// ============================================

export interface CartItem {
  id: string;
  name: string;
  category: string;
  type: "package" | "specialized" | "addon" | "custom";
  deliveryEstimate?: string;
}
