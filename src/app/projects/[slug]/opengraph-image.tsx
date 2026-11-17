import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getProject, projects } from "@/lib/projects";

export const alt = "Project case study by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return ogImage({
    eyebrow: project ? `Case study · ${project.kind}` : "Case study",
    title: project?.title ?? "Projects",
  });
}
