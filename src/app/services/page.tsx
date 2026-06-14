import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "DevOps Services & Freelance Packages",
  description:
    "Hire Ajay Autade for freelance DevOps services — CI/CD pipeline setup, AWS cloud infrastructure, Kubernetes deployment, Docker containerization, Terraform IaC, monitoring with Grafana & Prometheus. Affordable DevOps packages.",
  alternates: {
    canonical: "https://ajayautade.com/services",
  },
  openGraph: {
    title: "DevOps Services & Freelance Packages — Ajay Autade",
    description:
      "Hire Ajay Autade for freelance DevOps services — CI/CD pipelines, cloud infrastructure, Kubernetes, Docker, Terraform, and monitoring setup.",
    url: "https://ajayautade.com/services",
    siteName: "Ajay Autade — DevOps Engineer Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevOps Services & Freelance Packages — Ajay Autade",
    description:
      "Hire Ajay Autade for freelance DevOps services — CI/CD pipelines, cloud infrastructure, Kubernetes, Docker, Terraform, and monitoring setup.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
