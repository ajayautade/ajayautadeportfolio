"use client";

import { FileText, Download } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

export default function ResumeSection() {
  return (
    <section id="resume" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-1">
            <div className="glass-card rounded-xl hover:transform-none">
              <div className="relative overflow-hidden px-8 py-16 text-center sm:px-16">
                {/* Background Decorations */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
                </div>

                <div className="relative z-10">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-card-hover text-primary">
                    <FileText className="h-8 w-8" />
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    <span className="gradient-text">Download My Resume</span>
                  </h2>

                  <p className="mx-auto mt-4 max-w-md text-base text-text-secondary">
                    Get a detailed overview of my skills, experience, projects,
                    and education in a professional format.
                  </p>

                  <div className="mt-8">
                    <a href="/resume.pdf" download className="btn-primary text-base px-8 py-3">
                      <Download className="h-5 w-5" />
                      Download Resume (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
