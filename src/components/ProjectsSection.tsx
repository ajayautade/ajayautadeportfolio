"use client";

import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import { projects } from "@/lib/data";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Featured Projects"
            subtitle="Real-world projects showcasing DevOps and development skills"
          />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.15}>
              <div className="glass-card group flex h-full flex-col gradient-border">
                {/* Image Placeholder */}
                <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-transparent p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-glass-bg to-transparent" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                        <GithubIcon className="h-5 w-5" />
                      </div>
                      {project.featured && (
                        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-text-primary">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6 pt-4">
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                    {project.longDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-auto flex gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex-1 justify-center text-sm py-2"
                    >
                      <GithubIcon className="h-4 w-4" />
                      Source Code
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex-1 justify-center text-sm py-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Projects */}
        <ScrollReveal>
          <div className="mt-12 text-center">
            <a
              href="https://github.com/ajayautade?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <GithubIcon className="h-4 w-4" />
              View All Projects on GitHub
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
