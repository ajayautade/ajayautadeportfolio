import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getService, services } from "@/lib/services";

export const alt = "Cloud and DevOps service by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((service) => ({ id: service.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = getService(id);
  return ogImage({ eyebrow: "Service", title: service?.title ?? "Services", detail: service?.summary });
}
