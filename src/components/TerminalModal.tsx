"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";
import { personalInfo, skillCategories } from "@/lib/data";
import { services } from "@/lib/services";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output: (
        <div>
          <p className="text-success">Welcome to {personalInfo.name.toLowerCase()} OS v1.0.0</p>
          <p className="text-text-tertiary">Type &apos;help&apos; to see available commands.</p>
        </div>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Scroll within the terminal body only — no page scroll
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = "";

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="flex flex-col gap-1">
            <p>Available commands:</p>
            <p className="text-text-tertiary"><span className="text-text-primary font-medium">whoami</span>    - Display information about me</p>
            <p className="text-text-tertiary"><span className="text-text-primary font-medium">skills</span>    - List my technical skills</p>
            <p className="text-text-tertiary"><span className="text-text-primary font-medium">services</span>  - Engineering practices &amp; consulting</p>
            <p className="text-text-tertiary"><span className="text-text-primary font-medium">contact</span>   - Show contact information</p>
            <p className="text-text-tertiary"><span className="text-text-primary font-medium">clear</span>     - Clear the terminal screen</p>
          </div>
        );
        break;
      case "services":
        output = (
          <div className="flex flex-col gap-1">
            <p className="text-text-primary font-medium">Services:</p>
            {services.map((service) => (
              <p key={service.id} className="text-text-secondary">
                • {service.title}
              </p>
            ))}
            <p className="text-text-tertiary mt-1">
              Details and pricing:{" "}
              <Link href="/services" className="text-primary underline">
                /services
              </Link>{" "}
              <Link href="/pricing" className="text-primary underline">
                /pricing
              </Link>
            </p>
          </div>
        );
        break;
      case "whoami":
        output = (
          <div>
            <p className="text-text-primary font-medium">{personalInfo.name}</p>
            <p>{personalInfo.title}</p>
            <p className="text-text-tertiary mt-2">{personalInfo.shortBio}</p>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="flex flex-col gap-2">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <span className="text-text-primary">{category.title}:</span>{" "}
                <span className="text-text-tertiary">
                  {category.skills.map(s => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        );
        break;
      case "contact":
        output = (
          <div>
            <p><span className="text-text-tertiary">Primary Email:</span> <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a></p>
            <p><span className="text-text-tertiary">Secondary Email:</span> <a href={`mailto:${personalInfo.secondaryEmail}`} className="hover:underline">{personalInfo.secondaryEmail}</a></p>
            <p><span className="text-text-tertiary">Phone:</span> <a href={`tel:+91${personalInfo.phone}`} className="hover:underline">+91 {personalInfo.phone}</a></p>
            <p><span className="text-text-tertiary">LinkedIn:</span> <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">{personalInfo.linkedin}</a></p>
            <p><span className="text-text-tertiary">GitHub:</span> <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">{personalInfo.github}</a></p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        return;
      case "":
        break;
      default:
        output = <p className="text-text-secondary"><span className="text-text-quaternary">zsh:</span> Command not found: {trimmedCmd}. Type &apos;help&apos; for available commands.</p>;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="panel fixed left-1/2 top-4 sm:top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 sm:-translate-y-1/2 overflow-hidden !bg-bg !border-border-strong font-mono text-[13px] leading-relaxed text-text-secondary"
          >
            {/* Header bar with macOS traffic lights & ESC indicator */}
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-border-strong cursor-pointer hover:bg-text-quaternary transition-colors" onClick={onClose} title="Close" />
                  <div className="h-3 w-3 rounded-full bg-border-strong" />
                  <div className="h-3 w-3 rounded-full bg-border-strong" />
                </div>
                <div className="flex items-center gap-1.5 pl-2 border-l border-border">
                  <TerminalIcon className="h-3.5 w-3.5 text-text-tertiary" />
                  <span className="text-xs font-mono text-text-tertiary">ajay@cloud-engine ~ zsh</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-surface-elevated px-1.5 py-0.5 text-xs font-mono text-text-tertiary">
                  esc
                </kbd>
                <button
                  onClick={onClose}
                  className="-my-1.5 -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-surface-elevated transition-colors"
                  aria-label="Close terminal"
                >
                  <X className="h-3.5 w-3.5 text-text-tertiary" />
                </button>
              </div>
            </div>

            {/* Terminal body */}
            <div 
              ref={terminalBodyRef}
              className="h-[45dvh] sm:h-[55dvh] max-h-[480px] overflow-y-auto p-4 sm:p-6 overscroll-contain"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, index) => (
                <div key={index} className="mb-4">
                  {item.command && (
                    <div className="flex items-center gap-2 text-text-primary">
                      <span className="text-success">➜</span>
                      <span className="text-primary">~</span>
                      <span>{item.command}</span>
                    </div>
                  )}
                  <div className="mt-1">{item.output}</div>
                </div>
              ))}

              <div className="flex items-center gap-2 text-text-primary">
                <span className="text-success">➜</span>
                <span className="text-primary">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  /* font-size 16px prevents iOS Safari from zooming in on focus */
                  className="flex-1 bg-transparent outline-none ring-0 border-none p-0 focus:ring-0 text-[16px] sm:text-sm"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
