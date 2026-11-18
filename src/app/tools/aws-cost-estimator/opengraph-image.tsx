import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "EKS and EC2 cost estimator, a free tool by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Free tool", title: "EKS and EC2 cost estimator", detail: "Monthly cost, line by line, from AWS's published prices." });
}
