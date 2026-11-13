import { Award, ArrowUpRight } from "lucide-react";
import { earnedCertificates } from "@/lib/data";

/* ── Platform Logo SVGs ── */

function CourseraLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm13.8 70.5c-4 2.3-8.6 3.6-13.8 3.6-14.7 0-26.7-11.9-26.7-26.7S35.3 20.8 50 20.8c5.2 0 9.8 1.3 13.8 3.6l-6.9 12c-2-1.2-4.4-1.8-6.9-1.8-7.5 0-13.5 6.1-13.5 13.5s6.1 13.5 13.5 13.5c2.5 0 4.9-.6 6.9-1.8l6.9 12z" />
    </svg>
  );
}

function UdemyLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 260" fill="currentColor" className={className}>
      <path d="M130 0C58.2 0 0 58.2 0 130s58.2 130 130 130 130-58.2 130-130S201.8 0 130 0zm-30 80v60c0 16.6 13.4 30 30 30s30-13.4 30-30V80h25v60c0 30.3-24.7 55-55 55s-55-24.7-55-55V80h25z" />
    </svg>
  );
}

function DefaultPlatformLogo({ className }: { className?: string }) {
  return <Award className={className} />;
}

const platformConfig: Record<
  string,
  {
    Logo: React.FC<{ className?: string }>;
    label: string;
  }
> = {
  coursera: {
    Logo: CourseraLogo,
    label: "Coursera",
  },
  udemy: {
    Logo: UdemyLogo,
    label: "Udemy",
  },
  aws: {
    Logo: DefaultPlatformLogo,
    label: "AWS",
  },
  linkedin: {
    Logo: DefaultPlatformLogo,
    label: "LinkedIn Learning",
  },
  google: {
    Logo: DefaultPlatformLogo,
    label: "Google",
  },
  other: {
    Logo: DefaultPlatformLogo,
    label: "Certificate",
  },
};

/* ── Certificate Card ── */

function CertificateCard({ cert }: { cert: (typeof earnedCertificates)[number] }) {
  const config = platformConfig[cert.platform] || platformConfig.other;
  const { Logo } = config;

  return (
    <li className="card flex flex-col p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-surface-elevated text-text-secondary">
          <Logo className="h-[18px] w-[18px]" aria-hidden="true" />
        </div>
        <span className="type-eyebrow text-text-tertiary">
          {config.label} · {cert.date}
        </span>
      </div>

      <h3 className="text-base font-bold tracking-tight text-text-primary leading-snug">{cert.name}</h3>
      <p className="mt-1 text-sm text-text-tertiary">{cert.issuer}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics covered">
        {cert.skills.map((skill) => (
          <li key={skill} className="tech-pill">
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 hover:text-text-primary"
        >
          Verify credential
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only"> for {cert.name} (opens in a new tab)</span>
        </a>
        <p className="mt-1 font-mono text-[11px] text-text-quaternary break-all">ID {cert.credentialId}</p>
      </div>
    </li>
  );
}

/* ── Main Section ── */

/** Course certificates that have been completed. Each links to the issuer's own verification page. */
export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-16 sm:py-24 border-t border-border">
      <div className="section-container">
        <h2 className="type-display-md text-text-primary text-balance">Course certificates</h2>
        <p className="mt-4 max-w-2xl type-body-lg text-text-secondary text-pretty">
          {earnedCertificates.length} completed courses from Coursera and Udemy. These are course completions, not
          proctored industry exams. Every one links to the issuer&apos;s verification page.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {earnedCertificates.map((cert) => (
            <CertificateCard key={cert.credentialId} cert={cert} />
          ))}
        </ul>
      </div>
    </section>
  );
}
