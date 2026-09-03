import type { Metadata } from "next";
import CertificationsClient from "./CertificationsClient";

export const metadata: Metadata = {
  title: "Certifications & Verified Credentials",
  description:
    "Explore Ajay Autade's industry certifications in progress (AWS Solutions Architect, CKA, Terraform Associate) and 15+ verified course credentials in Cloud, DevOps, and Security.",
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
    locale: "en_IN",
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
  },
};

export default function CertificationsPage() {
  return <CertificationsClient />;
}
