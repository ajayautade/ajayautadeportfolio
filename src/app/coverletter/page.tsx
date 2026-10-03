import type { Metadata } from "next";
import CoverLetterClient from "./CoverLetterClient";

export const metadata: Metadata = {
  title: "Cover Letter — DevOps & Cloud Engineer",
  description:
    "Professional cover letter of Ajay Autade — DevOps & Cloud Engineer specializing in AWS, Kubernetes, Docker, Terraform, CI/CD, MLOps, and AI-driven infrastructure automation. Open to opportunities worldwide.",
  alternates: {
    canonical: "https://ajayautade.com/coverletter",
  },
  openGraph: {
    title: "Cover Letter — Ajay Autade | DevOps & Cloud Engineer",
    description:
      "Professional cover letter of Ajay Autade — DevOps, Cloud & AI Engineer with expertise in AWS, Kubernetes, Terraform, CI/CD pipelines, MLOps, and AI infrastructure.",
    url: "https://ajayautade.com/coverletter",
    siteName: "Ajay Autade — DevOps Engineer Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cover Letter — Ajay Autade | DevOps & Cloud Engineer",
    description:
      "Cover letter of Ajay Autade — DevOps, Cloud & AI Engineer specializing in AWS, Kubernetes, Docker, Terraform, and MLOps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CoverLetterPage() {
  return <CoverLetterClient />;
}
