"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  Copy,
  Check,
  Search,
  Briefcase,
  Shield,
  Cloud,
  GitBranch,
  AlertTriangle,
  Users,
  Tag,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  technicalQuestions,
  qaCategories,
  type QACategory,
  type TechnicalQA,
} from "@/lib/technicalQuestionsData";

const categoryIcons: Record<string, React.ElementType> = {
  All: Briefcase,
  "Cloud & Architecture": Cloud,
  "Kubernetes & Security": Shield,
  "CI/CD & DevSecOps": GitBranch,
  "Incidents & Reliability": AlertTriangle,
  "Career & Culture": Users,
};

function QACard({
  qa,
  isExpanded,
  onToggle,
}: {
  qa: TechnicalQA;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Q: ${qa.question}\n\nA: ${qa.answer}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div
        className={`card relative overflow-hidden ${
          isExpanded ? "!bg-surface-elevated !border-border-strong" : ""
        }`}
      >

        {/* Question header — always visible */}
        <button
          onClick={onToggle}
          className="relative z-10 w-full text-left p-5 sm:p-6 flex items-start gap-3 sm:gap-4 cursor-pointer"
          aria-expanded={isExpanded}
        >
          {/* Category badge */}
          <span className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-surface-elevated border border-border text-text-secondary">
            {(() => {
              const Icon = categoryIcons[qa.category] || Briefcase;
              return <Icon className="h-4 w-4" />;
            })()}
          </span>

          <div className="flex-1 min-w-0">
            {/* Category label */}
            <span className="inline-block type-eyebrow text-text-tertiary mb-1.5">
              {qa.category}
            </span>

            {/* Question text */}
            <h3 className="text-base font-medium tracking-tight text-text-primary leading-snug pr-8">
              {qa.question}
            </h3>

            {/* Tech tags — compact preview when collapsed */}
            {!isExpanded && (
              <div className="mt-2 flex flex-wrap gap-1">
                {qa.techTags.slice(0, 4).map((tag) => (
                  <span key={tag} className="tech-pill">
                    {tag}
                  </span>
                ))}
                {qa.techTags.length > 4 && (
                  <span className="text-xs text-text-tertiary font-medium px-1 self-center">
                    +{qa.techTags.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Expand chevron */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 mt-1"
          >
            <ChevronDown className="h-4 w-4 text-text-tertiary" />
          </motion.div>
        </button>

        {/* Answer body — collapsible */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="relative z-10 px-5 sm:px-6 pb-5 sm:pb-6">
                {/* Divider */}
                <div className="h-px bg-border mb-5" />

                {/* Answer text */}
                <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                  {qa.answer}
                </div>

                {/* Metrics */}
                {qa.metrics && qa.metrics.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {qa.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="inline-flex items-center gap-1.5 rounded-sm bg-surface border border-border px-2.5 py-0.5 text-xs font-medium text-text-secondary"
                      >
                        <BarChart3 className="h-3 w-3 text-success" />
                        {metric}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tech tags — full list */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-text-tertiary mt-0.5 mr-0.5" />
                  {qa.techTags.map((tag) => (
                    <span key={tag} className="tech-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer actions */}
                <div className="mt-5 flex items-center justify-between">
                  {/* Project reference */}
                  {qa.projectRef && (
                    <a
                      href="#projects"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById("projects");
                        if (el) {
                          const y =
                            el.getBoundingClientRect().top +
                            window.scrollY -
                            80;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-light transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      See project: {qa.projectRef}
                    </a>
                  )}

                  {/* Copy button */}
                  <button
                    onClick={handleCopy}
                    className={`ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                      copied
                        ? "border border-border bg-surface text-success"
                        : "border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy Answer
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function TechnicalQASection() {
  const [activeCategory, setActiveCategory] = useState<QACategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredQuestions = useMemo(() => {
    let result: TechnicalQA[] = technicalQuestions;

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((q) => q.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query) ||
          q.techTags.some((tag) => tag.toLowerCase().includes(query)) ||
          q.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <section id="screening" className="py-16 sm:py-24 border-t border-border">
      <div className="section-container">
        <h2 className="type-display-md text-text-primary text-balance">Screening questions, answered</h2>
        <p className="mt-4 mb-10 max-w-2xl type-body-lg text-text-secondary text-pretty">
          How I would answer common DevOps interview questions. Where an answer draws on something I built, it
          says so; the rest is how I understand the topic and would approach it.
        </p>

        {/* Category Tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {qaCategories.map((category) => {
              const Icon = categoryIcons[category] || Briefcase;
              const isActive = activeCategory === category;
              const count =
                category === "All"
                  ? technicalQuestions.length
                  : technicalQuestions.filter((q) => q.category === category)
                      .length;

              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setExpandedId(null);
                  }}
                  className={`inline-flex min-h-11 items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer border ${
                    isActive
                      ? "bg-surface-elevated text-text-primary border-border-strong"
                      : "bg-transparent text-text-tertiary hover:text-text-primary border-transparent"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {category}
                  <span
                    className={`ml-0.5 text-xs tabular-nums ${
                      isActive ? "text-text-tertiary" : "text-text-quaternary"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

        {/* Search */}
          <div className="relative max-w-xl mb-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              aria-label="Search questions"
              placeholder="Search questions, tools or topics"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-11 rounded-lg border border-border bg-surface py-2 pl-10 pr-4 text-base sm:text-sm text-text-primary placeholder:text-text-quaternary focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            />
            {searchQuery && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-text-tertiary">
                {filteredQuestions.length} result
                {filteredQuestions.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

        {/* Questions grid */}
        <div className="space-y-3 max-w-5xl">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((qa) => (
                <QACard
                  key={qa.id}
                  qa={qa}
                  isExpanded={expandedId === qa.id}
                  onToggle={() =>
                    setExpandedId(expandedId === qa.id ? null : qa.id)
                  }
                />
            ))}
          </AnimatePresence>

          {filteredQuestions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="h-8 w-8 text-text-tertiary mx-auto mb-3" />
              <p className="text-sm text-text-secondary">
                No questions match your search. Try a different keyword.
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer summary */}
          <div className="mt-10">
            <p className="text-xs text-text-tertiary">
              {technicalQuestions.length} questions answered
            </p>
          </div>
      </div>
    </section>
  );
}
