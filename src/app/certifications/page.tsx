import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CertificationsSection from "@/components/CertificationsSection";
import CertificatesSection from "@/components/CertificatesSection";
import { certifications, earnedCertificates } from "@/lib/data";

const title = "Certifications and Course Certificates";
const description =
  "Certifications Ajay Autade is studying for (AWS Solutions Architect, CKA, Terraform Associate) and completed Coursera and Udemy courses, with verification links.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/certifications" },
  openGraph: {
    title: `${title} | Ajay Autade`,
    description,
    url: "/certifications",
    type: "website",
  },
};

export default function CertificationsPage() {
  const inProgress = certifications.filter((cert) => cert.status === "in-progress").length;

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          crumbs={[{ name: "Certifications", path: "/certifications" }]}
          eyebrow="Credentials"
          title="Certifications and course certificates"
          lead="What I've finished and what I'm still studying for, kept separate so there's no confusion about which is which."
        >
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="type-eyebrow text-text-tertiary">Industry exams in progress</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight tabular-nums">{inProgress}</dd>
            </div>
            <div>
              <dt className="type-eyebrow text-text-tertiary">Courses completed</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight tabular-nums">{earnedCertificates.length}</dd>
            </div>
          </dl>
        </PageHero>
        <CertificationsSection />
        <CertificatesSection />
      </main>
      <SiteFooter />
    </>
  );
}
