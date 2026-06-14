import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
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
    "Ajay Autade is a DevOps Engineer from India specializing in AWS, Docker, Kubernetes, Terraform, CI/CD pipelines, Jenkins, GitHub Actions, and cloud-native infrastructure. Hire Ajay Autade for DevOps consulting and freelance work.",
  keywords: [
    "Ajay Autade",
    "Autade",
    "Ajay Autade DevOps",
    "Ajay Autade Portfolio",
    "Ajay Autade Engineer",
    "DevOps Engineer",
    "DevOps",
    "Cloud Engineer",
    "DevOps Engineer India",
    "DevOps Engineer Maharashtra",
    "AWS DevOps Engineer",
    "Kubernetes Engineer",
    "AWS",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "Jenkins",
    "GitHub Actions",
    "ArgoCD",
    "Cloud Infrastructure",
    "Infrastructure as Code",
    "DevOps Portfolio",
    "Hire DevOps Engineer",
    "Freelance DevOps",
    "ajayautade.com",
  ],
  authors: [{ name: "Ajay Autade", url: "https://ajayautade.com" }],
  creator: "Ajay Autade",
  publisher: "Ajay Autade",
  alternates: {
    canonical: "https://ajayautade.com",
  },
  openGraph: {
    title: "Ajay Autade — DevOps & Cloud Engineer",
    description:
      "DevOps Engineer specializing in AWS, Docker, Kubernetes, Terraform, CI/CD pipelines, and cloud-native infrastructure. Based in Maharashtra, India. Open to opportunities.",
    url: "https://ajayautade.com",
    siteName: "Ajay Autade — DevOps Engineer Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Autade — DevOps & Cloud Engineer",
    description:
      "DevOps Engineer specializing in AWS, Docker, Kubernetes, Terraform, CI/CD pipelines, and cloud-native infrastructure. Open to opportunities.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://ajayautade.com/#person",
                name: "Ajay Autade",
                alternateName: ["Autade", "Ajay Autade Patil"],
                givenName: "Ajay",
                familyName: "Autade",
                jobTitle: "DevOps & Cloud Engineer",
                description: "DevOps Engineer specializing in AWS, Docker, Kubernetes, Terraform, CI/CD pipelines, and cloud-native infrastructure. Based in Maharashtra, India.",
                url: "https://ajayautade.com",
                image: "https://ajayautade.com/profile.png",
                email: "ajayautade2@gmail.com",
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
                },
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
                  "Cloud Engineering",
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
                ],
                hasOccupation: {
                  "@type": "Occupation",
                  name: "DevOps Engineer",
                  occupationLocation: {
                    "@type": "Country",
                    name: "India",
                  },
                  skills: "AWS, Docker, Kubernetes, Terraform, CI/CD, Jenkins, GitHub Actions, ArgoCD, Python, Linux, Grafana, Prometheus",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://ajayautade.com/#website",
                url: "https://ajayautade.com",
                name: "Ajay Autade — DevOps & Cloud Engineer Portfolio",
                description: "Portfolio website of Ajay Autade, a DevOps Engineer from India specializing in AWS, Docker, Kubernetes, Terraform, and CI/CD.",
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
                name: "Ajay Autade Portfolio",
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
      </body>
    </html>
  );
}
