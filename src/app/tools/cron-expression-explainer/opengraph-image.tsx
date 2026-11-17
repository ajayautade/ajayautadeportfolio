import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Cron expression explainer, a free tool by Ajay Autade";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Free tool", title: "Cron expression explainer", detail: "Plain English, field by field, with next run times." });
}
