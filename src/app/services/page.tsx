import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "DevOps Services & Freelance Packages — Ajay Autade",
  description:
    "Hire Ajay Autade for freelance DevOps services — CI/CD pipelines, cloud infrastructure, Kubernetes, Docker, Terraform, and monitoring setup.",
  openGraph: {
    title: "DevOps Services & Freelance Packages — Ajay Autade",
    description:
      "Hire Ajay Autade for freelance DevOps services — CI/CD pipelines, cloud infrastructure, Kubernetes, Docker, Terraform, and monitoring setup.",
    url: "https://ajayautade.dev/services",
    siteName: "Ajay Autade Portfolio",
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
