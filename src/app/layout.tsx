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
    default: "Ajay Autade — DevOps & Cloud Engineer | AWS, Kubernetes, Docker, Terraform | Portfolio",
    template: "%s — Ajay Autade",
  },
  description:
    "Ajay Autade is a DevOps & Cloud Engineer from India with hands-on expertise in AWS, Kubernetes, Docker, Terraform, CI/CD, Jenkins, GitHub Actions, ArgoCD, and MLOps. B.Tech CSE graduate from MGM JNEC, Maharashtra. View portfolio, projects, and resume. Open to opportunities.",
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
    "Ajay Autade Resume",
    "Ajay Autade DevOps Resume",
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
    "Platform Engineer",
    "Site Reliability Engineer",
    "Cloud Native Engineer",
    "DevOps Automation Engineer",
    "Infrastructure Engineer India",
    // High-intent search keywords
    "DevOps Engineer Portfolio India",
    "Hire DevOps Engineer India",
    "AWS DevOps Engineer Portfolio",
    "Kubernetes Engineer India",
    "Cloud Infrastructure Engineer",
    "CI/CD Pipeline Engineer",
    "Terraform Engineer India",
    "Docker Kubernetes Engineer",
    "DevOps Fresher India",
    "Junior DevOps Engineer India",
    "Site Reliability Engineer India",
    "B.Tech CSE DevOps",
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
    "Helm",
    "MongoDB",
    "MySQL",
    "FastAPI",
    "EKS",
    "ECR",
    "Infrastructure Automation",
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
    title: "Ajay Autade — DevOps, DevSecOps & AI Engineer | Portfolio",
    description:
      "Ajay Autade is a DevOps & Cloud Engineer with hands-on expertise in AWS, Kubernetes, Docker, Terraform, CI/CD, Jenkins, ArgoCD, and MLOps. B.Tech CSE graduate, open to opportunities. View portfolio, projects, and resume.",
    url: "https://ajayautade.com",
    siteName: "Ajay Autade — DevOps & Cloud Engineer Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Autade — DevOps, DevSecOps & AI Engineer | Portfolio",
    description:
      "DevOps & Cloud Engineer | AWS, Kubernetes, Docker, Terraform, CI/CD, MLOps | B.Tech CSE | Open to opportunities. View portfolio and resume.",
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
                  "Ajay Autade is a results-driven DevOps & Cloud Engineer from India with hands-on expertise in Kubernetes, Docker, AWS, Terraform, Jenkins, GitHub Actions, ArgoCD, CI/CD, and MLOps. B.Tech CSE graduate from MGM's Jawaharlal Nehru Engineering College (MGM JNEC), Chhatrapati Sambhajinagar, Maharashtra. He builds resilient cloud infrastructure, automates CI/CD pipelines, implements security-first DevSecOps practices, and develops MLOps solutions.",
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
                  "Helm",
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
                  "FastAPI",
                  "Linux",
                  "Shell Scripting",
                  "Nginx",
                  "Cyber Security",
                  "Network Security",
                  "Computer Science",
                  "Software Engineering",
                  "MongoDB",
                  "MySQL",
                  "AWS EKS",
                  "AWS ECR",
                  "AWS VPC",
                ],
                hasOccupation: {
                  "@type": "Occupation",
                  name: "DevOps Engineer",
                  description:
                    "Designs and implements cloud infrastructure, CI/CD pipelines, DevSecOps practices, and MLOps solutions. Specializes in AWS, Docker, Kubernetes, Terraform, Helm, and automation.",
                  occupationLocation: {
                    "@type": "Country",
                    name: "India",
                  },
                  skills:
                    "AWS, Docker, Kubernetes, Helm, Terraform, CI/CD, Jenkins, GitHub Actions, ArgoCD, Python, Linux, Grafana, Prometheus, DevSecOps, MLOps, Ansible, MongoDB, MySQL, FastAPI",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://ajayautade.com/#website",
                url: "https://ajayautade.com",
                name: "Ajay Autade — DevOps & Cloud Engineer Portfolio",
                description:
                  "Official portfolio website of Ajay Autade, a DevOps & Cloud Engineer specializing in AWS, Kubernetes, Docker, Terraform, CI/CD, and MLOps. Based in Maharashtra, India. Open to opportunities.",
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
                    name: "About",
                    item: "https://ajayautade.com/#about",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Experience",
                    item: "https://ajayautade.com/#experience",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Projects",
                    item: "https://ajayautade.com/#projects",
                  },
                  {
                    "@type": "ListItem",
                    position: 5,
                    name: "Contact",
                    item: "https://ajayautade.com/#contact",
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Who is Ajay Autade?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Ajay Autade is a DevOps & Cloud Engineer from Chhatrapati Sambhajinagar, Maharashtra, India. He is a B.Tech CSE graduate from MGM's Jawaharlal Nehru Engineering College (MGM JNEC) with hands-on expertise in AWS, Kubernetes, Docker, Terraform, CI/CD, and MLOps.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What does Ajay Autade do?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Ajay Autade specializes in DevOps engineering — designing cloud infrastructure on AWS, building CI/CD pipelines with Jenkins and GitHub Actions, orchestrating containers with Kubernetes and Docker, implementing Infrastructure as Code with Terraform, and setting up monitoring with Prometheus and Grafana.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is Ajay Autade available for hire?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, Ajay Autade is currently open to DevOps Engineer, Cloud Engineer, and Platform Engineer opportunities. You can reach him at contact@ajayautade.com or through his portfolio website at ajayautade.com.",
                    },
                  },
                ],
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
