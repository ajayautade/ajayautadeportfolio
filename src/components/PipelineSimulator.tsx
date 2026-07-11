"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Play, 
  RotateCw, 
  CheckCircle2, 
  Terminal, 
  GitCommit, 
  Code, 
  Box, 
  ShieldCheck, 
  Cloud, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";

interface PipelineStage {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  duration: number; // millisecond duration for progress bar
  logs: string[];
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "trigger",
    name: "Webhook Trigger",
    subtitle: "git push main",
    icon: GitCommit,
    duration: 1500,
    logs: [
      "🔄 Webhook received from GitHub repository: ajayautade/mlops-sentiment-analyzer",
      "➜ Ref: refs/heads/main",
      "➜ Commit: 4a2d8b1 [feat: optimize inference server configuration]",
      "➜ Author: Ajay Autade <contact@ajayautade.com>",
      "🐳 Initializing runner environment...",
      "✔ Runner provisioned successfully on local Kubernetes agent node-4."
    ]
  },
  {
    id: "lint",
    name: "Lint & Test",
    subtitle: "eslint & vitest",
    icon: Code,
    duration: 2500,
    logs: [
      "➜ Running static code analysis (ESLint & Prettier)...",
      "✔ Linter complete: 0 warnings, 0 errors found.",
      "➜ Launching unit testing framework (Vitest)...",
      "✓ src/tests/inference.test.ts (4 passed)",
      "✓ src/tests/pipeline.test.ts (2 passed)",
      "✓ src/tests/auth.test.ts (3 passed)",
      "Test Suites: 3 passed, 3 total",
      "Tests:       9 passed, 9 total",
      "Snapshots:   0 total",
      "Time:        1.45s",
      "✔ Unit testing complete. Code quality checks passed successfully!"
    ]
  },
  {
    id: "build",
    name: "Build Image",
    subtitle: "docker containerize",
    icon: Box,
    duration: 3500,
    logs: [
      "🐳 Building container image using Dockerfile...",
      "➜ Sending build context to Docker daemon  24.5MB",
      "➜ Step 1/8 : FROM python:3.9-slim-buster",
      "  ---> 5779c13b29c9",
      "➜ Step 2/8 : WORKDIR /app",
      "  ---> Running in 987f2da511a0",
      "➜ Step 3/8 : COPY requirements.txt .",
      "  ---> Running in c2d221808af2",
      "➜ Step 4/8 : RUN pip install --no-cache-dir -r requirements.txt",
      "  ---> Collecting numpy==1.22.4...",
      "  ---> Collecting torch==1.12.1...",
      "  ---> Installing collected packages: numpy, torch, transformers, fastapi, uvicorn",
      "➜ Step 5/8 : COPY . .",
      "  ---> Running in e2cc3180ab89",
      "➜ Step 6/8 : EXPOSE 8000",
      "  ---> Running in f1bc77ab20b9",
      "➜ Step 7/8 : ENTRYPOINT [\"uvicorn\"]",
      "➜ Step 8/8 : CMD [\"app.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]",
      "🐳 Image built: mlops-sentiment-analyzer:4a2d8b1 (Size: 840MB)",
      "➜ Logging into Amazon ECR Registry...",
      "➜ Pushing image to 123456789012.dkr.ecr.us-east-1.amazonaws.com/mlops-sentiment-analyzer:latest...",
      "  ---> Layer 1/5: Pushed",
      "  ---> Layer 2/5: Pushed",
      "  ---> Layer 3/5: Pushed",
      "  ---> Layer 4/5: Pushed",
      "  ---> Layer 5/5: Pushed",
      "🐳 Image successfully pushed to Amazon ECR registry."
    ]
  },
  {
    id: "scan",
    name: "Security Scan",
    subtitle: "trivy & snyk",
    icon: ShieldCheck,
    duration: 2500,
    logs: [
      "🛡 Starting vulnerability scan using Trivy image scanner...",
      "➜ Scanning image 123456789012.dkr.ecr.us-east-1.amazonaws.com/mlops-sentiment-analyzer:latest...",
      "  ---> CRITICAL: 0 vulnerabilities found",
      "  ---> HIGH: 0 vulnerabilities found",
      "  ---> MEDIUM: 2 vulnerabilities found (ignored - system-libs)",
      "  ---> LOW: 5 vulnerabilities found (ignored)",
      "🛡 Running Snyk code-to-cloud static analysis...",
      "✔ Snyk security analysis: Codebase conforms to DevSecOps standards.",
      "✔ Security gates check: SUCCESS. Build verified as safe for deployment."
    ]
  },
  {
    id: "deploy",
    name: "GitOps Deploy",
    subtitle: "argocd & eks",
    icon: Cloud,
    duration: 3000,
    logs: [
      "🚀 Triggering GitOps reconciliation sync via ArgoCD...",
      "➜ Repository updated: config repo updated tag to 4a2d8b1",
      "➜ ArgoCD detecting sync difference...",
      "➜ Synchronizing applications in namespace 'production'...",
      "  ---> Service/mlops-sentiment-service: configured",
      "  ---> Deployment/mlops-sentiment-deployment: configured",
      "  ---> Ingress/mlops-sentiment-ingress: configured",
      "➜ AWS EKS Kubernetes cluster performing rolling update...",
      "➜ Terminating old pods, starting 3 new replica pods...",
      "➜ Health checks (Liveness & Readiness probes): SUCCESS",
      "✔ Rolling update complete. 0 downtime achieved.",
      "🎉 Deployment successfully completed! Application is now live."
    ]
  }
];

export default function PipelineSimulator() {
  const [pipelineState, setPipelineState] = useState<"idle" | "running" | "success" | "failed">("idle");
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(-1);
  const [stageStatuses, setStageStatuses] = useState<Record<string, "idle" | "running" | "success" | "failed">>({
    trigger: "idle",
    lint: "idle",
    build: "idle",
    scan: "idle",
    deploy: "idle"
  });
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const logsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll terminal — scroll only INSIDE the terminal box, not the page
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Clean up timers
  useEffect(() => {
    return () => {
      if (logsIntervalRef.current) clearInterval(logsIntervalRef.current);
    };
  }, []);

  const triggerPipeline = async () => {
    // Reset state
    setPipelineState("running");
    setTerminalLogs(["🚀 Initializing pipeline execution..."]);
    
    const initialStatuses: Record<string, "idle" | "running" | "success" | "failed"> = {};
    PIPELINE_STAGES.forEach(s => { initialStatuses[s.id] = "idle"; });
    setStageStatuses(initialStatuses);

    // Run stages sequentially
    for (let i = 0; i < PIPELINE_STAGES.length; i++) {
      const stage = PIPELINE_STAGES[i];
      setCurrentStageIndex(i);
      setStageStatuses(prev => ({ ...prev, [stage.id]: "running" }));
      
      // Simulate logs typing in terminal
      await simulateLogsForStage(stage);

      setStageStatuses(prev => ({ ...prev, [stage.id]: "success" }));
    }

    setPipelineState("success");
    setCurrentStageIndex(-1);
  };

  const simulateLogsForStage = (stage: PipelineStage): Promise<void> => {
    return new Promise((resolve) => {
      let logIndex = 0;
      const stageLogs = stage.logs;
      const totalLogs = stageLogs.length;
      const intervalDuration = stage.duration / totalLogs;

      if (logsIntervalRef.current) clearInterval(logsIntervalRef.current);

      logsIntervalRef.current = setInterval(() => {
        if (logIndex < totalLogs) {
          const logLine = stageLogs[logIndex];
          if (logLine) {
            setTerminalLogs(prev => [...prev, logLine]);
          }
          logIndex++;
        } else {
          if (logsIntervalRef.current) {
            clearInterval(logsIntervalRef.current);
            logsIntervalRef.current = null;
          }
          resolve();
        }
      }, intervalDuration);
    });
  };

  return (
    <section id="pipeline" className="py-12 sm:py-20 lg:py-24 bg-surface-elevated/20 border-y border-border">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title="Interactive CI/CD Pipeline"
            subtitle="Trigger a push and watch my deployment workflow deploy to a mock AWS EKS cluster"
          />
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-12 items-start mt-8">
          
          {/* Main Controls & Pipeline Diagram */}
          <div className="lg:col-span-8 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="card p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-text-primary">
                    Webhook Action Deployment
                  </h3>
                  <p className="text-xs text-text-tertiary mt-0.5">
                    Target: AWS Kubernetes Cluster (EKS) · Branch: main
                  </p>
                </div>
                
                <button
                  onClick={triggerPipeline}
                  disabled={pipelineState === "running"}
                  className={`btn-primary py-2.5 px-5 text-sm gap-2 w-full md:w-auto justify-center transition-all ${
                    pipelineState === "running" ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {pipelineState === "running" ? (
                    <>
                      <RotateCw className="h-4 w-4 animate-spin text-white" />
                      Running Pipeline...
                    </>
                  ) : pipelineState === "success" ? (
                    <>
                      <Play className="h-4 w-4 fill-white" />
                      Re-run Pipeline
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-white" />
                      Trigger Pipeline
                    </>
                  )}
                </button>
              </div>
            </ScrollReveal>

            {/* Pipeline Visual Graph */}
            <ScrollReveal delay={0.15}>
              <div className="card p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center overflow-x-auto">
                <div className="pipeline-stage-graph flex flex-col sm:flex-row items-center gap-2 sm:gap-2 w-full justify-between">
                  
                  {PIPELINE_STAGES.map((stage, idx) => {
                    const status = stageStatuses[stage.id];
                    const StageIcon = stage.icon;
                    const isRunning = status === "running";
                    const isSuccess = status === "success";
                    
                    return (
                      <div key={stage.id} className="flex flex-col sm:flex-row items-center flex-1 w-full sm:w-auto">
                        {/* Node Card */}
                        <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-0 relative z-10 w-full sm:w-auto">
                          <div 
                            className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                              isRunning 
                                ? "border-primary bg-primary/10 shadow-[0_0_12px_rgba(59,130,246,0.3)] animate-pulse" 
                                : isSuccess 
                                ? "border-success bg-success/15 text-success" 
                                : "border-border bg-surface text-text-tertiary"
                            }`}
                          >
                            {isRunning ? (
                              <RotateCw className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-primary" />
                            ) : isSuccess ? (
                              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                            ) : (
                              <StageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            )}
                          </div>
                          <div className="flex flex-col sm:items-center sm:text-center">
                            <span className="text-xs font-semibold text-text-primary sm:mt-2 whitespace-nowrap">
                              {stage.name}
                            </span>
                            <span className="text-[10px] text-text-tertiary">
                              {stage.subtitle}
                            </span>
                          </div>
                        </div>

                        {/* Connection Line */}
                        {idx < PIPELINE_STAGES.length - 1 && (
                          <div className="w-0.5 sm:w-full h-6 sm:h-[2px] relative flex items-center justify-center my-0.5 sm:my-0 mx-auto sm:mx-0">
                            {/* Base line */}
                            <div className="absolute inset-0 bg-border" />
                            {/* Animated colored indicator */}
                            <div 
                              className="absolute top-0 left-0 bottom-0 sm:bottom-auto sm:left-0 sm:right-auto sm:h-full bg-gradient-to-b sm:bg-gradient-to-r from-success to-primary transition-all duration-500"
                              style={{ 
                                width: isSuccess ? "100%" : "0%",
                                height: isSuccess ? "100%" : "0%"
                              }}
                            />
                            {/* Directional arrow — only on desktop */}
                            <ChevronRight className={`absolute hidden sm:block h-3 w-3 -right-1 z-10 transition-colors ${
                              isSuccess ? "text-primary" : "text-border"
                            }`} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Console / Console Logs Column */}
          <div className="lg:col-span-4 space-y-6 w-full">
            <ScrollReveal delay={0.2}>
              <div className="card border-border bg-[#09090b] overflow-hidden flex flex-col h-[300px] sm:h-[360px] md:h-[420px]">
                {/* Console header */}
                <div className="flex items-center justify-between bg-[#18181b] border-b border-white/10 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-text-tertiary" />
                    <span className="text-[11px] font-mono text-text-tertiary">runner@github-actions:~</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500/80" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                    <span className="h-2 w-2 rounded-full bg-green-500/80" />
                  </div>
                </div>

                {/* Console logs output — ref on the scrollable container for internal-only scrolling */}
                <div
                  ref={terminalContainerRef}
                  className="flex-1 overflow-y-auto p-4 font-mono text-xs text-text-secondary space-y-1.5 select-none leading-relaxed"
                >
                  {terminalLogs.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-text-tertiary">
                      <Terminal className="h-8 w-8 opacity-25 mb-2" />
                      <p>Console idle.</p>
                      <p className="text-[10px]">Click 'Trigger Pipeline' to start build simulations.</p>
                    </div>
                  )}
                  {terminalLogs.map((log, index) => {
                    if (!log) return null;
                    const isSuccessLog = log.startsWith("✔") || log.startsWith("✓") || log.startsWith("🎉");
                    const isAlert = log.startsWith("🚀") || log.startsWith("🐳") || log.startsWith("🛡");
                    const isError = log.includes("CRITICAL") || log.includes("Error");

                    let textColor = "text-text-secondary";
                    if (isSuccessLog) textColor = "text-success font-medium";
                    else if (isAlert) textColor = "text-accent font-medium";
                    else if (isError) textColor = "text-red-400 font-semibold";

                    return (
                      <div key={index} className={`${textColor} break-words`}>
                        {log}
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
          
        </div>

        {/* Post-success Callout Card */}
        <AnimatePresence>
          {pipelineState === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4 }}
              className="mt-6 flex justify-center"
            >
              <div className="card p-5 max-w-2xl border-success/30 bg-success/5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                  <Cloud className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-text-primary">
                    Pipeline deployment successful!
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    The Docker image was successfully pushed, scans completed with zero vulnerabilities, and ArgoCD synchronized changes to the EKS cluster. You can verify the deployed mock endpoint.
                  </p>
                </div>
                <a
                  href="https://github.com/ajayautade/mlops-sentiment-analyzer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex items-center justify-center py-2 px-4 text-xs gap-1.5 hover:bg-success hover:border-success hover:text-white"
                >
                  View Code repository
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
