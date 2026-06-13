"use client";

import { Cloud, GitBranch, Activity, Server, Shield, Workflow } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeading from "./ui/SectionHeading";

const services = [
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "Design and deploy scalable AWS architectures with Terraform and Ansible for reliable, cost-effective cloud environments.",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Workflow,
    title: "CI/CD Pipelines",
    description:
      "Automate your entire build-test-deploy workflow with Jenkins, GitHub Actions, and ArgoCD for rapid, reliable releases.",
    color: "from-purple-500/20 to-indigo-500/10",
  },
  {
    icon: Server,
    title: "Container Orchestration",
    description:
      "Containerize applications with Docker and orchestrate at scale using Kubernetes and AWS EKS for maximum uptime.",
    color: "from-green-500/20 to-emerald-500/10",
  },
  {
    icon: Activity,
    title: "Monitoring & Observability",
    description:
      "Set up Grafana, Prometheus, and CloudWatch dashboards for full observability into system health and performance.",
    color: "from-orange-500/20 to-amber-500/10",
  },
  {
    icon: GitBranch,
    title: "GitOps & Version Control",
    description:
      "Implement GitOps workflows with ArgoCD and Git for declarative, auditable infrastructure and application deployments.",
    color: "from-pink-500/20 to-rose-500/10",
  },
  {
    icon: Shield,
    title: "Security & Reliability",
    description:
      "Build secure-by-default infrastructure with IAM best practices, secrets management, and automated compliance checks.",
    color: "from-teal-500/20 to-cyan-500/10",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-12 sm:py-20 lg:py-24">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            title="What I Can Do For You"
            subtitle="Engineering solutions that drive real business impact"
          />
        </ScrollReveal>

        <div className="grid gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={index * 0.08}>
                <div className="group card p-4 sm:p-6 h-full relative overflow-hidden transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-text-primary mb-2">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
