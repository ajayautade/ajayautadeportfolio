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
} from "lucide-react";

// ============================================
// SERVICE PACKAGES
// ============================================

export interface ServiceFeature {
  text: string;
  included: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in INR
  currency: string;
  icon: typeof Cloud;
  popular: boolean;
  deliveryDays: number;
  features: ServiceFeature[];
  color: string; // gradient accent
}

export interface ServiceAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  icon: typeof Cloud;
}

export const servicePackages: ServicePackage[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for small projects & MVPs",
    description:
      "Get your application containerized and deployed to the cloud with a basic CI/CD pipeline. Ideal for startups and small teams taking their first step into DevOps.",
    price: 4999,
    currency: "INR",
    icon: Rocket,
    popular: false,
    deliveryDays: 5,
    color: "from-blue-500 to-cyan-500",
    features: [
      { text: "Dockerize 1 application", included: true },
      { text: "Basic CI/CD pipeline (GitHub Actions)", included: true },
      { text: "Deploy to AWS EC2 or ECS", included: true },
      { text: "SSL certificate setup", included: true },
      { text: "Basic Nginx reverse proxy", included: true },
      { text: "1 round of revisions", included: true },
      { text: "Kubernetes orchestration", included: false },
      { text: "Infrastructure as Code (Terraform)", included: false },
      { text: "Monitoring & alerting", included: false },
      { text: "Ongoing support", included: false },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Full DevOps pipeline for growing teams",
    description:
      "A complete CI/CD pipeline with infrastructure as code, container orchestration, and automated deployments. Built for teams that need reliability and scalability.",
    price: 14999,
    currency: "INR",
    icon: Workflow,
    popular: true,
    deliveryDays: 10,
    color: "from-purple-500 to-indigo-500",
    features: [
      { text: "Dockerize up to 3 services", included: true },
      { text: "Full CI/CD pipeline (GitHub Actions + ArgoCD)", included: true },
      { text: "Deploy to AWS EKS (Kubernetes)", included: true },
      { text: "Infrastructure as Code with Terraform", included: true },
      { text: "SSL + Domain + Load Balancer setup", included: true },
      { text: "Grafana + Prometheus monitoring", included: true },
      { text: "Environment separation (dev/staging/prod)", included: true },
      { text: "3 rounds of revisions", included: true },
      { text: "Security hardening & IAM setup", included: false },
      { text: "24/7 ongoing support", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "End-to-end infrastructure for enterprises",
    description:
      "Enterprise-grade infrastructure with full security, multi-environment orchestration, observability, and ongoing support. Your complete DevOps solution.",
    price: 29999,
    currency: "INR",
    icon: Shield,
    popular: false,
    deliveryDays: 15,
    color: "from-amber-500 to-orange-500",
    features: [
      { text: "Dockerize unlimited services", included: true },
      { text: "Advanced CI/CD (Jenkins + ArgoCD + GitOps)", included: true },
      { text: "Full AWS EKS cluster setup", included: true },
      { text: "Terraform + Ansible automation", included: true },
      { text: "SSL + Domain + ALB + CloudFront CDN", included: true },
      { text: "Full observability stack (Grafana + Prometheus + CloudWatch)", included: true },
      { text: "Multi-env (dev/staging/prod) with GitOps", included: true },
      { text: "Security audit + IAM + secrets management", included: true },
      { text: "Auto-scaling & cost optimization", included: true },
      { text: "30 days of post-delivery support", included: true },
    ],
  },
];

export const serviceAddOns: ServiceAddOn[] = [
  {
    id: "addon-monitoring",
    name: "Monitoring Setup",
    description: "Grafana + Prometheus dashboards with custom alerts",
    price: 3999,
    currency: "INR",
    icon: Activity,
  },
  {
    id: "addon-security",
    name: "Security Audit",
    description: "IAM review, secrets management, vulnerability scanning",
    price: 4999,
    currency: "INR",
    icon: Lock,
  },
  {
    id: "addon-migration",
    name: "Cloud Migration",
    description: "Migrate your existing app from VPS/bare metal to AWS",
    price: 4999,
    currency: "INR",
    icon: Cloud,
  },
  {
    id: "addon-support",
    name: "Monthly Support",
    description: "Ongoing maintenance, updates, and incident response",
    price: 2999,
    currency: "INR",
    icon: Headphones,
  },
];

// ============================================
// CART TYPES
// ============================================

export interface CartItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  type: "package" | "addon";
}

// ============================================
// HELPERS
// ============================================

export function formatPrice(price: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
