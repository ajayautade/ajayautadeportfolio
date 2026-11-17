import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Infrastructure checkup, a free self-assessment by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Free tool", title: "Infrastructure checkup", detail: "Twelve questions. A prioritised list of what to fix first." });
}
