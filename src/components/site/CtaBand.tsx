import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCallButton from "./BookCallButton";

interface CtaBandProps {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Closing call to action. A black stage so it bookends the page with the hero. */
export default function CtaBand({
  title = "Have infrastructure that needs sorting out?",
  text = "Tell me what you're running and where it hurts. I'll reply with how I'd approach it.",
  primary = { label: "Send a message", href: "/contact" },
  secondary,
}: CtaBandProps) {
  return (
    <section className="stage py-16 sm:py-28 border-b border-border">
      <div className="section-container">
        <h2 className="type-display-lg text-text-primary max-w-3xl text-balance">{title}</h2>
        <p className="mt-5 max-w-xl type-body-lg text-text-secondary text-pretty">{text}</p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3">
          <BookCallButton source="cta-band" />
          <Link href={primary.href} className="btn-outline">
            {primary.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn-outline">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
