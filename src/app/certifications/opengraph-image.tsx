import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Certifications of Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Certifications", title: "Certifications and credentials" });
}
