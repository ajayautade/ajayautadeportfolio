import { redirect } from "next/navigation";

export default function CoverLetterPage() {
  redirect("/resume?tab=cover-letter");
}
