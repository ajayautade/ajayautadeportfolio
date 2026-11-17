import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PipelineArt, { PipelineArtCompact } from "@/components/site/PipelineArt";
import ContactForm from "@/components/site/ContactForm";
import BookCallButton from "@/components/site/BookCallButton";
import JsonLd, { personLd } from "@/components/site/JsonLd";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";
import { skillCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Ajay Autade — Cloud & DevOps Engineer (AWS, Kubernetes, CI/CD)" },
  description:
    "Cloud & DevOps Engineer in India. I help teams deploy on AWS, run Docker and Kubernetes, automate infrastructure with Terraform, and build CI/CD pipelines.",
  alternates: { canonical: "/" },
};

const principles = [
  {
    title: "Automate the second time",
    text: "If I do something by hand twice, the third time it becomes a script or a pipeline step. Manual steps are where mistakes hide.",
  },
  {
    title: "Reliability is designed in",
    text: "Health checks, rollbacks and backups go in at the start. Adding them after the first outage costs more.",
  },
  {
    title: "Least privilege by default",
    text: "Short-lived credentials, narrow IAM roles, and image scanning in the pipeline. Security is part of the build, not a review at the end.",
  },
  {
    title: "Scale when the numbers say so",
    text: "Autoscaling and bigger machines follow measurements. I start small and let metrics justify the next step.",
  },
  {
    title: "Cost is an engineering concern",
    text: "Every resource should have an owner and a reason. Idle clusters get destroyed; lifecycle rules clean up what nobody reads.",
  },
  {
    title: "Write it down",
    text: "A setup only one person understands is a risk. I leave diagrams, READMEs and a troubleshooting log behind.",
  },
];

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="type-eyebrow text-text-tertiary flex items-center gap-3">
      <span className="text-primary">{index}</span>
      {children}
    </p>
  );
}

export default function Home() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const latest = posts.slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* ── Hero: the black stage ─────────────────────────────── */}
        <section className="stage pt-24 pb-12 sm:pt-36 sm:pb-24 lg:min-h-[100dvh] lg:flex lg:items-center">
          <div className="section-container w-full">
            <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
              <div>
                <p className="type-eyebrow text-text-tertiary">Cloud &amp; DevOps Engineer</p>
                <h1 className="mt-4 sm:mt-6 type-display-xl text-text-primary text-balance">
                  Building reliable cloud infrastructure. Automating everything in between.
                </h1>
                <p className="mt-5 sm:mt-7 max-w-xl type-body-lg sm:type-subhead text-text-secondary text-pretty">
                  I help businesses build, deploy, automate, and scale reliable infrastructure using
                  modern cloud-native technologies.
                </p>
                <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3">
                  <BookCallButton source="home-hero" label="Book a free 30-minute call" />
                  <Link href="/projects" className="btn-outline">
                    Explore my work
                  </Link>
                </div>
                <p className="mt-6 sm:mt-10 flex items-start gap-2.5 text-sm text-text-tertiary [&>span]:mt-1.5">
                  <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                  Open to DevOps roles and freelance projects. Remote, based in India.
                </p>
              </div>
              <PipelineArtCompact className="w-full max-w-sm lg:hidden" />
              <PipelineArt className="hidden w-full lg:block" />
            </div>
          </div>
        </section>

        {/* ── About ─────────────────────────────────────────────── */}
        <section aria-labelledby="about-heading" className="py-16 sm:py-28">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <SectionLabel index="01">About</SectionLabel>
              <h2 id="about-heading" className="mt-6 type-display-lg text-text-primary text-balance">
                I make deployments boring, on purpose.
              </h2>
            </div>
            <div className="space-y-5 type-body-lg text-text-secondary lg:pt-12">
              <p>
                I&rsquo;m {site.name}, a Cloud &amp; DevOps Engineer with a B.Tech in Computer Science
                and Engineering. I work on the part of software most people only notice when it
                breaks: the servers, pipelines and clusters underneath an application.
              </p>
              <p>
                Most of my work is on AWS with Docker, Kubernetes, Terraform and GitHub Actions. I
                like infrastructure you can read in a repository, rebuild from scratch, and hand to
                someone else without a two-hour call.
              </p>
              <p>
                <Link href="/about" className="tap inline-flex items-center gap-1.5 font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4">
                  More about me
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── Services: a numbered index, not a card grid ───────── */}
        <section aria-labelledby="services-heading" className="py-16 sm:py-28 border-t border-border">
          <div className="section-container">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel index="02">Services</SectionLabel>
                <h2 id="services-heading" className="mt-6 type-display-lg text-text-primary">
                  What I can help with
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
                <Link href="/services" className="btn-outline">
                  All services
                </Link>
                <Link href="/pricing" className="btn-outline">
                  Pricing
                </Link>
              </div>
            </div>

            <ol className="mt-12 border-t border-text-primary">
              {services.map((service, i) => (
                <li key={service.id} className="border-b border-border">
                  <Link
                    href={`/services/${service.id}`}
                    className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.2fr)_2rem] sm:items-baseline"
                  >
                    <span className="font-mono text-sm text-text-tertiary">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="type-headline text-text-primary group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary">{service.summary}</p>
                    <ArrowUpRight
                      className="hidden sm:block h-5 w-5 self-center text-text-tertiary group-hover:text-text-primary transition-colors"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid gap-6 border-l-2 border-primary pl-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10">
              <div>
                <h3 className="type-card-title text-text-primary">Not sure where to start?</h3>
                <p className="mt-2 max-w-2xl text-text-secondary">
                  The infrastructure checkup asks twelve yes-or-no questions and gives you a list of what to fix
                  first. It runs in your browser and nothing is stored.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/tools/infrastructure-checkup" className="btn-primary">
                  Take the checkup
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/tools" className="btn-outline">
                  All free tools
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured projects ─────────────────────────────────── */}
        <section aria-labelledby="projects-heading" className="py-16 sm:py-28 bg-surface">
          <div className="section-container">
            <SectionLabel index="03">Selected work</SectionLabel>
            <h2 id="projects-heading" className="mt-6 type-display-lg text-text-primary max-w-3xl text-balance">
              Projects with the pipeline, the cluster and the mistakes included
            </h2>

            <div className="mt-14 space-y-16">
              {featured.map((project, i) => (
                <article key={project.slug} className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
                  <div>
                    <p className="font-mono text-sm text-text-tertiary">
                      {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 type-display-md text-text-primary">
                      <Link href={`/projects/${project.slug}`} className="block py-2 hover:text-primary transition-colors">
                        {project.title}
                      </Link>
                    </h3>
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {project.stack.slice(0, 7).map((tool) => (
                        <li key={tool} className="tech-pill bg-surface-elevated">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="type-eyebrow text-text-tertiary">The problem</p>
                    <p className="mt-3 type-body-lg text-text-secondary text-pretty">{project.problem}</p>
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="tap inline-flex items-center gap-1.5 font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4"
                      >
                        Read the case study
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tap inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
                      >
                        Source on GitHub
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16">
              <Link href="/projects" className="btn-primary">
                All projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Technical expertise: a table, not a cloud of logos ─── */}
        <section aria-labelledby="stack-heading" className="py-16 sm:py-28">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <div>
              <SectionLabel index="04">Technical expertise</SectionLabel>
              <h2 id="stack-heading" className="mt-6 type-display-lg text-text-primary">
                The tools I reach for
              </h2>
              <p className="mt-5 text-text-secondary">
                Grouped by the job they do. The <Link href="/projects" className="underline decoration-primary decoration-2 underline-offset-4">projects</Link> show
                most of them in use.
              </p>
            </div>
            <dl className="border-t border-text-primary">
              {skillCategories.map((category) => (
                <div
                  key={category.title}
                  className="grid gap-2 border-b border-border py-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-8"
                >
                  <dt className="type-eyebrow text-text-tertiary sm:pt-1">{category.title}</dt>
                  <dd className="text-lg font-medium text-text-primary">
                    {category.skills.map((skill) => skill.name).join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Engineering philosophy ────────────────────────────── */}
        <section aria-labelledby="philosophy-heading" className="stage py-16 sm:py-28">
          <div className="section-container">
            <SectionLabel index="05">Engineering philosophy</SectionLabel>
            <h2 id="philosophy-heading" className="mt-6 type-display-lg text-text-primary max-w-3xl text-balance">
              Every pipeline reproducible. Every server disposable. Every deploy a non-event.
            </h2>
            <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle.title} className="border-t border-border pt-5">
                  <h3 className="type-card-title text-text-primary">{principle.title}</h3>
                  <p className="mt-3 text-text-secondary">{principle.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Latest insights ───────────────────────────────────── */}
        {latest.length > 0 && (
          <section aria-labelledby="insights-heading" className="py-16 sm:py-28">
            <div className="section-container">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <SectionLabel index="06">Latest insights</SectionLabel>
                  <h2 id="insights-heading" className="mt-6 type-display-lg text-text-primary">
                    Notes from the terminal
                  </h2>
                </div>
                <Link href="/blog" className="btn-outline sm:shrink-0">
                  All articles
                </Link>
              </div>
              <ul className="mt-12 border-t border-text-primary">
                {latest.map((post) => (
                  <li key={post.slug} className="border-b border-border">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[9rem_minmax(0,1fr)]"
                    >
                      <time dateTime={post.date} className="font-mono text-sm text-text-tertiary sm:pt-1.5">
                        {new Date(post.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </time>
                      <div>
                        <h3 className="type-headline text-text-primary group-hover:text-primary transition-colors text-balance">
                          {post.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-text-secondary">{post.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Contact ───────────────────────────────────────────── */}
        <section aria-labelledby="contact-heading" className="py-16 sm:py-28 border-t border-border">
          <div className="section-container grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div>
              <SectionLabel index="07">Contact</SectionLabel>
              <h2 id="contact-heading" className="mt-6 type-display-lg text-text-primary text-balance">
                Tell me what you&rsquo;re running.
              </h2>
              <p className="mt-5 type-body-lg text-text-secondary">
                A sentence or two is enough to start. I reply by email. Or pick a time for a free 30-minute call.
              </p>
              <div className="mt-6">
                <BookCallButton source="home-contact" className="btn-outline" />
              </div>
              <dl className="mt-10 space-y-5">
                <div>
                  <dt className="type-eyebrow text-text-tertiary">Email</dt>
                  <dd className="mt-1.5">
                    <a href={`mailto:${site.email}`} className="tap text-lg font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="type-eyebrow text-text-tertiary">Elsewhere</dt>
                  <dd className="flex gap-6 text-lg font-medium">
                    <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="tap text-text-primary hover:text-primary transition-colors">
                      LinkedIn
                    </a>
                    <a href={site.github} target="_blank" rel="noopener noreferrer" className="tap text-text-primary hover:text-primary transition-colors">
                      GitHub
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${site.url}/#website`,
              url: site.url,
              name: site.name,
              description: site.description,
              inLanguage: "en",
              publisher: { "@id": `${site.url}/#person` },
            },
            personLd,
          ],
        }}
      />
    </>
  );
}
