import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import { absoluteUrl, site } from "@/lib/site";
import { projects } from "@/lib/projects";

const title = "DevOps & Cloud Projects and Case Studies";
const description =
  "Eleven infrastructure projects with architecture diagrams and source code: MLOps on AWS EKS, GitOps with Argo CD, CI/CD with GitHub Actions, and backup automation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: { title, description, url: "/projects", type: "website" },
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Projects"
          title="Things I've built, and how they work."
          lead="Each project is a working repository. The write-ups cover the problem, the architecture, the decisions behind it and what went wrong along the way."
          crumbs={[{ name: "Projects", path: "/projects" }]}
        />

        <section aria-label="All projects" className="py-16 sm:py-24">
          <div className="section-container">
            <ol className="border-t border-text-primary">
              {projects.map((project, i) => (
                <li key={project.slug} className="border-b border-border">
                  <article className="grid gap-x-10 gap-y-4 py-10 sm:py-12 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)]">
                    <p className="font-mono text-sm text-text-tertiary lg:pt-2">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <p className="type-eyebrow text-text-tertiary">{project.kind}</p>
                      <h2 className="mt-3 type-display-md text-text-primary text-balance">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-primary"
                        >
                          {project.title}
                        </Link>
                      </h2>
                    </div>
                    <div>
                      <p className="type-body-lg text-text-secondary text-pretty">{project.summary}</p>
                      <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <li key={tech} className="tech-pill">
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/projects/${project.slug}`}
                        aria-label={`Read the ${project.title} case study`}
                        className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4"
                      >
                        Read the case study
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-text-secondary">
              More experiments and smaller repositories are on{" "}
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </section>

        <CtaBand
          title="Need something like this for your own stack?"
          text="I can set up the pipeline, the cluster or the automation, and leave you with a repository you can read and run yourself."
          secondary={{ label: "See services", href: "/services" }}
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url: absoluteUrl("/projects"),
          author: { "@id": `${site.url}/#person` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((project, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: project.title,
              url: absoluteUrl(`/projects/${project.slug}`),
            })),
          },
        }}
      />
    </>
  );
}
