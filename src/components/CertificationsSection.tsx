import { Cloud, Network, Blocks, BookOpen } from "lucide-react";
import { certifications } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Network,
  Blocks,
};

/** Industry certifications. None are earned yet, and the copy says so plainly. */
export default function CertificationsSection() {
  return (
    <section id="industry-certifications" className="py-16 sm:py-24">
      <div className="section-container">
        <h2 className="type-display-md text-text-primary text-balance">Industry certifications I&apos;m studying for</h2>
        <p className="mt-4 max-w-2xl type-body-lg text-text-secondary text-pretty">
          I haven&apos;t sat these exams yet. They are listed here so you know what I&apos;m working towards, not as
          credentials I hold.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => {
            const Icon = iconMap[cert.icon] || BookOpen;
            return (
              <li key={cert.name} className="card p-6 flex flex-col items-start">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-surface-elevated text-text-secondary mb-4">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold tracking-tight text-text-primary leading-snug">{cert.name}</h3>
                <p className="mt-1 text-sm text-text-tertiary">{cert.issuer}</p>
                <span className="linear-badge mt-4 gap-1.5 px-2 py-0.5 text-xs">
                  {cert.status === "earned" ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                      Earned {cert.date}
                    </>
                  ) : (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full border border-text-tertiary" aria-hidden="true" />
                      In progress, not yet earned
                    </>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
