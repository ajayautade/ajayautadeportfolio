import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume — Ajay Autade | DevOps & Cloud Engineer",
  description:
    "View and download Ajay Autade's professional resume. DevOps & Cloud Engineer specializing in AWS, Kubernetes, Docker, Terraform, CI/CD pipelines, DevSecOps, and MLOps.",
  alternates: {
    canonical: "https://ajayautade.com/resume",
  },
  openGraph: {
    title: "Ajay Autade Resume — DevOps & Cloud Engineer",
    description:
      "View and download Ajay Autade's DevOps & Cloud Engineer resume (AWS, Kubernetes, Terraform, Docker, CI/CD, MLOps).",
    url: "https://ajayautade.com/resume",
    siteName: "Ajay Autade Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Autade Resume — DevOps & Cloud Engineer",
    description:
      "View and download Ajay Autade's DevOps & Cloud Engineer resume.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResumePage() {
  return <ResumeClient />;
}
