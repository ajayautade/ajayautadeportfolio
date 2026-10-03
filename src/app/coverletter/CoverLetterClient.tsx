"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  Brain,
  Rocket,
  Shield,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ui/ScrollReveal";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const strengths = [
  {
    title: "Cloud & Infrastructure",
    desc: "AWS (EC2, EKS, ECR, S3, VPC, IAM), GCP, Terraform, Ansible — production-grade cloud environments",
  },
  {
    title: "Containerization & Orchestration",
    desc: "Docker, Kubernetes (EKS), Helm — HPA auto-scaling and 73% image size optimization",
  },
  {
    title: "CI/CD & GitOps",
    desc: "GitHub Actions, Jenkins, ArgoCD — 45min → ~8min code-to-production pipelines",
  },
  {
    title: "MLOps & AI Infrastructure",
    desc: "ML deployment pipelines, model serving, real-time inference monitoring at scale",
  },
  {
    title: "Monitoring & Observability",
    desc: "Prometheus, Grafana, CloudWatch — custom PromQL alerts and real-time dashboards",
  },
  {
    title: "DevSecOps",
    desc: "Trivy security scanning, secure CI pipelines, security-first development lifecycle",
  },
];

export default function CoverLetterClient() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const letterText = document.getElementById("cover-letter-body")?.innerText;
    if (letterText) {
      await navigator.clipboard.writeText(letterText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-primary selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* ============================================
          HERO HEADER
          ============================================ */}
      <section
        style={{ paddingTop: "120px" }}
        className="pb-12 sm:pb-16 relative overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-accent/15 via-primary/10 to-transparent blur-[110px] pointer-events-none -z-10" />

        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl lg:max-w-5xl mx-auto text-center"
          >
            {/* Breadcrumb */}
            <div className="mb-6 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-text-secondary bg-surface-elevated/80 border border-border/80 hover:text-text-primary hover:border-primary/40 transition-all shadow-sm group"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Portfolio</span>
                <span className="text-text-tertiary">/</span>
                <span className="text-primary font-semibold">
                  Cover Letter
                </span>
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-4">
              <span className="gradient-text">Cover Letter</span>
            </h1>

            {/* Actions */}
            <div className="mt-8 mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/resume.pdf"
                download="Ajay_Autade_DevOps_Engineer_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Resume</span>
              </a>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-4 py-2 text-xs font-medium text-text-primary border border-border hover:border-primary/40 transition-all shadow-sm"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Letter</span>
              </button>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-4 py-2 text-xs font-medium text-text-primary border border-border hover:border-primary/40 transition-all shadow-sm"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-success" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============================================
          COVER LETTER CONTENT
          ============================================ */}
      <main id="cover-letter-body" className="flex-1 pt-8 sm:pt-12 pb-12 sm:pb-16 lg:pb-20">
        <div className="section-container">
          <div className="w-full">
            <ScrollReveal>
              {/* Contact Info Bar */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs text-text-secondary mb-10 sm:mb-14 pb-6 border-b border-border">
                <a
                  href="mailto:contact@ajayautade.com"
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Mail className="h-3 w-3 text-primary" />
                  contact@ajayautade.com
                </a>
                <a
                  href="tel:+919545034120"
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Phone className="h-3 w-3 text-primary" />
                  +91 9545034120
                </a>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-primary" />
                  Maharashtra, India
                </span>
                <a
                  href="https://ajayautade.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Globe className="h-3 w-3 text-primary" />
                  ajayautade.com
                </a>
                <a
                  href="https://linkedin.com/in/ajayautadepatil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <LinkedinIcon className="h-3 w-3 text-primary" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/ajayautade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <GithubIcon className="h-3 w-3 text-primary" />
                  GitHub
                </a>
              </div>
            </ScrollReveal>

            {/* ---- Name Header ---- */}
            <ScrollReveal>
              <div className="text-center mb-10 sm:mb-14">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary">
                  Ajay Autade
                </h2>
                <p className="mt-1 text-base sm:text-lg font-medium text-primary">
                  DevOps &amp; Cloud Engineer
                </p>
                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent mx-auto" />
              </div>
            </ScrollReveal>

            {/* ---- Letter Body ---- */}
            <div className="space-y-10 sm:space-y-14">
              {/* Greeting & Intro */}
              <ScrollReveal>
                <div className="space-y-5">
                  <p className="text-lg sm:text-xl font-semibold text-text-primary">
                    Dear Hiring Manager,
                  </p>
                  <p className="text-[15px] sm:text-base lg:text-[17px] text-text-secondary leading-[1.85] sm:leading-[1.9]">
                    I am writing to express my strong interest in the{" "}
                    <strong className="text-text-primary font-semibold">
                      DevOps / Cloud Engineering
                    </strong>{" "}
                    role at your organization. As a B.Tech Computer Science
                    graduate with hands-on experience in designing, automating,
                    and optimizing cloud-native infrastructure, I am confident
                    that my technical expertise and passion for operational
                    excellence align well with your team&apos;s goals.
                  </p>
                </div>
              </ScrollReveal>

              {/* Professional Experience */}
              <ScrollReveal>
                <div className="rounded-2xl border border-border bg-surface/60 p-5 sm:p-7 lg:p-8">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-text-primary uppercase tracking-wide">
                      Professional Experience
                    </h3>
                  </div>
                  <p className="text-[15px] sm:text-base lg:text-[17px] text-text-secondary leading-[1.85] sm:leading-[1.9]">
                    During my internship at{" "}
                    <strong className="text-text-primary font-semibold">
                      Invictus Web Solutions Pvt. Ltd.
                    </strong>
                    , I automated AWS infrastructure provisioning (EC2, S3, VPC,
                    IAM) using Terraform — reducing manual setup time from hours
                    to minutes. I containerized 4+ applications with Docker and
                    deployed them on Kubernetes clusters, ensuring scalability
                    and zero-downtime deployments. I also designed end-to-end
                    CI/CD pipelines using Jenkins and GitHub Actions that reduced
                    release cycles by{" "}
                    <span className="text-primary font-semibold">60%</span>{" "}
                    across multiple applications.
                  </p>
                </div>
              </ScrollReveal>

              {/* Projects & AI/ML */}
              <ScrollReveal>
                <div className="rounded-2xl border border-border bg-surface/60 p-5 sm:p-7 lg:p-8">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                      <Rocket className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-text-primary uppercase tracking-wide">
                      Projects &amp; AI/ML Initiatives
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[15px] sm:text-base lg:text-[17px] text-text-secondary leading-[1.85] sm:leading-[1.9]">
                      Beyond professional roles, I have built production-grade
                      projects that demonstrate real-world impact. My{" "}
                      <strong className="text-text-primary font-semibold">
                        MLOps Sentiment Analyzer
                      </strong>{" "}
                      is a zero-touch ML deployment pipeline on AWS EKS that
                      slashed code-to-production time from{" "}
                      <span className="text-primary font-semibold">
                        45 minutes to ~8 minutes
                      </span>{" "}
                      using GitHub Actions and ArgoCD. I optimized ML Docker
                      images by{" "}
                      <span className="text-primary font-semibold">73%</span>{" "}
                      (3 GB → 800 MB) via multi-stage builds, configured
                      Kubernetes HPA for auto-scaling (2→10 pods), and tracked 9
                      real-time inference metrics through Prometheus and Grafana
                      — bridging the gap between machine learning and
                      production-grade DevOps infrastructure.
                    </p>
                    <p className="text-[15px] sm:text-base lg:text-[17px] text-text-secondary leading-[1.85] sm:leading-[1.9]">
                      I also engineered{" "}
                      <strong className="text-text-primary font-semibold">
                        MoviesMonkey
                      </strong>
                      , a cloud-native application on AWS EKS with a
                      dual-pipeline CI/CD workflow featuring Trivy security
                      scans, ArgoCD auto-sync every 3 minutes, and a 5-service
                      monitoring stack with custom PromQL alert rules. These
                      projects, along with my{" "}
                      <strong className="text-text-primary font-semibold">
                        End-to-End CI/CD Pipeline
                      </strong>{" "}
                      (Kind + Helm + AWS ECR + Terraform + OIDC) and{" "}
                      <strong className="text-text-primary font-semibold">
                        GitOps ArgoCD Deployment
                      </strong>{" "}
                      system, reflect my commitment to building infrastructure
                      that is automated, secure, and scalable from day one.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* AI & Learning */}
              <ScrollReveal>
                <div className="rounded-2xl border border-border bg-surface/60 p-5 sm:p-7 lg:p-8">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-text-primary uppercase tracking-wide">
                      AI &amp; Continuous Learning
                    </h3>
                  </div>
                  <p className="text-[15px] sm:text-base lg:text-[17px] text-text-secondary leading-[1.85] sm:leading-[1.9]">
                    My interest in Artificial Intelligence extends beyond MLOps.
                    I have completed the{" "}
                    <strong className="text-text-primary font-semibold">
                      Introduction to Artificial Intelligence
                    </strong>{" "}
                    certification from IBM (Coursera) and{" "}
                    <strong className="text-text-primary font-semibold">
                      AI For Everyone
                    </strong>{" "}
                    from DeepLearning.AI — giving me a strong foundation in AI
                    concepts, ethical AI deployment, and the strategic
                    integration of AI systems into enterprise workflows. I am
                    deeply passionate about the intersection of DevOps and AI,
                    particularly in building the infrastructure that powers
                    ML/AI systems at scale.
                  </p>
                </div>
              </ScrollReveal>

              {/* Key Strengths */}
              <ScrollReveal>
                <div>
                  <div className="flex items-center gap-2.5 mb-6">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-text-primary uppercase tracking-wide">
                      What I Bring to the Table
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {strengths.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 rounded-xl border border-border bg-surface/60 p-4 sm:p-5 hover:border-primary/30 transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-text-primary mb-1">
                            {item.title}
                          </p>
                          <p className="text-xs sm:text-[13px] text-text-tertiary leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Closing paragraphs */}
              <ScrollReveal>
                <div className="space-y-5">
                  <p className="text-[15px] sm:text-base lg:text-[17px] text-text-secondary leading-[1.85] sm:leading-[1.9]">
                    Beyond technical competence, I bring strong collaboration
                    skills honed through cross-functional code reviews,
                    architectural planning, and pair programming sessions. I
                    thrive in environments where infrastructure is treated as
                    code, deployments are non-events, and every system is built
                    to be resilient and disposable.
                  </p>
                  <p className="text-[15px] sm:text-base lg:text-[17px] text-text-secondary leading-[1.85] sm:leading-[1.9]">
                    I am eager to contribute my skills to your team and help
                    drive your infrastructure forward with automation,
                    reliability, and modern DevOps practices. I would welcome the
                    opportunity to discuss how my experience aligns with your
                    needs.
                  </p>
                  <p className="text-[15px] sm:text-base lg:text-[17px] text-text-secondary leading-[1.85] sm:leading-[1.9]">
                    Thank you for considering my application. I look forward to
                    hearing from you.
                  </p>
                </div>
              </ScrollReveal>

              {/* Signature */}
              <ScrollReveal>
                <div className="border-t border-border pt-8">
                  <p className="text-base text-text-secondary mb-2">
                    Warm regards,
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-text-primary">
                    Ajay Autade
                  </p>
                  <p className="text-sm font-medium text-primary mt-0.5">
                    DevOps &amp; Cloud Engineer
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* ---- Bottom CTA ---- */}
            <ScrollReveal delay={0.15}>
              <div className="mt-14 sm:mt-20 rounded-2xl border border-border bg-surface/60 p-6 sm:p-10 text-center relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

                <div className="relative z-10">
                  <h4 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                    Interested in working together?
                  </h4>
                  <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
                    I&apos;m open to full-time roles, freelance projects, and
                    consulting opportunities worldwide.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/#contact" className="btn-primary">
                      <Mail className="h-4 w-4" />
                      Get in Touch
                    </Link>
                    <a
                      href="/resume.pdf"
                      download="Ajay_Autade_DevOps_Engineer_Resume.pdf"
                      className="btn-outline"
                    >
                      <Download className="h-4 w-4" />
                      Download Resume
                    </a>
                    <Link href="/#projects" className="btn-outline">
                      <ExternalLink className="h-4 w-4" />
                      View Projects
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          nav,
          footer,
          .section-divider,
          button,
          .btn-primary,
          .btn-outline,
          section:first-of-type {
            display: none !important;
          }
          body {
            background: white !important;
            color: #111 !important;
          }
          #cover-letter-body {
            padding-top: 1rem !important;
          }
          #cover-letter-body .rounded-2xl {
            border: none !important;
            background: transparent !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
