import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { serviceFaqs } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Cloud Architecture, DevOps & Systems Engineering Consultancy | Ajay Autade",
  description:
    "Specialized technical engineering consultancy for venture-backed startups, high-growth technology companies, and enterprise teams worldwide. AWS, Kubernetes, Terraform, zero-downtime CI/CD, Next.js web platforms, and automated business workflows.",
  keywords: [
    "DevOps Consultancy",
    "Hire DevOps Engineer",
    "AWS Cloud Architect",
    "Kubernetes Engineering Services",
    "Terraform IaC Consulting",
    "CI/CD Pipeline Automation",
    "Fractional SRE",
    "Cloud Migration Services",
    "GitOps Consulting",
    "Next.js Web Development",
    "Business Workflow Automation",
    "DevOps Consultant Remote",
  ],
  alternates: {
    canonical: "https://ajayautade.com/services",
  },
  openGraph: {
    title: "Cloud Architecture, DevOps & Systems Engineering — Ajay Autade",
    description:
      "Specialized technical engineering consultancy for venture-backed startups, high-growth tech companies, and enterprise teams worldwide. Resilient AWS/Kubernetes architectures, zero-downtime CI/CD, and web platforms built for scale.",
    url: "https://ajayautade.com/services",
    siteName: "Ajay Autade — Cloud & DevOps Engineering Consultancy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Architecture, DevOps & Systems Engineering — Ajay Autade",
    description:
      "Partnering with technology organizations globally to engineer resilient cloud environments, automated delivery pipelines, and mission-critical software platforms built for scale.",
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

export default function ServicesPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Cloud Architecture, DevOps & Systems Engineering Consultancy",
      description:
        "Specialized technical engineering consultancy for venture-backed startups, high-growth technology companies, and enterprise teams worldwide. From resilient AWS/Kubernetes architectures and zero-downtime CI/CD pipelines to high-performance web platforms and bespoke event-driven business automations.",
      provider: {
        "@type": "Person",
        name: "Ajay Autade",
        url: "https://ajayautade.com",
        jobTitle: "DevOps, Cloud Architecture & Platform Engineer",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Worldwide",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engineering Capabilities & Service Packages",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cloud, Container & Delivery Pipeline Bootstrap",
              description:
                "Production foundation for early-stage tech companies: Docker multi-stage containerization, GitHub Actions CI/CD, secure AWS VPC/EC2 infrastructure, automated SSL, and monitoring.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Production DevOps, Web Platform & Workflow Suite",
              description:
                "Comprehensive technical partnership: AWS EKS Kubernetes clusters via modular Terraform IaC, GitOps continuous delivery, Next.js web applications, and event-driven business workflows.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Enterprise Architecture & Fractional SRE Retainer",
              description:
                "Dedicated ongoing infrastructure leadership, high-availability multi-region cloud architecture, 99.95%+ uptime SLAs, FinOps cost optimization, and 24/7 on-call operational support.",
            },
          },
        ],
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
          name: "Engineering Services",
          item: "https://ajayautade.com/services",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: serviceFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPageClient />
    </>
  );
}
