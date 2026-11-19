import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Dockerfile checker, a free tool by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Free tool", title: "Dockerfile checker", detail: "Size, security and build caching, line by line." });
}
