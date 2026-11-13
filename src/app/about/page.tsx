import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd, { personLd } from "@/components/site/JsonLd";
import { absoluteUrl, site } from "@/lib/site";
import { skillCategories, certifications } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ajay Autade: a Cloud & DevOps Engineer from Maharashtra, India, working with AWS, Kubernetes, Terraform and CI/CD. Background, skills and how I work.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Ajay Autade", url: "/about", type: "profile" },
};

const interests = [
  {
    title: "GitOps",
    text: "Git as the single description of what should be running, with Argo CD keeping the cluster in line with it.",
  },
  {
    title: "Kubernetes operations",
    text: "Probes, resource requests, autoscaling and the debugging that follows when a pod will not start.",
  },
  {
    title: "Infrastructure as Code",
    text: "Terraform modules that create a whole environment, and destroy it again when it is not needed.",
  },
  {
    title: "MLOps",
    text: "Serving a model is a deployment problem too: large images, slow starts, and metrics that matter for inference.",
  },
];

const journey = [
  {
    title: "Containers",
    text: "A Django and React application packaged as a Docker image, with Nginx as a reverse proxy in front of it.",
    href: "/projects/notes-app-django",
    link: "Notes app",
  },
  {
    title: "Pipelines",
    text: "CI with tests, linting and image builds on every push, a local Kubernetes cluster to deploy to, and OIDC in place of stored AWS keys.",
    href: "/projects/end-to-end-cicd-pipeline",
    link: "End-to-end CI/CD pipeline",
  },
  {
    title: "Clusters",
    text: "An EKS cluster provisioned with Terraform, with Argo CD handling deployments and Prometheus and Grafana watching the result.",
    href: "/projects/gitops-argocd-deployment",
    link: "GitOps on EKS",
  },
  {
    title: "Harder workloads",
    text: "Deploying a HuggingFace model brought its own problems: multi-gigabyte images, node group failures, and autoscaling for inference.",
    href: "/projects/mlops-sentiment-analyzer",
    link: "MLOps sentiment analyzer",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="About"
          title="An engineer who likes the part nobody sees."
          lead={`I'm ${site.name}, a ${site.role} based in ${site.locality}, India. I build and automate the infrastructure applications run on.`}
          crumbs={[{ name: "About", path: "/about" }]}
          aside={
            <div className="panel p-2 max-w-sm lg:ml-auto">
              <Image
                src="/profile.png"
                alt="Portrait of Ajay Autade"
                width={640}
                height={640}
                sizes="(max-width: 1024px) 384px, 400px"
                className="aspect-square w-full rounded-sm object-cover"
                priority
              />
            </div>
          }
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn-primary">
              Get in touch
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/projects" className="btn-outline">
              See my projects
            </Link>
          </div>
        </PageHero>

        <section aria-labelledby="intro-heading" className="py-16 sm:py-28">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <h2 id="intro-heading" className="type-display-md text-text-primary">
              Who I am
            </h2>
            <div className="space-y-5 type-body-lg text-text-secondary max-w-2xl">
              <p>
                I have a B.Tech in Computer Science and Engineering. My focus is the layer under
                the application: how software gets built, shipped and kept running.
              </p>
              <p>
                I set up cloud infrastructure on AWS, package applications
                into containers, run them on Kubernetes, and build the CI/CD pipelines that connect
                a commit to a deployment. I write infrastructure as code so it can be reviewed,
                repeated and thrown away.
              </p>
              <p>
                I&rsquo;m open to Cloud and DevOps engineering roles, and I take on freelance
                projects for startups and small teams that need this work done but do not have a
                dedicated person for it yet.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="journey-heading" className="py-16 sm:py-28 bg-surface">
          <div className="section-container">
            <h2 id="journey-heading" className="type-display-md text-text-primary">
              What I&rsquo;ve built
            </h2>
            <p className="mt-4 max-w-2xl text-text-secondary">
              Four areas of practice, each with a public project behind it.
            </p>
            <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {journey.map((step, i) => (
                <li key={step.title} className="border-t border-text-primary pt-5">
                  <p className="font-mono text-sm text-text-tertiary">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 type-card-title text-text-primary">{step.title}</h3>
                  <p className="mt-3 text-text-secondary">{step.text}</p>
                  <Link
                    href={step.href}
                    className="tap mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4"
                  >
                    {step.link}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="interests-heading" className="py-16 sm:py-28">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <h2 id="interests-heading" className="type-display-md text-text-primary">
              What I&rsquo;m interested in
            </h2>
            <dl className="border-t border-text-primary">
              {interests.map((item) => (
                <div key={item.title} className="grid gap-2 border-b border-border py-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-8">
                  <dt className="type-card-title text-text-primary">{item.title}</dt>
                  <dd className="text-text-secondary">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="skills-heading" className="py-16 sm:py-28 border-t border-border">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <div>
              <h2 id="skills-heading" className="type-display-md text-text-primary">
                Skills and tools
              </h2>
              <p className="mt-4 text-text-secondary">
                Education: {site.education}.
              </p>
            </div>
            <div>
              <dl className="border-t border-text-primary">
                {skillCategories.map((category) => (
                  <div key={category.title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-8">
                    <dt className="type-eyebrow text-text-tertiary sm:pt-1">{category.title}</dt>
                    <dd className="text-lg font-medium text-text-primary">
                      {category.skills.map((skill) => skill.name).join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className="mt-12 type-card-title text-text-primary">Certifications in progress</h3>
              <ul className="mt-4 space-y-2 text-text-secondary">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    {cert.name} <span className="text-text-tertiary">({cert.issuer})</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-text-tertiary">
                I&rsquo;m preparing for these; I have not sat them yet. Completed course certificates
                are on the{" "}
                <Link href="/certifications" className="underline decoration-primary decoration-2 underline-offset-4 text-text-secondary">
                  certifications page
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="how-heading" className="stage py-16 sm:py-28">
          <div className="section-container">
            <h2 id="how-heading" className="type-display-md text-text-primary">
              How I work
            </h2>
            <blockquote className="mt-8 max-w-4xl type-display-md font-bold text-text-primary text-balance">
              Infrastructure as code, GitOps-driven deployments, monitoring from day one.
            </blockquote>
            <div className="mt-10 grid gap-8 md:grid-cols-3 max-w-5xl">
              <p className="text-text-secondary">
                <strong className="block text-text-primary mb-2">Reproducible.</strong>
                If it cannot be rebuilt from the repository, it is not finished.
              </p>
              <p className="text-text-secondary">
                <strong className="block text-text-primary mb-2">Disposable.</strong>
                Servers are replaced, not repaired. Nothing important lives only on one machine.
              </p>
              <p className="text-text-secondary">
                <strong className="block text-text-primary mb-2">Observable.</strong>
                A service without metrics is a service I cannot vouch for.
              </p>
            </div>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-lg font-medium">
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="tap text-text-primary underline decoration-primary decoration-2 underline-offset-4">
                  GitHub
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="tap text-text-primary underline decoration-primary decoration-2 underline-offset-4">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="tap text-text-primary underline decoration-primary decoration-2 underline-offset-4">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </section>

        <CtaBand
          title="Want to see the work itself?"
          text="Each project page covers the problem, the architecture and what went wrong along the way."
          primary={{ label: "Browse projects", href: "/projects" }}
          secondary={{ label: "Contact me", href: "/contact" }}
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: absoluteUrl("/about"),
          mainEntity: personLd,
        }}
      />
    </>
  );
}
