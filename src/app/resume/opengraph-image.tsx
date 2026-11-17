import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Resume of Ajay Autade, Cloud and DevOps Engineer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Resume", title: "Ajay Autade", detail: "Cloud & DevOps Engineer" });
}
