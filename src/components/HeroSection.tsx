"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Eye } from "lucide-react";
import { personalInfo, terminalCommands, stats } from "@/lib/data";

function TerminalAnimation() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const command = terminalCommands[currentLine % terminalCommands.length];
    let charIndex = 0;

    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (charIndex <= command.length) {
          setDisplayText(command.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
            setIsTyping(true);
          }, 2000);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [currentLine, isTyping]);

  const previousLines = terminalCommands
    .slice(0, currentLine % terminalCommands.length)
    .slice(-3);

  return (
    <div className="glass-card overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 border-b border-glass-border px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-text-tertiary">
          ajay@devops ~ terminal
        </span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 space-y-1 min-h-[140px]">
        {previousLines.map((line, i) => (
          <div key={i} className="text-text-tertiary text-xs sm:text-sm">
            {line}
          </div>
        ))}
        <div className="flex items-center text-accent text-xs sm:text-sm">
          <span>{displayText}</span>
          <span className="terminal-cursor ml-0.5 inline-block h-4 w-2 bg-accent" />
        </div>
      </div>
    </div>
  );
}

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
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
      <div className="text-2xl font-bold text-primary sm:text-3xl">{count}+</div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-sm text-text-secondary">
                Open to opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-3 text-xl font-semibold text-text-secondary sm:text-2xl"
            >
              {personalInfo.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-text-tertiary sm:text-lg"
            >
              {personalInfo.shortBio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a href="#projects" className="btn-primary">
                <Eye className="h-4 w-4" />
                View Projects
              </a>
              <a href="/resume.pdf" download className="btn-outline">
                <FileText className="h-4 w-4" />
                Download Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-12 grid grid-cols-2 sm:flex sm:flex-row gap-6 sm:gap-8 border-t border-border pt-8"
            >
              {stats.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </div>

          {/* Right - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <TerminalAnimation />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-text-tertiary">Scroll Down</span>
          <ArrowDown className="h-4 w-4 text-text-tertiary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
