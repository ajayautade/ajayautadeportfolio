import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "GitHub OIDC trust policy generator, a free tool by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Free tool", title: "GitHub OIDC trust policy generator", detail: "Let GitHub Actions into AWS without access keys." });
}
