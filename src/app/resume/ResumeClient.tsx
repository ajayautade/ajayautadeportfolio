"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  ExternalLink,
  Printer,
  Copy,
  Check,
  ArrowLeft,
  FileText,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Eye,
  Sparkles,
  Globe,
  Briefcase,
  Rocket,
  Brain,
  Shield,
  ChevronRight,
  ScrollText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { personalInfo } from "@/lib/data";

const RESUME_FILE_PATH = "/ajay_autade_devops_9545034120.pdf";
const RESUME_DOWNLOAD_FILENAME = "ajay_autade_devops_9545034120.pdf";

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
    desc: "AWS (EC2, EKS, ECR, S3, VPC, IAM), GCP, Terraform, Ansible — production-grade resilient environments",
  },
  {
    title: "Containerization & Orchestration",
    desc: "Docker, Kubernetes (EKS), Helm — HPA auto-scaling and 73% image size optimization via multi-stage builds",
  },
  {
    title: "CI/CD & GitOps",
    desc: "GitHub Actions, Jenkins, ArgoCD — 45min → ~8min code-to-production deployment pipelines",
  },
  {
    title: "MLOps & AI Infrastructure",
    desc: "ML deployment pipelines, model serving, real-time inference monitoring at scale",
  },
  {
    title: "Monitoring & Observability",
    desc: "Prometheus, Grafana, CloudWatch — custom PromQL alerts and real-time production dashboards",
  },
  {
    title: "DevSecOps",
    desc: "Trivy vulnerability scanning, automated CI security gates, and policy-as-code enforcement",
  },
];

export default function ResumeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"pdf" | "coverletter" | "quickview">("pdf");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);

  useEffect(() => {
    if (tabFromUrl === "cover-letter" || tabFromUrl === "coverletter") {
      setActiveTab("coverletter");
    } else if (tabFromUrl === "quickview" || tabFromUrl === "bio") {
      setActiveTab("quickview");
    } else if (tabFromUrl === "pdf" || tabFromUrl === "resume") {
      setActiveTab("pdf");
    }
  }, [tabFromUrl]);

  const handleTabChange = (tab: "pdf" | "coverletter" | "quickview") => {
    setActiveTab(tab);
    const param = tab === "coverletter" ? "cover-letter" : tab;
    router.replace(`/resume?tab=${param}`, { scroll: false });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyLetter = async () => {
    const letterEl = document.getElementById("cover-letter-text");
    if (letterEl) {
      try {
        await navigator.clipboard.writeText(letterEl.innerText);
        setCopiedLetter(true);
        setTimeout(() => setCopiedLetter(false), 2500);
      } catch {
        setCopiedLetter(true);
        setTimeout(() => setCopiedLetter(false), 2500);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Top Breadcrumb & Status Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors py-1.5 px-3 rounded-lg border border-border bg-surface hover:bg-surface-elevated"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portfolio</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Available for Junior Roles &amp; Consultancies
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {activeTab === "coverletter" ? (
              <button
                onClick={handleCopyLetter}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
                title="Copy cover letter text"
              >
                {copiedLetter ? (
                  <>
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-success font-medium">Text Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
                title="Copy shareable link"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-success font-medium">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={handlePrint}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
              title="Print document"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </button>

            <a
              href={RESUME_FILE_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Open PDF</span>
            </a>

            {/* Primary Download CTA */}
            <a
              href={RESUME_FILE_PATH}
              download={RESUME_DOWNLOAD_FILENAME}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              id="download-resume-btn"
              title={`Download resume as ${RESUME_DOWNLOAD_FILENAME}`}
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
              <span className="hidden sm:inline-block text-[10px] bg-white/20 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                PDF
              </span>
            </a>
          </div>
        </div>

        {/* Header Hero Card with Segmented Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 p-5 sm:p-6 rounded-2xl border border-border bg-surface/80 backdrop-blur-sm shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 border-primary/20 shrink-0 bg-surface">
              <Image
                src="/profile.png"
                alt="Ajay Autade — DevOps, Cloud Architecture & Platform Engineering Specialist"
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                  {personalInfo.name}
                </h1>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  Verified Candidate
                </span>
              </div>
              <p className="text-sm sm:text-base text-text-secondary mt-0.5 font-medium">
                {personalInfo.title}
              </p>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-text-tertiary mt-2">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-text-tertiary" />
                  {personalInfo.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-text-tertiary" />
                  {personalInfo.secondaryEmail}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-text-tertiary" />
                  +91 {personalInfo.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Unified 3-Tab View Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex rounded-xl p-1 bg-surface-elevated border border-border">
              <button
                onClick={() => handleTabChange("pdf")}
                className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "pdf"
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Resume (PDF)</span>
              </button>
              <button
                onClick={() => handleTabChange("coverletter")}
                className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "coverletter"
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <ScrollText className="h-3.5 w-3.5" />
                <span>Cover Letter</span>
              </button>
              <button
                onClick={() => handleTabChange("quickview")}
                className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "quickview"
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Bio &amp; Skills</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab 1: Embedded PDF Document */}
        {activeTab === "pdf" && (
          <motion.div
            key="tab-pdf"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Embedded PDF Viewer Header */}
            <div className="bg-surface-elevated/70 px-4 py-3 border-b border-border flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-mono text-text-primary font-medium">
                  {RESUME_DOWNLOAD_FILENAME}
                </span>
                <span className="hidden sm:inline text-text-tertiary">
                  (Official DevOps &amp; Cloud Architecture Resume)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-text-tertiary">
                  Viewing in browser
                </span>
                <a
                  href={RESUME_FILE_PATH}
                  download={RESUME_DOWNLOAD_FILENAME}
                  className="text-primary hover:underline font-medium flex items-center gap-1"
                >
                  <Download className="h-3.5 w-3.5" />
                  Direct Download
                </a>
              </div>
            </div>

            {/* Embedded PDF Container */}
            <div className="relative w-full h-[75vh] min-h-[650px] max-h-[1100px] bg-neutral-900/5">
              <object
                data={`${RESUME_FILE_PATH}#view=FitH&toolbar=1&navpanes=0`}
                type="application/pdf"
                className="w-full h-full"
              >
                <iframe
                  src={`${RESUME_FILE_PATH}#view=FitH&toolbar=1&navpanes=0`}
                  title="Ajay Autade Resume PDF"
                  className="w-full h-full border-0"
                >
                  <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                    <FileText className="h-16 w-16 text-primary mb-4" />
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                      Resume PDF Preview
                    </h3>
                    <p className="text-sm text-text-secondary max-w-md mb-6">
                      Your browser does not support inline PDF previews. You can open the PDF directly or download it using the button below.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={RESUME_FILE_PATH}
                        download={RESUME_DOWNLOAD_FILENAME}
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download {RESUME_DOWNLOAD_FILENAME}
                      </a>
                      <a
                        href={RESUME_FILE_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline inline-flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open Raw PDF
                      </a>
                    </div>
                  </div>
                </iframe>
              </object>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Integrated Executive Cover Letter */}
        {activeTab === "coverletter" && (
          <motion.div
            key="tab-coverletter"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-10 lg:p-14 shadow-xl"
            id="cover-letter-body"
          >
            {/* Contact Info Header */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-text-secondary mb-10 pb-6 border-b border-border">
              <a
                href={`mailto:${personalInfo.secondaryEmail}`}
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                {personalInfo.secondaryEmail}
              </a>
              <a
                href={`tel:+91${personalInfo.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                +91 {personalInfo.phone}
              </a>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {personalInfo.location}
              </span>
              <a
                href="https://ajayautade.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-primary" />
                ajayautade.com
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5 text-[#0A66C2]" />
                LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5 text-text-primary" />
                GitHub
              </a>
            </div>

            {/* Letterhead Title */}
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                {personalInfo.name}
              </h2>
              <p className="mt-1 text-sm sm:text-base font-semibold text-primary">
                {personalInfo.title}
              </p>
              <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent mx-auto" />
            </div>

            {/* Cover Letter Content Body */}
            <div id="cover-letter-text" className="space-y-8 sm:space-y-10 max-w-4xl mx-auto">
              {/* Greeting & Intro */}
              <div className="space-y-4">
                <p className="text-lg font-bold text-text-primary">
                  Dear Hiring Manager &amp; Engineering Leadership,
                </p>
                <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
                  I am writing to express my strong interest in DevOps, Cloud Architecture, and Platform Engineering roles at your organization. As a computer science engineering professional with hands-on experience designing, automating, and operating cloud-native infrastructure, I am confident that my technical expertise, automation mindset, and focus on operational resilience align with your engineering team&apos;s objectives.
                </p>
              </div>

              {/* Experience Highlight Card */}
              <div className="rounded-2xl border border-border bg-surface-elevated/70 p-5 sm:p-7">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-text-primary uppercase tracking-wide">
                    Professional Experience &amp; Infrastructure Automation
                  </h3>
                </div>
                <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
                  During my tenure at <strong className="text-text-primary font-semibold">Invictus Web Solutions Pvt. Ltd.</strong>, I automated AWS infrastructure provisioning (EC2, S3, VPC, IAM) using Terraform, eliminating drift and accelerating environment bootstrapping. I containerized 4+ multi-tier applications with Docker and deployed them onto Kubernetes clusters with auto-scaling (HPA) and zero-downtime rolling updates. Additionally, I architected end-to-end CI/CD workflows using Jenkins and GitHub Actions that cut delivery cycles by <span className="text-primary font-bold">60%</span>.
                </p>
              </div>

              {/* Projects & AI/ML Initiatives */}
              <div className="rounded-2xl border border-border bg-surface-elevated/70 p-5 sm:p-7 space-y-4">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-text-primary uppercase tracking-wide">
                    Production Systems, GitOps &amp; MLOps Scale
                  </h3>
                </div>
                <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
                  My work spans robust distributed systems. In my <strong className="text-text-primary font-semibold">MLOps Sentiment Analyzer</strong> platform on AWS EKS, I created a zero-touch GitOps deployment pipeline using GitHub Actions and ArgoCD that brought deployment turnaround from <span className="text-primary font-bold">45 minutes down to ~8 minutes</span>. I engineered multi-stage Docker builds reducing image footprints by <span className="text-primary font-bold">73%</span> (3 GB → 800 MB), automated HPA pod autoscaling, and implemented custom PromQL monitoring dashboards across 9 live inference metrics.
                </p>
                <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
                  In <strong className="text-text-primary font-semibold">MoviesMonkey</strong>, I orchestrated a dual-pipeline CI/CD architecture on AWS EKS with Trivy container vulnerability scanning, ArgoCD auto-sync, and automated multi-environment deployments, ensuring that code reaching production meets stringent compliance and availability standards.
                </p>
              </div>

              {/* AI & Continuous Learning */}
              <div className="rounded-2xl border border-border bg-surface-elevated/70 p-5 sm:p-7">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-text-primary uppercase tracking-wide">
                    Continuous Learning &amp; AI Integration
                  </h3>
                </div>
                <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
                  With verified certifications in <strong className="text-text-primary font-semibold">Introduction to Artificial Intelligence (IBM)</strong> and <strong className="text-text-primary font-semibold">AI For Everyone (DeepLearning.AI)</strong>, I bridge modern DevOps engineering with AI/ML infrastructure needs — from high-throughput GPU workloads and model pipelines to real-time observability and reproducible data environments.
                </p>
              </div>

              {/* Core Strengths Grid */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-text-primary uppercase tracking-wide">
                    Key Competencies &amp; Technical Capabilities
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {strengths.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-xl border border-border bg-surface-elevated/50 p-4 hover:border-primary/40 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary mb-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-text-tertiary leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing */}
              <div className="space-y-4 pt-2">
                <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
                  I thrive in high-growth environments where infrastructure is treated as software, production releases are routine and zero-downtime, and observability provides instantaneous feedback. I welcome the opportunity to discuss how my hands-on background and engineering philosophy can accelerate your infrastructure roadmaps.
                </p>
                <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
                  Thank you for your time and consideration.
                </p>
              </div>

              {/* Sign-off */}
              <div className="border-t border-border pt-6">
                <p className="text-sm text-text-secondary mb-1">Sincerely,</p>
                <p className="text-xl font-bold text-text-primary">Ajay Autade</p>
                <p className="text-xs font-semibold text-primary mt-0.5">
                  DevOps, Cloud Architecture &amp; Platform Engineer
                </p>
              </div>
            </div>

            {/* Bottom Actions inside Cover Letter */}
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLetter}
                  className="btn-outline flex items-center gap-2 text-xs"
                >
                  {copiedLetter ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedLetter ? "Copied!" : "Copy Full Letter"}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="btn-outline flex items-center gap-2 text-xs"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Letter</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTabChange("pdf")}
                  className="btn-primary flex items-center gap-2 text-xs"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>View Resume PDF</span>
                </button>
                <Link href="/#contact" className="btn-outline flex items-center gap-2 text-xs">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Interactive Bio & Highlights */}
        {activeTab === "quickview" && (
          <motion.div
            key="tab-quickview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left 2 Cols: Summary & Experience */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-surface shadow-sm">
                <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Professional Summary
                </h2>
                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                  Results-driven DevOps &amp; Cloud Engineer with hands-on expertise in Kubernetes, Docker, and AWS infrastructure. Proficient in applying automation and cloud provisioning practices using Terraform, Ansible, and AWS to deliver robust, reproducible, and scalable production environments.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-surface shadow-sm">
                <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Key Strengths &amp; Impact
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-border bg-surface-elevated">
                    <h3 className="text-sm font-semibold text-text-primary">
                      Cloud &amp; Infrastructure as Code
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      Terraform &amp; Ansible automation on AWS (EC2, EKS, VPC, S3, IAM, ECR) with zero-drift enforcement.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-surface-elevated">
                    <h3 className="text-sm font-semibold text-text-primary">
                      Container Orchestration
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      Production Kubernetes (EKS), Docker multi-stage builds (73% size reduction), Helm charts, and HPA auto-scaling.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-surface-elevated">
                    <h3 className="text-sm font-semibold text-text-primary">
                      CI/CD &amp; GitOps Pipelines
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      Automated GitHub Actions, Jenkins &amp; ArgoCD deployments reducing deployment cycles from 45m to ~8m.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-surface-elevated">
                    <h3 className="text-sm font-semibold text-text-primary">
                      DevSecOps &amp; Observability
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      Prometheus &amp; Grafana alerting, SonarQube quality gates, and Trivy automated container security scans.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Details & Quick Download Card */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-surface text-center shadow-sm">
                <FileText className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-base font-bold text-text-primary mb-4">
                  Official PDF Resume
                </h3>

                <a
                  href={RESUME_FILE_PATH}
                  download={RESUME_DOWNLOAD_FILENAME}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>

                <button
                  onClick={() => handleTabChange("pdf")}
                  className="w-full mt-2.5 flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-border bg-surface-elevated hover:bg-surface text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Switch to PDF Viewer
                </button>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-surface shadow-sm">
                <h3 className="text-sm font-bold text-text-primary mb-3">
                  Direct Contact
                </h3>
                <div className="space-y-2.5 text-xs text-text-secondary">
                  <div className="flex items-center justify-between py-1 border-b border-border">
                    <span className="text-text-tertiary">Email:</span>
                    <a
                      href={`mailto:${personalInfo.secondaryEmail}`}
                      className="text-text-primary hover:text-primary font-medium"
                    >
                      {personalInfo.secondaryEmail}
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-border">
                    <span className="text-text-tertiary">Phone:</span>
                    <a
                      href={`tel:+91${personalInfo.phone}`}
                      className="text-text-primary hover:text-primary font-medium"
                    >
                      +91 {personalInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-border">
                    <span className="text-text-tertiary">Location:</span>
                    <span className="text-text-primary font-medium">India</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-text-tertiary">Portfolio:</span>
                    <Link
                      href="/"
                      className="text-primary hover:underline font-medium"
                    >
                      ajayautade.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
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
          #download-resume-btn {
            display: none !important;
          }
          body {
            background: white !important;
            color: #111 !important;
          }
          main {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          #cover-letter-body {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          #cover-letter-body .rounded-2xl {
            border: 1px solid #e5e7eb !important;
            background: transparent !important;
          }
        }
      `}</style>
    </div>
  );
}
