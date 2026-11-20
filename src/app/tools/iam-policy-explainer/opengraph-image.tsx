import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "IAM policy explainer, a free tool by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Free tool", title: "IAM policy explainer", detail: "IAM, S3 bucket and trust policies in plain English." });
}
