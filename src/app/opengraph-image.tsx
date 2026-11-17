import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Ajay Autade, Cloud and DevOps Engineer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Cloud & DevOps Engineer", title: "Building reliable cloud infrastructure. Automating everything in between." });
}
