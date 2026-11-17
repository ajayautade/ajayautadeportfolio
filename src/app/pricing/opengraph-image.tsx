import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Pricing for Cloud and DevOps work by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Pricing", title: "Prices, written down before any work starts.", detail: "Consultation calls and project work, in USD." });
}
