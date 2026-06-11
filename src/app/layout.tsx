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
  title: "Ajay Autade — DevOps Engineer | Portfolio",
  description:
    "Portfolio of Ajay Autade, a DevOps Engineer specializing in AWS, Docker, Kubernetes, Terraform, CI/CD, and cloud-native infrastructure. Open to opportunities.",
  keywords: [
    "Ajay Autade",
    "DevOps Engineer",
    "AWS",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "Jenkins",
    "GitHub Actions",
    "Cloud Infrastructure",
    "Portfolio",
  ],
  authors: [{ name: "Ajay Autade" }],
  creator: "Ajay Autade",
  openGraph: {
    title: "Ajay Autade — DevOps Engineer",
    description:
      "DevOps Engineer specializing in cloud infrastructure, container orchestration, and CI/CD pipelines.",
    url: "https://ajayautade.dev",
    siteName: "Ajay Autade Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Autade — DevOps Engineer",
    description:
      "DevOps Engineer specializing in cloud infrastructure, container orchestration, and CI/CD pipelines.",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ajay Autade",
              jobTitle: "DevOps Engineer",
              url: "https://ajayautade.dev",
              email: "ajayautade2@gmail.com",
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
              sameAs: [
                "https://github.com/ajayautade",
                "https://www.linkedin.com/in/ajayautadepatil",
              ],
              knowsAbout: [
                "DevOps",
                "AWS",
                "Docker",
                "Kubernetes",
                "Terraform",
                "CI/CD",
                "Jenkins",
                "Python",
                "Linux",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
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
