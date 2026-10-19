"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IDETyping from "./ui/IDETyping";
import ParticleNetwork from "./ui/ParticleNetwork";
import { ArrowDown, Eye, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo, stats } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

const statTranslationKeys: Record<string, string> = {
  "Dockerized Apps": "hero.statDockerized",
  "CI/CD Pipelines": "hero.statPipelines",
  "Cloud Providers": "hero.statCloud",
  "Uptime Achieved": "hero.statUptime",
};

function AnimatedCounter({ value, label, suffix = "+" }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="p-3 sm:p-4 rounded-xl bg-surface/70 border border-border/70 backdrop-blur-sm text-center transition-all hover:border-primary/40 hover:-translate-y-0.5 shadow-sm">
      <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-accent">
        {count}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs text-text-secondary font-medium mt-1 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center pt-20 sm:pt-24 pb-8 sm:pb-12"
    >
      {/* Particle network background */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleNetwork />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 my-auto py-2 sm:py-4">
        <div className="flex flex-col-reverse items-center justify-between gap-8 lg:flex-row lg:gap-10 xl:gap-14">
          {/* Left — Text Content */}
          <div className="flex-1 w-full text-center lg:text-left max-w-2xl xl:max-w-[660px]">
            <div className="flex justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 backdrop-blur-sm px-3.5 py-1.5 shadow-sm animate-glow-pulse"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="text-xs font-semibold text-text-primary">
                  Available for Junior Roles &amp; Consultancies
                </span>
                <span className="text-text-tertiary hidden sm:inline">•</span>
                <span className="text-text-secondary text-[11px] hidden sm:inline">
                  Worldwide Remote Availability
                </span>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-text-primary leading-[1.15] text-center lg:text-left"
            >
              <span className="block">
                {t("hero.greeting")}{" "}
                <span className="gradient-text">{personalInfo.name}</span>
              </span>
              <span className="block mt-2 text-base sm:text-lg lg:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-accent tracking-tight">
                DevOps, Cloud Architecture &amp; Platform Engineering
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Mobile: show short bio text */}
              <p className="block sm:hidden mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-text-secondary mx-auto lg:mx-0">
                Architecting resilient AWS cloud infrastructure, Kubernetes orchestration, zero-downtime CI/CD pipelines, and high-performance digital systems for technology teams worldwide.
              </p>
              {/* Desktop: show IDE typing animation */}
              <IDETyping />
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start items-center"
            >
              <a 
                href="#projects" 
                className="btn-primary flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/35"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector("#projects");
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                <Eye className="h-4 w-4" />
                <span>Explore Projects</span>
              </a>

              <Link 
                href="/services" 
                className="btn-outline border-primary/40 bg-surface/60 text-text-primary hover:bg-primary/10 hover:border-primary flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Engineering Services</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 sm:mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 border-t border-border pt-5"
            >
              {stats.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  label={t(statTranslationKeys[stat.label] || stat.label)}
                  suffix={stat.label === "Uptime Achieved" ? "%" : "+"}
                />
              ))}
            </motion.div>
          </div>

          {/* Right — Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-shrink-0 animate-float"
          >
            <div className="relative h-60 w-60 sm:h-72 sm:w-72 lg:h-[350px] lg:w-[350px] xl:h-[390px] xl:w-[390px] group">
              {/* Outer halo ring matching user's circular annotation */}
              <div className="absolute -inset-4 sm:-inset-6 lg:-inset-7 rounded-full border-2 border-white/20 dark:border-white/25 pointer-events-none shadow-[0_0_25px_rgba(59,130,246,0.15)]" />

              {/* Subtle animated glowing background */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/30 via-indigo-500/20 to-accent/25 opacity-40 blur-2xl group-hover:opacity-65 transition-opacity duration-500" />
              
              {/* Gradient border */}
              <div className="relative h-full w-full rounded-full p-[3px] bg-gradient-to-br from-primary via-indigo-500 to-accent shadow-2xl">
                {/* Image container */}
                <div className="relative h-full w-full rounded-full overflow-hidden bg-surface">
                  <Image
                    src="/profile.png"
                    alt={`${personalInfo.name} - DevOps & Cloud Architecture Specialist`}
                    fill
                    sizes="(max-width: 768px) 240px, (max-width: 1024px) 300px, 390px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 hidden sm:block pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] text-text-tertiary">{t("hero.scroll")}</span>
          <ArrowDown className="h-3 w-3 text-text-tertiary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
