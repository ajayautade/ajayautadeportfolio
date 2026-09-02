import type { Metadata } from "next";
import DeepDivesClient from "./DeepDivesClient";

export const metadata: Metadata = {
  title: "Interactive CI/CD & Technical Deep Dives",
  description:
    "Explore Ajay Autade's interactive AWS EKS GitOps deployment simulator and 15 in-depth, production-tested answers to senior DevOps, DevSecOps, and Cloud screening questions.",
  alternates: {
    canonical: "https://ajayautade.com/deep-dives",
  },
  openGraph: {
    title: "Interactive CI/CD & Technical Deep Dives — Ajay Autade",
    description:
      "Simulate a live GitOps CI/CD deployment to AWS EKS and explore 15 comprehensive architectural case studies and screening solutions.",
    url: "https://ajayautade.com/deep-dives",
    siteName: "Ajay Autade — DevOps Engineer Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive CI/CD & Technical Deep Dives — Ajay Autade",
    description:
      "Interactive CI/CD pipeline simulator and 15 technical screening deep-dives by Ajay Autade.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DeepDivesPage() {
  return <DeepDivesClient />;
}
