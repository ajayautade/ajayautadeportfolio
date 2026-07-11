"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { earnedCertificates } from "@/lib/data";

const INITIAL_SHOW_COUNT = 6;

/* ── Platform Logo SVGs ── */

function CourseraLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm13.8 70.5c-4 2.3-8.6 3.6-13.8 3.6-14.7 0-26.7-11.9-26.7-26.7S35.3 20.8 50 20.8c5.2 0 9.8 1.3 13.8 3.6l-6.9 12c-2-1.2-4.4-1.8-6.9-1.8-7.5 0-13.5 6.1-13.5 13.5s6.1 13.5 13.5 13.5c2.5 0 4.9-.6 6.9-1.8l6.9 12z" />
    </svg>
  );
}

function UdemyLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 260" fill="currentColor" className={className}>
      <path d="M130 0C58.2 0 0 58.2 0 130s58.2 130 130 130 130-58.2 130-130S201.8 0 130 0zm-30 80v60c0 16.6 13.4 30 30 30s30-13.4 30-30V80h25v60c0 30.3-24.7 55-55 55s-55-24.7-55-55V80h25z" />
    </svg>
  );
}

function DefaultPlatformLogo({ className }: { className?: string }) {
  return <Award className={className} />;
}

const platformConfig: Record<
  string,
  {
    Logo: React.FC<{ className?: string }>;
    color: string;
    gradientFrom: string;
    gradientTo: string;
    label: string;
  }
> = {
  coursera: {
    Logo: CourseraLogo,
    color: "text-[#0056D2]",
    gradientFrom: "from-[#0056D2]/60",
    gradientTo: "to-[#0056D2]/10",
    label: "Coursera",
  },
  udemy: {
    Logo: UdemyLogo,
    color: "text-[#A435F0]",
    gradientFrom: "from-[#A435F0]/60",
    gradientTo: "to-[#A435F0]/10",
    label: "Udemy",
  },
  aws: {
    Logo: DefaultPlatformLogo,
    color: "text-[#FF9900]",
    gradientFrom: "from-[#FF9900]/60",
    gradientTo: "to-[#FF9900]/10",
    label: "AWS",
  },
  linkedin: {
    Logo: DefaultPlatformLogo,
    color: "text-[#0A66C2]",
    gradientFrom: "from-[#0A66C2]/60",
    gradientTo: "to-[#0A66C2]/10",
    label: "LinkedIn Learning",
  },
  google: {
    Logo: DefaultPlatformLogo,
    color: "text-[#4285F4]",
    gradientFrom: "from-[#4285F4]/60",
    gradientTo: "to-[#4285F4]/10",
    label: "Google",
  },
  other: {
    Logo: DefaultPlatformLogo,
    color: "text-primary",
    gradientFrom: "from-primary/60",
    gradientTo: "to-primary/10",
    label: "Certificate",
  },
};

/* ── Certificate Card ── */

function CertificateCard({
  cert,
}: {
  cert: (typeof earnedCertificates)[number];
}) {
  const config = platformConfig[cert.platform] || platformConfig.other;
  const { Logo } = config;

  return (
    <div className="card flex flex-col p-4 sm:p-5 group relative overflow-hidden h-full">
      {/* Top gradient accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo}`}
      />

      {/* Platform logo + badge */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-surface-elevated ${config.color} transition-transform duration-300 group-hover:scale-110`}
        >
          <Logo className="h-5 w-5" />
        </div>
        <span className="rounded-full bg-surface-elevated px-2.5 py-0.5 text-[10px] font-medium text-text-tertiary border border-border">
          {config.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">
        {cert.name}
      </h3>

      {/* Issuer */}
      <p className="mt-1 text-xs text-text-tertiary">{cert.issuer}</p>

      {/* Date badge */}
      <div className="mt-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Earned {cert.date}
        </span>
      </div>

      {/* Spacer to push the bottom content down */}
      <div className="flex-1" />

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {cert.skills.map((skill) => (
          <span key={skill} className="tech-pill">
            {skill}
          </span>
        ))}
      </div>

      {/* Verify button */}
      <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex-1 text-xs py-2 gap-1.5"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Verify Credential
        </a>
        <span className="flex items-center gap-1 text-[10px] text-text-tertiary">
          <Calendar className="h-3 w-3" />
          ID: {cert.credentialId}
        </span>
      </div>
    </div>
  );
}

/* ── Main Section ── */

export default function CertificatesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const hasMore = earnedCertificates.length > INITIAL_SHOW_COUNT;
  const hiddenCount = earnedCertificates.length - INITIAL_SHOW_COUNT;

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85 + 12;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, earnedCertificates.length - 1));
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToCard = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth * 0.85 + 12;
    container.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };

  return (
    <section id="certificates" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title="Certificates & Credentials"
            subtitle="Verified course completions from leading learning platforms"
          />
        </ScrollReveal>

        {/* Mobile: Horizontal swipeable carousel (all certs) */}
        <div className="sm:hidden">
          <ScrollReveal>
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-5 px-5 hide-scrollbar"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {earnedCertificates.map((cert) => (
                <div
                  key={cert.credentialId}
                  className="snap-center shrink-0"
                  style={{ width: "85%" }}
                >
                  <CertificateCard cert={cert} />
                </div>
              ))}
            </div>
            {/* Compact page indicator for mobile */}
            <div className="flex items-center justify-center gap-3 mt-3">
              {/* Prev/Next tap arrows */}
              <button
                onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-tertiary disabled:opacity-30 transition-opacity"
                aria-label="Previous certificate"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M10.5 3L6 8l4.5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <span className="text-xs font-medium text-text-tertiary tabular-nums">
                {activeIndex + 1} <span className="text-text-tertiary/50">/</span> {earnedCertificates.length}
              </span>
              <button
                onClick={() => scrollToCard(Math.min(earnedCertificates.length - 1, activeIndex + 1))}
                disabled={activeIndex === earnedCertificates.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-tertiary disabled:opacity-30 transition-opacity"
                aria-label="Next certificate"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M5.5 3L10 8l-4.5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Desktop: Grid layout with show more/less */}
        <div className="hidden sm:block">
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Always-visible first batch */}
            {earnedCertificates.slice(0, INITIAL_SHOW_COUNT).map((cert, index) => (
              <ScrollReveal key={cert.credentialId} delay={index * 0.08}>
                <CertificateCard cert={cert} />
              </ScrollReveal>
            ))}

            {/* Animated reveal for extra cards */}
            <AnimatePresence>
              {showAll &&
                earnedCertificates.slice(INITIAL_SHOW_COUNT).map((cert, index) => (
                  <motion.div
                    key={cert.credentialId}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
                  >
                    <CertificateCard cert={cert} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Show More / Show Less toggle */}
          {hasMore && (
            <ScrollReveal>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-2.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/5"
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                      Show {hiddenCount} More Certificates
                    </>
                  )}
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Summary bar */}
        <ScrollReveal>
          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm">
                <span className="font-semibold text-text-primary">
                  {earnedCertificates.length} Certificates
                </span>
                <span className="text-text-tertiary"> · All verified & validated</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
