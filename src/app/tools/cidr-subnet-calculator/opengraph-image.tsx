import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "CIDR subnet calculator, a free tool by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Free tool", title: "CIDR subnet calculator", detail: "Ranges, masks, usable hosts and subnet splits." });
}
