import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import PipelineSimulator from "@/components/PipelineSimulator";
import TechnicalQASection from "@/components/TechnicalQASection";
import { technicalQuestions } from "@/lib/technicalQuestionsData";

const title = "CI/CD Pipeline Simulator and DevOps Q&A";
const description =
  "A scripted walkthrough of a GitOps pipeline, from lint to Argo CD deploy, plus written answers to common DevOps, Kubernetes and cloud interview questions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/deep-dives" },
  openGraph: {
    title: `${title} | Ajay Autade`,
    description,
    url: "/deep-dives",
    type: "website",
  },
};

export default function DeepDivesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          crumbs={[{ name: "Deep dives", path: "/deep-dives" }]}
          eyebrow="Deep dives"
          title="A pipeline you can replay, and questions I've thought through"
          lead="Two things on this page: a scripted simulation of the pipeline behind one of my projects, and how I'd answer the questions DevOps interviews tend to ask."
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#pipeline" className="btn-primary">
              Pipeline simulator
            </a>
            <a href="#screening" className="btn-outline">
              Interview answers ({technicalQuestions.length})
            </a>
          </div>
        </PageHero>
        <PipelineSimulator />
        <TechnicalQASection />
      </main>
      <SiteFooter />
    </>
  );
}
