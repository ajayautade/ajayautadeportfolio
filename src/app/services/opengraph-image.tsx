import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Cloud and DevOps services by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Services", title: "Cloud and DevOps work, scoped and written down.", detail: "AWS, CI/CD, Docker and Kubernetes, Terraform, monitoring." });
}
