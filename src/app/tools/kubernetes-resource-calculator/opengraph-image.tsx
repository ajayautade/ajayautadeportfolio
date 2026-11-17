import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Kubernetes resource calculator, a free tool by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Free tool", title: "Kubernetes resource calculator", detail: "Requests, limits, QoS class and pods per node." });
}
