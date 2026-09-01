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
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";
import {
  technicalQuestions,
  qaCategories,
  type QACategory,
  type TechnicalQA,
} from "@/lib/technicalQuestionsData";
import { useLanguage } from "@/lib/LanguageContext";

const categoryIcons: Record<string, React.ElementType> = {
  All: Briefcase,
  "Cloud & Architecture": Cloud,
  "Kubernetes & Security": Shield,
  "CI/CD & DevSecOps": GitBranch,
  "Incidents & Reliability": AlertTriangle,
  "Career & Culture": Users,
};

const categoryColors: Record<string, string> = {
  "Cloud & Architecture": "from-blue-500/20 to-cyan-500/10",
  "Kubernetes & Security": "from-purple-500/20 to-indigo-500/10",
  "CI/CD & DevSecOps": "from-green-500/20 to-emerald-500/10",
  "Incidents & Reliability": "from-orange-500/20 to-amber-500/10",
  "Career & Culture": "from-pink-500/20 to-rose-500/10",
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
  const gradientClass =
    categoryColors[qa.category] || "from-primary/20 to-accent/10";

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
        className={`card relative overflow-hidden transition-all duration-300 ${
          isExpanded
            ? "border-primary/40 shadow-lg shadow-primary/5"
            : "hover:border-primary/20 hover:-translate-y-0.5"
        }`}
      >
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradientClass} transition-opacity duration-500 ${
            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-60"
          }`}
        />

        {/* Question header — always visible */}
        <button
          onClick={onToggle}
          className="relative z-10 w-full text-left p-5 sm:p-6 flex items-start gap-3 sm:gap-4 cursor-pointer"
          aria-expanded={isExpanded}
        >
          {/* Category badge */}
          <span className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {(() => {
              const Icon = categoryIcons[qa.category] || Briefcase;
              return <Icon className="h-4 w-4" />;
            })()}
          </span>

          <div className="flex-1 min-w-0">
            {/* Category label */}
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-primary/80 mb-1.5">
              {qa.category}
            </span>

            {/* Question text */}
            <h3 className="text-sm sm:text-base font-semibold text-text-primary leading-snug pr-8">
              {qa.question}
            </h3>

            {/* Tech tags — compact preview when collapsed */}
            {!isExpanded && (
              <div className="mt-2 flex flex-wrap gap-1">
                {qa.techTags.slice(0, 4).map((tag) => (
                  <span key={tag} className="tech-pill text-[10px]">
                    {tag}
                  </span>
                ))}
                {qa.techTags.length > 4 && (
                  <span className="text-[10px] text-text-tertiary font-medium px-1">
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
                <div className="h-px bg-border/60 mb-5" />

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
                        className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success"
                      >
                        <BarChart3 className="h-3 w-3" />
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
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
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
                        ? "bg-success/20 text-success"
                        : "bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-elevated/80"
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
  const { t } = useLanguage();

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
    <section id="screening" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title={t("screening.title")}
            subtitle={t("screening.subtitle")}
          />
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
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
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-elevated/80 border border-border/50"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {category}
                  <span
                    className={`ml-1 text-[10px] ${
                      isActive ? "text-white/70" : "text-text-tertiary"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Search */}
        <ScrollReveal delay={0.15}>
          <div className="relative mx-auto max-w-xl mb-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              placeholder={t("screening.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface/80 backdrop-blur-sm py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all"
            />
            {searchQuery && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-text-tertiary">
                {filteredQuestions.length} result
                {filteredQuestions.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </ScrollReveal>

        {/* Questions grid */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((qa, index) => (
              <ScrollReveal key={qa.id} delay={index * 0.05}>
                <QACard
                  qa={qa}
                  isExpanded={expandedId === qa.id}
                  onToggle={() =>
                    setExpandedId(expandedId === qa.id ? null : qa.id)
                  }
                />
              </ScrollReveal>
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
                {t("screening.noResults")}
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer summary */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 text-center">
            <p className="text-xs text-text-tertiary">
              {technicalQuestions.length} {t("screening.questionsAnswered")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
