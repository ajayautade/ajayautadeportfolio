"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";
import { personalInfo, skillCategories } from "@/lib/data";

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
          <p className="text-text-tertiary">Type 'help' to see available commands.</p>
        </div>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

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
            <p className="text-text-tertiary"><span className="text-accent font-medium">whoami</span>  - Display information about me</p>
            <p className="text-text-tertiary"><span className="text-accent font-medium">skills</span>  - List my technical skills</p>
            <p className="text-text-tertiary"><span className="text-accent font-medium">resume</span>  - Download my resume</p>
            <p className="text-text-tertiary"><span className="text-accent font-medium">contact</span> - Show contact information</p>
            <p className="text-text-tertiary"><span className="text-accent font-medium">clear</span>   - Clear the terminal screen</p>
          </div>
        );
        break;
      case "whoami":
        output = (
          <div>
            <p className="text-primary font-medium">{personalInfo.name}</p>
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
                <span className="text-primary">{category.title}:</span>{" "}
                <span className="text-text-tertiary">
                  {category.skills.map(s => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        );
        break;
      case "resume":
        // Trigger download
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Ajay_Autade_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        output = <p className="text-success">Downloading resume...</p>;
        break;
      case "contact":
        output = (
          <div>
            <p><span className="text-accent">Email:</span> <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a></p>
            <p><span className="text-accent">LinkedIn:</span> <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">{personalInfo.linkedin}</a></p>
            <p><span className="text-accent">GitHub:</span> <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">{personalInfo.github}</a></p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        return;
      case "":
        break;
      default:
        output = <p className="text-red-400">Command not found: {trimmedCmd}. Type 'help' for available commands.</p>;
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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-[#09090b] shadow-2xl font-mono text-sm sm:text-base text-gray-300"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#18181b] px-4 py-3">
              <div className="flex items-center gap-2">
                <TerminalIcon className="h-4 w-4 text-text-tertiary" />
                <span className="text-xs font-medium text-text-tertiary">ajay@portfolio ~ zsh</span>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-2 hover:bg-white/10 transition-colors"
                aria-label="Close terminal"
              >
                <X className="h-4 w-4 text-text-tertiary" />
              </button>
            </div>

            {/* Terminal body */}
            <div 
              ref={terminalBodyRef}
              className="h-[55dvh] max-h-[480px] overflow-y-auto p-4 sm:p-6 overscroll-contain"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, index) => (
                <div key={index} className="mb-4">
                  {item.command && (
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-accent">➜</span>
                      <span className="text-primary">~</span>
                      <span>{item.command}</span>
                    </div>
                  )}
                  <div className="mt-1">{item.output}</div>
                </div>
              ))}

              <div className="flex items-center gap-2 text-white">
                <span className="text-accent">➜</span>
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
