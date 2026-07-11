"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IDETyping from "./ui/IDETyping";
import ParticleNetwork from "./ui/ParticleNetwork";
import { ArrowDown, FileText, Eye } from "lucide-react";
import Image from "next/image";
import { personalInfo, stats } from "@/lib/data";

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
    <div className="text-center">
      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{count}{suffix}</div>
      <div className="text-[10px] sm:text-xs text-text-secondary mt-1">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center"
    >
      {/* Particle network background */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleNetwork />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 section-container w-full py-12 sm:py-20">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left — Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-xs font-medium text-text-secondary">
                Open to opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-2 text-lg font-medium text-text-secondary sm:text-xl"
            >
              {personalInfo.title}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Mobile: show short bio text */}
              <p className="block sm:hidden mt-4 max-w-md text-sm leading-relaxed text-text-secondary mx-auto lg:mx-0">
                {personalInfo.shortBio}
              </p>
              {/* Desktop: show IDE typing animation */}
              <IDETyping />
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a 
                href="#projects" 
                className="btn-primary"
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
                View Projects
              </a>
              <a href="/resume.pdf" download="Ajay_Autade_DevOps_Engineer_Resume.pdf" className="btn-outline">
                <FileText className="h-4 w-4" />
                Download Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 border-t border-border pt-6"
            >
              {stats.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
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
            className="flex-shrink-0"
          >
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 lg:h-72 lg:w-72 group">
              {/* Animated glowing background */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Gradient border */}
              <div className="relative h-full w-full rounded-full p-[4px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                {/* Image container */}
                <div className="relative h-full w-full rounded-full overflow-hidden bg-surface">
                  <Image
                    src="/profile.png"
                    alt={personalInfo.name}
                    fill
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 288px"
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] text-text-tertiary">Scroll</span>
          <ArrowDown className="h-3 w-3 text-text-tertiary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
