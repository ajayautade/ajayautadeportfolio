import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "CI/CD pipeline simulator and DevOps Q&A by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Deep dives", title: "A pipeline you can replay, and questions I've thought through" });
}
