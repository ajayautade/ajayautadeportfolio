"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { personalInfo } from "@/lib/data";

const RESUME_FILE_PATH = "/ajay_autade_devops_9545034120.pdf";
const RESUME_DOWNLOAD_FILENAME = "ajay_autade_devops_9545034120.pdf";

export default function ResumeClient() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"pdf" | "quickview">("pdf");

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
              Available for Roles
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
              title="Copy shareable link to this resume"
            >
              {copied ? (
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

            <button
              onClick={handlePrint}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
              title="Print resume"
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

        {/* Header Hero Card */}
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
                alt="Ajay Autade"
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
                  Verified Resume
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

          {/* Quick Stats & View Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex rounded-lg p-1 bg-surface-elevated border border-border">
              <button
                onClick={() => setActiveTab("pdf")}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === "pdf"
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>PDF Document</span>
              </button>
              <button
                onClick={() => setActiveTab("quickview")}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === "quickview"
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Highlights & Bio</span>
              </button>
            </div>

            <a
              href={RESUME_FILE_PATH}
              download={RESUME_DOWNLOAD_FILENAME}
              className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-surface hover:bg-surface-elevated border border-border text-text-primary hover:border-primary/50 transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-primary" />
              <span>Save as PDF</span>
            </a>
          </div>
        </motion.div>

        {/* Main Resume Content Area */}
        {activeTab === "pdf" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
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
                  (Single-Page Compact DevOps Resume)
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
                {/* Fallback iframe for browsers that don't support object tag */}
                <iframe
                  src={`${RESUME_FILE_PATH}#view=FitH&toolbar=1&navpanes=0`}
                  title="Ajay Autade Resume PDF"
                  className="w-full h-full border-0"
                >
                  {/* Ultimate fallback if neither object nor iframe renders PDF (e.g. older mobile browsers) */}
                  <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                    <FileText className="h-16 w-16 text-primary mb-4" />
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                      Resume PDF Preview
                    </h3>
                    <p className="text-sm text-text-secondary max-w-md mb-6">
                      Your browser does not support inline PDF previews. You can
                      open the PDF directly or download it using the button
                      below.
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
        ) : (
          /* Highlights & Bio Tab */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left 2 Cols: Summary & Experience */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-surface">
                <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Professional Summary
                </h2>
                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                  Results-driven DevOps & Cloud Engineer with hands-on expertise
                  in Kubernetes, Docker, and AWS infrastructure. Proficient in
                  applying automation and cloud provisioning practices using
                  Terraform, Ansible, and AWS to deliver robust, reproducible,
                  and scalable production environments.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-surface">
                <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Key Strengths & Impact
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-border bg-surface-elevated">
                    <h3 className="text-sm font-semibold text-text-primary">
                      Cloud & Infrastructure as Code
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      Terraform & Ansible automation on AWS (EC2, EKS, VPC, S3,
                      IAM, ECR) with zero-drift enforcement.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-surface-elevated">
                    <h3 className="text-sm font-semibold text-text-primary">
                      Container Orchestration
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      Production Kubernetes (EKS), Docker multi-stage builds (73%
                      size reduction), Helm charts, and HPA auto-scaling.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-surface-elevated">
                    <h3 className="text-sm font-semibold text-text-primary">
                      CI/CD & GitOps Pipelines
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      Automated GitHub Actions, Jenkins & ArgoCD deployments
                      reducing deployment cycles from 45m to ~8m.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-surface-elevated">
                    <h3 className="text-sm font-semibold text-text-primary">
                      DevSecOps & Observability
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      Prometheus & Grafana alerting, SonarQube quality gates,
                      and Trivy automated container security scans.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Details & Quick Download Card */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-surface text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-base font-bold text-text-primary">
                  Official PDF Resume
                </h3>
                <p className="text-xs text-text-secondary mt-1 mb-5">
                  Formatted specifically for recruiters and ATS systems with
                  single-page layout.
                </p>

                <a
                  href={RESUME_FILE_PATH}
                  download={RESUME_DOWNLOAD_FILENAME}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>

                <button
                  onClick={() => setActiveTab("pdf")}
                  className="w-full mt-2.5 flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-border bg-surface-elevated hover:bg-surface text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Switch to PDF Viewer
                </button>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-surface">
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
    </div>
  );
}
