import { Suspense } from "react";
import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

const title = "Resume";
const description =
  "Ajay Autade's resume as a PDF, with a cover letter and a short summary of skills and projects.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `${title} | Ajay Autade`,
    description,
    url: "/resume",
    type: "profile",
  },
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <ResumeClient />
    </Suspense>
  );
}
