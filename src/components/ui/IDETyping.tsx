"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const codeLines = [
  { text: "apiVersion: apps/v1", color: "text-blue-400" },
  { text: "kind: Deployment", color: "text-purple-400" },
  { text: "metadata:", color: "text-text-primary" },
  { text: "  name: ajay-portfolio", color: "text-green-400" },
  { text: "spec:", color: "text-text-primary" },
  { text: "  replicas: 3", color: "text-orange-400" },
  { text: "  template:", color: "text-text-primary" },
  { text: "    spec:", color: "text-text-primary" },
  { text: "      containers:", color: "text-text-primary" },
  { text: "      - name: frontend", color: "text-green-400" },
  { text: "        image: ajay/portfolio:latest", color: "text-accent" },
];

export default function IDETyping() {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; color: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) return;

    const currentLine = codeLines[currentLineIndex];
    
    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
        
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push({ text: currentLine.text[currentCharIndex], color: currentLine.color });
          } else {
            newLines[currentLineIndex].text = currentLine.text.substring(0, currentCharIndex + 1);
          }
          return newLines;
        });
      }, 30); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 150); // Pause between lines
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 mt-6 rounded-xl overflow-hidden border border-border bg-[#0d0d0d] shadow-2xl font-mono text-xs sm:text-sm text-left">
      {/* IDE Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-[#1a1a1a]">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="ml-2 flex gap-3 text-[10px] text-text-tertiary">
          <span className="text-text-secondary bg-white/5 px-2 py-0.5 rounded">deploy.yaml</span>
          <span className="px-2 py-0.5">main.tf</span>
        </div>
      </div>
      
      {/* IDE Body */}
      <div className="p-4 relative min-h-[180px]">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex leading-relaxed">
            <span className="w-6 text-text-tertiary select-none opacity-50">{i + 1}</span>
            <span className={`${line.color} whitespace-pre`}>{line.text}</span>
          </div>
        ))}
        {/* Blinking Cursor */}
        {currentLineIndex < codeLines.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute h-4 w-2 bg-text-primary mt-1"
            style={{ 
              top: `calc(1rem + ${currentLineIndex * 1.5}rem)`, 
              left: `calc(1rem + 1.5rem + ${currentCharIndex * 0.5}rem)` // Approximation for cursor position
            }}
          />
        )}
      </div>
    </div>
  );
}
