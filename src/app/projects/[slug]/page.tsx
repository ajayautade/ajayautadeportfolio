import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CodeBlock from "@/components/site/CodeBlock";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import FlowDiagram from "@/components/projects/FlowDiagram";
import { absoluteUrl, site } from "@/lib/site";
import { getProject, projects } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} case study`;
  const path = `/projects/${project.slug}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: { title, description: project.summary, url: path, type: "article", authors: [site.name] },
  };
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const linkClass =
  "font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-border py-12 first:border-t-0 first:pt-0 sm:py-14">
      <h2 id={id} className="scroll-mt-24 type-display-md text-text-primary">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const path = `/projects/${project.slug}`;

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "The problem" },
    { id: "architecture", label: "Architecture" },
    { id: "stack", label: "Stack" },
    { id: "decisions", label: "Infrastructure decisions" },
    { id: "build", label: "How it was built" },
    ...(project.challenges ? [{ id: "challenges", label: "Challenges and fixes" }] : []),
    { id: "links", label: "Links" },
  ];

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow={project.kind}
          title={project.title}
          lead={project.summary}
          crumbs={[
            { name: "Projects", path: "/projects" },
            { name: project.title, path },
          ]}
        >
          <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech} className="tech-pill">
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <GithubIcon className="h-4 w-4" />
              View the source
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Open the live preview
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </PageHero>

        <div className="section-container py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-24">
                <p className="type-eyebrow text-text-tertiary">On this page</p>
                <ol className="mt-4 space-y-2.5 border-l border-border">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="-ml-px block border-l border-transparent pl-4 text-sm text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <article className="min-w-0 max-w-3xl">
              <Section id="overview" title="Overview">
                <div className="space-y-5 type-body-lg text-text-secondary">
                  {project.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Section>

              <Section id="problem" title="The problem">
                <p className="type-body-lg text-text-secondary">{project.problem}</p>
              </Section>

              <Section id="architecture" title="Architecture">
                <p className="text-text-secondary">
                  Each row is one stage. Read a row left to right, then move down to the next.
                </p>
                <FlowDiagram diagram={project.diagram} id={`${project.slug}-diagram`} />
              </Section>

              <Section id="stack" title="Stack">
                <dl className="border-t border-border">
                  {project.stackGroups.map((group) => (
                    <div key={group.label} className="grid gap-2 border-b border-border py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                      <dt className="type-eyebrow text-text-tertiary sm:pt-1">{group.label}</dt>
                      <dd className="text-text-primary">{group.items.join(", ")}</dd>
                    </div>
                  ))}
                </dl>
              </Section>

              <Section id="decisions" title="Infrastructure decisions">
                <div className="space-y-8">
                  {project.decisions.map((decision) => (
                    <div key={decision.title}>
                      <h3 className="type-card-title text-text-primary">{decision.title}</h3>
                      <p className="mt-2 text-text-secondary">{decision.body}</p>
                    </div>
                  ))}
                </div>
                {project.snippet && (
                  <div className="mt-8">
                    <CodeBlock code={project.snippet.code} lang={project.snippet.lang} title={project.snippet.title} />
                    <p className="-mt-2 text-sm text-text-tertiary">{project.snippet.caption}</p>
                  </div>
                )}
              </Section>

              <Section id="build" title="How it was built">
                <ol className="space-y-7">
                  {project.steps.map((step, i) => (
                    <li key={step.title} className="grid gap-x-5 gap-y-1 sm:grid-cols-[2.5rem_minmax(0,1fr)]">
                      <span className="font-mono text-sm text-text-tertiary sm:pt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="type-card-title text-text-primary">{step.title}</h3>
                        <p className="mt-2 text-text-secondary">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>

              {project.challenges && (
                <Section id="challenges" title="Challenges and fixes">
                  <p className="text-text-secondary">
                    These are the problems I hit while building and deploying this, taken from the
                    troubleshooting log in the repository.
                  </p>
                  <div className="mt-8 space-y-4">
                    {project.challenges.map((challenge) => (
                      <div key={challenge.title} className="card p-6">
                        <h3 className="type-card-title text-text-primary">{challenge.title}</h3>
                        <dl className="mt-4 space-y-3">
                          <div>
                            <dt className="type-eyebrow text-text-tertiary">Problem</dt>
                            <dd className="mt-1.5 text-text-secondary">{challenge.problem}</dd>
                          </div>
                          <div>
                            <dt className="type-eyebrow text-text-tertiary">Fix</dt>
                            <dd className="mt-1.5 text-text-secondary">{challenge.fix}</dd>
                          </div>
                        </dl>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              <Section id="links" title="Links">
                <ul className="space-y-3 type-body-lg">
                  <li>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Source code on GitHub
                    </a>
                    <span className="text-text-secondary">, including the README with setup steps.</span>
                  </li>
                  {project.liveUrl && (
                    <li>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        Live preview
                      </a>
                      <span className="text-text-secondary"> of the application.</span>
                    </li>
                  )}
                  <li>
                    <Link href="/services" className={linkClass}>
                      Services
                    </Link>
                    <span className="text-text-secondary"> if you want something similar built for your team.</span>
                  </li>
                </ul>
              </Section>
            </article>
          </div>
        </div>

        <nav aria-label="More projects" className="border-t border-border">
          <div className="section-container grid sm:grid-cols-2">
            {previous ? (
              <Link href={`/projects/${previous.slug}`} className="group flex flex-col gap-2 border-b border-border py-8 sm:border-b-0 sm:border-r sm:pr-8">
                <span className="type-eyebrow text-text-tertiary inline-flex items-center gap-2">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Previous project
                </span>
                <span className="type-headline text-text-primary underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-primary">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <Link href="/projects" className="group flex flex-col gap-2 border-b border-border py-8 sm:border-b-0 sm:border-r sm:pr-8">
                <span className="type-eyebrow text-text-tertiary inline-flex items-center gap-2">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Back to
                </span>
                <span className="type-headline text-text-primary underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-primary">
                  All projects
                </span>
              </Link>
            )}
            {next ? (
              <Link href={`/projects/${next.slug}`} className="group flex flex-col gap-2 py-8 sm:items-end sm:pl-8 sm:text-right">
                <span className="type-eyebrow text-text-tertiary inline-flex items-center gap-2">
                  Next project
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="type-headline text-text-primary underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-primary">
                  {next.title}
                </span>
              </Link>
            ) : (
              <Link href="/projects" className="group flex flex-col gap-2 py-8 sm:items-end sm:pl-8 sm:text-right">
                <span className="type-eyebrow text-text-tertiary inline-flex items-center gap-2">
                  Back to
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="type-headline text-text-primary underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-primary">
                  All projects
                </span>
              </Link>
            )}
          </div>
        </nav>

        <CtaBand
          title="Want this kind of setup for your own project?"
          text="Tell me what you're running today. I'll reply with how I'd approach it."
          secondary={{ label: "See all projects", href: "/projects" }}
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.summary,
          url: absoluteUrl(path),
          codeRepository: project.repoUrl,
          programmingLanguage: project.languages,
          keywords: project.stack.join(", "),
          author: { "@id": `${site.url}/#person` },
        }}
      />
    </>
  );
}
