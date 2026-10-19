import type { Metadata } from "next";
import CertificationsClient from "./CertificationsClient";

export const metadata: Metadata = {
  title: "Certifications & Verified Credentials — Ajay Autade",
  description:
    "Explore Ajay Autade's industry certifications in progress (AWS Solutions Architect, CKA, Terraform Associate) and 15+ verified course credentials in Cloud, DevOps, and Security.",
  keywords: [
    "Ajay Autade Certifications",
    "AWS Certified Solutions Architect",
    "Certified Kubernetes Administrator CKA",
    "HashiCorp Terraform Associate",
    "IBM AI Certification",
    "DeepLearning.AI Certification",
    "DevOps Credentials",
    "Cloud Engineer Certifications",
  ],
  alternates: {
    canonical: "https://ajayautade.com/certifications",
  },
  openGraph: {
    title: "Certifications & Verified Credentials — Ajay Autade",
    description:
      "Industry certifications in progress (AWS Solutions Architect, CKA, Terraform Associate) and verified credentials from Coursera, Udemy, and leading institutions.",
    url: "https://ajayautade.com/certifications",
    siteName: "Ajay Autade — DevOps Engineer Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications & Verified Credentials — Ajay Autade",
    description:
      "Certifications and verified credentials of Ajay Autade (DevOps & Cloud Engineer).",
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

export default function CertificationsPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Ajay Autade's Verified Technical Certifications & Credentials",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "AWS Certified Solutions Architect – Associate (In Progress)",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Certified Kubernetes Administrator (CKA) (In Progress)",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "HashiCorp Certified: Terraform Associate (In Progress)",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Introduction to Artificial Intelligence (AI) — IBM",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "AI For Everyone — DeepLearning.AI",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Terraform for AWS Infrastructure — Udemy",
        },
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
          name: "Certifications & Credentials",
          item: "https://ajayautade.com/certifications",
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
      <CertificationsClient />
    </>
  );
}
