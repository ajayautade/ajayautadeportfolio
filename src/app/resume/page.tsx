import { Suspense } from "react";
import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume & Cover Letter — Ajay Autade | DevOps & Cloud Engineer",
  description:
    "View and download Ajay Autade's professional resume and verified cover letter. DevOps & Cloud Engineer specializing in AWS, Kubernetes, Docker, Terraform, CI/CD pipelines, DevSecOps, and MLOps.",
  keywords: [
    "Ajay Autade Resume",
    "Ajay Autade CV",
    "DevOps Engineer Resume",
    "Cloud Engineer Resume",
    "AWS DevOps Resume PDF",
    "Kubernetes Specialist Resume",
    "Terraform Engineer CV",
    "Ajay Autade Cover Letter",
    "Hire DevOps Engineer",
  ],
  alternates: {
    canonical: "https://ajayautade.com/resume",
  },
  openGraph: {
    title: "Ajay Autade Resume & Cover Letter — DevOps & Cloud Engineer",
    description:
      "View and download Ajay Autade's DevOps & Cloud Engineer resume and executive cover letter (AWS, Kubernetes, Terraform, Docker, CI/CD, MLOps).",
    url: "https://ajayautade.com/resume",
    siteName: "Ajay Autade Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Autade Resume & Cover Letter — DevOps & Cloud Engineer",
    description:
      "View and download Ajay Autade's DevOps & Cloud Engineer resume and verified cover letter.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ResumePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: "Ajay Autade's Official Resume & Cover Letter",
      description:
        "Official verified credentials, resume document, and executive cover letter for Ajay Autade, DevOps & Cloud Architecture Specialist.",
      url: "https://ajayautade.com/resume",
      mainEntity: {
        "@type": "Person",
        name: "Ajay Autade",
        jobTitle: "DevOps & Cloud Engineer",
        url: "https://ajayautade.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://ajayautade.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Resume & Cover Letter",
          item: "https://ajayautade.com/resume",
        },
      ],
    },
  ];

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResumeClient />
    </Suspense>
  );
}
