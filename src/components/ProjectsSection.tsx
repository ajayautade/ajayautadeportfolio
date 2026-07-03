"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { projects, personalInfo } from "@/lib/data";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85 + 12; // card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, projects.length - 1));
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
    <section id="projects" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title="Featured Projects"
            subtitle="Real-world projects showcasing DevOps and development skills"
          />
        </ScrollReveal>

        {/* Mobile: Horizontal swipeable carousel */}
        <div className="sm:hidden">
          <ScrollReveal>
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-5 px-5"
              style={{
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="card flex flex-col p-4 snap-center shrink-0"
                  style={{ width: "85%" }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-elevated text-text-secondary">
                      <GithubIcon className="h-4 w-4" />
                    </div>
                    {project.featured && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-semibold text-text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary flex-1">
                    {project.longDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-4 flex gap-2 pt-4 border-t border-border">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex-1 text-xs py-2"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      Source
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex-1 text-xs py-2"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-text-tertiary/40"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Desktop: Grid layout (unchanged) */}
        <div className="hidden sm:grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <div className="card flex h-full flex-col p-4 sm:p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-elevated text-text-secondary">
                    <GithubIcon className="h-4 w-4" />
                  </div>
                  {project.featured && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-semibold text-text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary flex-1">
                  {project.longDescription}
                </p>

                {/* Tech Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-4 flex gap-2 pt-4 border-t border-border">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex-1 text-xs py-2"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    Source
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 text-xs py-2"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All */}
        <ScrollReveal>
          <div className="mt-10 text-center">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              <GithubIcon className="h-4 w-4" />
              View All on GitHub
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
