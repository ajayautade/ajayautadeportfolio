"use client";

import Link from "next/link";
import { trackEvent, type TrackEvent } from "@/lib/track";

interface TrackedLinkProps {
  href: string;
  event: TrackEvent;
  props?: Record<string, string | number | boolean>;
  className?: string;
  children: React.ReactNode;
}

/** A link that records a conversion event when clicked. External URLs open in a new tab. */
export default function TrackedLink({ href, event, props, className, children }: TrackedLinkProps) {
  const onClick = () => trackEvent(event, props);
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
