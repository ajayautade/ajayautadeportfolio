import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/lib/LanguageContext";
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
    // Name-based & Branding (Core global identity)
    "Ajay Autade",
    "Ajay Narendra Autade",
    "Ajay Autade Patil",
    "Autade",
    "Ajay Autade Portfolio",
    "Ajay Autade Engineer",
    "Ajay Autade DevOps",
    "Ajay Autade DevSecOps",
    "Ajay Autade Cloud",
    "Ajay Autade AWS",
    "Ajay Autade AI",
    "who is Ajay Autade",
    "Ajay Autade CSE",
    "Ajay Autade Computer Science",
    "Ajay Autade MGM JNEC",
    "Ajay Autade Maharashtra",
    "Ajay Autade India",
    "Ajay Autade Resume",
    "Ajay Autade DevOps Resume",
    "Ajay Autade GitHub",
    "Ajay Autade LinkedIn",
    "ajayautade.com",
    "अजय अवताडे",
    "अजय नरेंद्र अवताडे",
    "अजय औताडे",
    "阿杰·奥塔德",

    // DevOps, Cloud & AWS (High-Volume Global Keywords)
    "DevOps Engineer",
    "DevOps Engineer Portfolio",
    "Cloud Engineer",
    "AWS DevOps Engineer",
    "AWS Cloud Architect",
    "Kubernetes Engineer",
    "Docker Containerization Specialist",
    "Terraform Infrastructure as Code",
    "CI/CD Pipeline Automation",
    "Jenkins Pipeline Engineer",
    "GitHub Actions Automation",
    "ArgoCD GitOps",
    "Ansible Automation",
    "Prometheus Grafana Monitoring",
    "Linux System Administrator",
    "DevSecOps Engineer",
    "MLOps Engineer",
    "Site Reliability Engineer (SRE)",
    "Platform Engineer",
    "Cloud Native Architect",
    "Infrastructure Automation",

    // Freelancer & Commercial Intent (Global & Remote)
    "DevOps Freelancer",
    "Freelance DevOps Engineer",
    "Hire DevOps Engineer",
    "Hire AWS Cloud Engineer",
    "Freelance Kubernetes Consultant",
    "DevOps Consultant India",
    "Remote DevOps Engineer",
    "Freelance Infrastructure as Code",
    "Freelance Terraform Specialist",
    "Contract DevOps Engineer",
    "Cloud Migration Consultant",
    "DevOps as a Service",
    "Hire Cloud Engineer Remote",
    "Freelance CI/CD Automation",

    // Fresher, Junior & Early Career Intent
    "DevOps Fresher",
    "Junior DevOps Engineer",
    "Entry Level DevOps Engineer",
    "Fresher Cloud Engineer",
    "DevOps Fresher India",
    "Junior DevOps Engineer India",
    "B.Tech CSE DevOps",
    "DevOps Fresher Jobs",
    "Junior Site Reliability Engineer",
    "Graduate DevOps Engineer",

    // Multi-Language Regional Keywords
    // 🇪🇸 Spanish (Spain, Mexico, Latin America)
    "Ingeniero DevOps",
    "Ingeniero Cloud AWS",
    "DevOps Freelance",
    "Contratar Ingeniero DevOps",
    "Portafolio DevOps",
    "Especialista en Kubernetes",
    "Automatización CI/CD",
    "Infraestructura como Código",
    "Ingeniero de la Nube",
    "Desarrollador DevOps Remoto",

    // 🇫🇷 French (France, Canada, Europe)
    "Ingénieur DevOps",
    "Consultant Cloud AWS",
    "DevOps Freelance",
    "Recruter Ingénieur DevOps",
    "Portfolio DevOps",
    "Expert Kubernetes",
    "Automatisation CI/CD",
    "Infrastructure as Code",
    "Ingénieur Cloud",
    "Développeur DevOps Freelance",

    // 🇧🇷 Portuguese (Brazil, Portugal)
    "Engenheiro DevOps",
    "Especialista Cloud AWS",
    "DevOps Freelancer",
    "Contratar Engenheiro DevOps",
    "Portfólio DevOps",
    "Especialista em Kubernetes",
    "Automação CI/CD",
    "Infraestrutura como Código",
    "Engenheiro de Nuvem",

    // 🇮🇳 Marathi (Maharashtra, India)
    "DevOps इंजिनिअर",
    "क्लाउड इंजिनिअर",
    "AWS DevOps तज्ज्ञ",
    "Kubernetes इंजिनिअर महाराष्ट्र",
    "DevOps पोर्टफोलिओ",
    "DevOps अभियंता",

    // 🇮🇳 Hindi (India)
    "DevOps इंजीनियर",
    "क्लाउड इंजीनियर",
    "AWS DevOps विशेषज्ञ",
    "Kubernetes विशेषज्ञ",
    "DevOps पोर्टफोलियो",
    "DevOps फ्रीलांसर",
    "क्लाउड इंफ्रास्ट्रक्चर",

    // 🇨🇳 Mandarin Chinese (China, Singapore, Global)
    "DevOps工程师",
    "云原生工程师",
    "AWS云架构师",
    "自由职业DevOps",
    "DevOps作品集",
    "Kubernetes专家",
    "CI/CD自动化",
    "基础设施即代码",
  ],
  authors: [{ name: "Ajay Autade", url: "https://ajayautade.com" }],
  creator: "Ajay Autade",
  publisher: "Ajay Autade",
  alternates: {
    canonical: "https://ajayautade.com",
    languages: {
      "en-US": "https://ajayautade.com",
      "es-ES": "https://ajayautade.com",
      "fr-FR": "https://ajayautade.com",
      "pt-BR": "https://ajayautade.com",
      "mr-IN": "https://ajayautade.com",
      "hi-IN": "https://ajayautade.com",
      "zh-CN": "https://ajayautade.com",
    },
  },
  openGraph: {
    title: "Ajay Autade — DevOps, Cloud & AI Engineer | Portfolio",
    description:
      "Ajay Autade is a top DevOps & Cloud Engineer specializing in AWS, Kubernetes, Docker, Terraform, CI/CD pipelines, DevSecOps, and MLOps. Available for full-time & freelance projects globally. Explore portfolio and resume.",
    url: "https://ajayautade.com",
    siteName: "Ajay Autade — DevOps & Cloud Engineer Portfolio",
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES", "fr_FR", "pt_BR", "mr_IN", "hi_IN", "zh_CN", "en_IN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Autade — DevOps, Cloud & AI Engineer | Portfolio",
    description:
      "DevOps & Cloud Engineer | AWS, Kubernetes, Docker, Terraform, CI/CD, MLOps | B.Tech CSE | Available for freelance & full-time roles worldwide.",
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
                alternateName: [
                  "Ajay Narendra Autade",
                  "Autade",
                  "Ajay Autade Patil",
                  "अजय अवताडे",
                  "अजय नरेंद्र अवताडे",
                  "अजय औताडे",
                  "阿杰·奥塔德",
                ],
                givenName: "Ajay",
                familyName: "Autade",
                jobTitle: "DevOps & Cloud Engineer",
                description:
                  "Ajay Autade is an expert DevOps & Cloud Engineer specializing in AWS, Kubernetes, Docker, Terraform, Jenkins, GitHub Actions, ArgoCD, DevSecOps, and MLOps. He designs resilient cloud architectures, automates CI/CD workflows, and provides freelance and full-time engineering services globally.",
                url: "https://ajayautade.com",
                image: "https://ajayautade.com/profile.png",
                email: ["contact@ajayautade.com", "ajayautade2@gmail.com"],
                telephone: "+919545034120",
                nationality: "Indian",
                knowsLanguage: [
                  "English",
                  "Spanish",
                  "French",
                  "Portuguese",
                  "Marathi",
                  "Hindi",
                  "Mandarin Chinese",
                ],
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
                  name: "Freelance & Open to Opportunities",
                },
                sameAs: [
                  "https://github.com/ajayautade",
                  "https://www.linkedin.com/in/ajayautadepatil",
                  "https://ajayautade.com",
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
                  "Freelance DevOps Consulting",
                ],
                hasOccupation: {
                  "@type": "Occupation",
                  name: "DevOps Engineer & Cloud Consultant",
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
                "@type": "ProfessionalService",
                "@id": "https://ajayautade.com/#service",
                name: "Ajay Autade — DevOps & Cloud Engineering Services",
                url: "https://ajayautade.com",
                telephone: "+919545034120",
                email: "contact@ajayautade.com",
                image: "https://ajayautade.com/profile.png",
                priceRange: "$$",
                description:
                  "Professional DevOps, AWS Cloud infrastructure, Kubernetes cluster management, CI/CD pipeline automation, and DevSecOps consulting services for startups and enterprise teams worldwide.",
                provider: {
                  "@id": "https://ajayautade.com/#person",
                },
                areaServed: [
                  "Worldwide",
                  "India",
                  "United States",
                  "Europe",
                  "United Kingdom",
                  "Canada",
                  "Australia",
                  "Singapore",
                  "Latin America",
                ],
                serviceType: [
                  "DevOps Engineering",
                  "AWS Cloud Architecture",
                  "Kubernetes Cluster Setup & Management",
                  "CI/CD Pipeline Automation",
                  "Infrastructure as Code (Terraform & Ansible)",
                  "Monitoring & Observability (Prometheus & Grafana)",
                  "MLOps Deployment Pipelines",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://ajayautade.com/#website",
                url: "https://ajayautade.com",
                name: "Ajay Autade — DevOps & Cloud Engineer Portfolio",
                description:
                  "Official portfolio website of Ajay Autade, a DevOps & Cloud Engineer specializing in AWS, Kubernetes, Docker, Terraform, CI/CD, and MLOps. Available for full-time and freelance opportunities globally.",
                publisher: {
                  "@id": "https://ajayautade.com/#person",
                },
                inLanguage: ["en", "es", "fr", "pt", "mr", "hi", "zh"],
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
                      text: "Ajay Autade is an expert DevOps & Cloud Engineer from Chhatrapati Sambhajinagar, Maharashtra, India. He holds a B.Tech in CSE from MGM's Jawaharlal Nehru Engineering College (MGM JNEC) and specializes in AWS, Kubernetes, Docker, Terraform, CI/CD, DevSecOps, and MLOps.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What DevOps and Cloud services does Ajay Autade provide?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Ajay Autade provides end-to-end DevOps solutions including AWS Cloud infrastructure design, Terraform Infrastructure as Code, Kubernetes cluster orchestration, Docker containerization, CI/CD pipeline automation (Jenkins, GitHub Actions, ArgoCD), Prometheus and Grafana monitoring, and MLOps deployment.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is Ajay Autade available for freelance or full-time hiring?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, Ajay Autade is available for both full-time roles and freelance/contract consulting globally. You can contact him via email at contact@ajayautade.com, ajayautade2@gmail.com, or phone at +91 9545034120.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How can I contact Ajay Autade?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "You can reach Ajay Autade directly at contact@ajayautade.com, ajayautade2@gmail.com, phone at +91 9545034120, on LinkedIn at https://www.linkedin.com/in/ajayautadepatil, or through his GitHub profile https://github.com/ajayautade.",
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
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
