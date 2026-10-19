import type { Metadata } from "next";
import DeepDivesClient from "./DeepDivesClient";

export const metadata: Metadata = {
  title: "Interactive CI/CD & Technical Deep Dives — Ajay Autade",
  description:
    "Explore Ajay Autade's interactive AWS EKS GitOps deployment simulator and 15 in-depth, production-tested answers to senior DevOps, DevSecOps, and Cloud screening questions.",
  keywords: [
    "DevOps Deep Dives",
    "CI/CD Simulator",
    "AWS EKS Deployment",
    "GitOps ArgoCD Architecture",
    "DevOps Technical Interview Answers",
    "DevSecOps Best Practices",
    "Kubernetes Production Case Studies",
    "Ajay Autade Technical Screening",
  ],
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
    locale: "en_US",
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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function DeepDivesPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Interactive CI/CD Simulation & Enterprise DevOps Deep Dives",
      description:
        "Interactive live simulation of an AWS EKS GitOps deployment pipeline and 15 architectural screening solutions for senior DevOps, Cloud, and SRE challenges.",
      author: {
        "@type": "Person",
        name: "Ajay Autade",
        url: "https://ajayautade.com",
      },
      publisher: {
        "@type": "Person",
        name: "Ajay Autade",
      },
      url: "https://ajayautade.com/deep-dives",
      about: [
        "DevOps",
        "Continuous Integration",
        "Continuous Deployment",
        "Kubernetes",
        "AWS EKS",
        "GitOps",
        "ArgoCD",
        "Terraform",
      ],
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
          name: "Technical Deep Dives",
          item: "https://ajayautade.com/deep-dives",
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DeepDivesClient />
    </>
  );
}
