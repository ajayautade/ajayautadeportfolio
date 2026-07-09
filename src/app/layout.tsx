import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ajayautade.com"),
  title: {
    default: "Ajay Autade — DevOps & Cloud Engineer | Portfolio",
    template: "%s — Ajay Autade",
  },
  description:
    "Ajay Autade is a Computer Science Engineer from India specializing in DevOps, DevSecOps, Artificial Intelligence, AWS, Docker, Kubernetes, Terraform, and CI/CD pipelines. B.Tech CSE graduate from MGM JNEC delivering high-quality cloud infrastructure and automation solutions.",
  keywords: [
    // Name-based (core identity)
    "Ajay Autade",
    "Ajay Narendra Autade",
    "Autade",
    "Ajay Autade Portfolio",
    "Ajay Autade Engineer",
    "Ajay Autade DevOps",
    "Ajay Autade DevSecOps",
    "Ajay Autade AI",
    "Ajay Autade Cloud",
    "who is Ajay Autade",
    "Ajay Autade CSE",
    "Ajay Autade Computer Science",
    "Ajay Autade MGM JNEC",
    "Ajay Autade Maharashtra",
    "Ajay Autade India",
    "ajayautade.com",
    // Role & expertise
    "DevOps Engineer",
    "DevSecOps Engineer",
    "Cloud Engineer",
    "MLOps Engineer",
    "Computer Science Engineer",
    "Software Engineer DevOps",
    "DevOps Engineer India",
    "DevOps Engineer Maharashtra",
    "AWS DevOps Engineer",
    "Kubernetes Engineer",
    // Skills
    "AWS",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "Jenkins",
    "GitHub Actions",
    "ArgoCD",
    "Ansible",
    "Prometheus",
    "Grafana",
    "Python",
    "Linux",
    "Shell Scripting",
    "Infrastructure as Code",
    "GitOps",
    "Artificial Intelligence",
    "Machine Learning",
    "MLOps",
    "DevSecOps",
    "Cyber Security",
    "Cloud Native",
    "Cloud Infrastructure",
    "DevOps Portfolio",
    "Hire DevOps Engineer",
    "Freelance DevOps",
  ],
  authors: [{ name: "Ajay Autade", url: "https://ajayautade.com" }],
  creator: "Ajay Autade",
  publisher: "Ajay Autade",
  alternates: {
    canonical: "https://ajayautade.com",
  },
  openGraph: {
    title: "Ajay Autade — DevOps, DevSecOps & AI Engineer",
    description:
      "Ajay Autade is a Computer Science Engineer specializing in DevOps, DevSecOps, and Artificial Intelligence. Expert in AWS, Docker, Kubernetes, Terraform, CI/CD, and MLOps. Based in Maharashtra, India. Open to opportunities.",
    url: "https://ajayautade.com",
    siteName: "Ajay Autade — DevOps & Cloud Engineer Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Autade — DevOps, DevSecOps & AI Engineer",
    description:
      "Computer Science Engineer specializing in DevOps, DevSecOps, and AI. Expert in AWS, Docker, Kubernetes, Terraform, CI/CD, and MLOps. Open to opportunities.",
    creator: "@ajayautade",
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
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://ajayautade.com/#person",
                name: "Ajay Autade",
                alternateName: ["Ajay Narendra Autade", "Autade", "Ajay Autade Patil"],
                givenName: "Ajay",
                familyName: "Autade",
                jobTitle: "DevOps & Cloud Engineer",
                description:
                  "Ajay Autade is a Computer Science Engineer from India specializing in DevOps, DevSecOps, and Artificial Intelligence. He is a B.Tech CSE graduate from MGM's Jawaharlal Nehru Engineering College (MGM JNEC), Chhatrapati Sambhajinagar, Maharashtra. He builds resilient cloud infrastructure, automates CI/CD pipelines, implements security-first DevSecOps practices, and develops MLOps solutions — consistently delivering high-quality, production-grade engineering output.",
                url: "https://ajayautade.com",
                image: "https://ajayautade.com/profile.png",
                email: "contact@ajayautade.com",
                telephone: "+917820902571",
                nationality: "Indian",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Chhatrapati Sambhajinagar",
                  addressRegion: "Maharashtra",
                  addressCountry: "IN",
                },
                alumniOf: {
                  "@type": "EducationalOrganization",
                  name: "MGM's Jawaharlal Nehru Engineering College",
                  alternateName: "MGM JNEC",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Chhatrapati Sambhajinagar",
                    addressRegion: "Maharashtra",
                    addressCountry: "IN",
                  },
                },
                hasCredential: [
                  {
                    "@type": "EducationalOccupationalCredential",
                    name: "B.Tech in Computer Science and Engineering",
                    credentialCategory: "degree",
                    recognizedBy: {
                      "@type": "EducationalOrganization",
                      name: "MGM's Jawaharlal Nehru Engineering College",
                    },
                  },
                  {
                    "@type": "EducationalOccupationalCredential",
                    name: "Introduction to Artificial Intelligence (AI)",
                    credentialCategory: "certificate",
                    recognizedBy: { "@type": "Organization", name: "IBM / Coursera" },
                  },
                  {
                    "@type": "EducationalOccupationalCredential",
                    name: "AI For Everyone",
                    credentialCategory: "certificate",
                    recognizedBy: { "@type": "Organization", name: "DeepLearning.AI / Coursera" },
                  },
                  {
                    "@type": "EducationalOccupationalCredential",
                    name: "Terraform + AWS",
                    credentialCategory: "certificate",
                    recognizedBy: { "@type": "Organization", name: "Udemy" },
                  },
                  {
                    "@type": "EducationalOccupationalCredential",
                    name: "The Cyber Security Bootcamp",
                    credentialCategory: "certificate",
                    recognizedBy: { "@type": "Organization", name: "Udemy" },
                  },
                ],
                worksFor: {
                  "@type": "Organization",
                  name: "Freelance / Open to Opportunities",
                },
                sameAs: [
                  "https://github.com/ajayautade",
                  "https://www.linkedin.com/in/ajayautadepatil",
                ],
                knowsAbout: [
                  "DevOps",
                  "DevSecOps",
                  "Cloud Engineering",
                  "Artificial Intelligence",
                  "Machine Learning",
                  "MLOps",
                  "Amazon Web Services (AWS)",
                  "Google Cloud Platform (GCP)",
                  "Docker",
                  "Kubernetes",
                  "Terraform",
                  "Ansible",
                  "CI/CD Pipelines",
                  "Jenkins",
                  "GitHub Actions",
                  "ArgoCD",
                  "GitOps",
                  "Infrastructure as Code",
                  "Prometheus",
                  "Grafana",
                  "Python",
                  "Linux",
                  "Shell Scripting",
                  "Nginx",
                  "Cyber Security",
                  "Network Security",
                  "Computer Science",
                  "Software Engineering",
                ],
                hasOccupation: {
                  "@type": "Occupation",
                  name: "DevOps Engineer",
                  description:
                    "Designs and implements cloud infrastructure, CI/CD pipelines, DevSecOps practices, and MLOps solutions. Specializes in AWS, Docker, Kubernetes, Terraform, and automation.",
                  occupationLocation: {
                    "@type": "Country",
                    name: "India",
                  },
                  skills:
                    "AWS, Docker, Kubernetes, Terraform, CI/CD, Jenkins, GitHub Actions, ArgoCD, Python, Linux, Grafana, Prometheus, DevSecOps, MLOps, Ansible",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://ajayautade.com/#website",
                url: "https://ajayautade.com",
                name: "Ajay Autade — DevOps & Cloud Engineer Portfolio",
                description:
                  "Official portfolio website of Ajay Autade, a Computer Science Engineer specializing in DevOps, DevSecOps, AI, and cloud infrastructure. Based in Maharashtra, India.",
                publisher: {
                  "@id": "https://ajayautade.com/#person",
                },
                inLanguage: "en-IN",
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                "@id": "https://ajayautade.com/#profilepage",
                url: "https://ajayautade.com",
                name: "Ajay Autade — DevOps, DevSecOps & AI Engineer Portfolio",
                mainEntity: {
                  "@id": "https://ajayautade.com/#person",
                },
                dateCreated: "2026-06-11",
                dateModified: new Date().toISOString().split("T")[0],
              },
            ]),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
