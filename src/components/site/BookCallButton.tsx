"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CalendarDays } from "lucide-react";
import { trackEvent } from "@/lib/track";

// The calendar only loads when someone asks for it.
const BookCallDialog = dynamic(() => import("./BookCallDialog"), { ssr: false });

interface BookCallButtonProps {
  /** Where the button sits, for analytics: "header", "home-hero", "pricing"… */
  source: string;
  label?: string;
  className?: string;
  icon?: boolean;
}

/** Opens the booking calendar for the free intro call. */
export default function BookCallButton({
  source,
  label = "Book a free call",
  className = "btn-primary",
  icon = true,
}: BookCallButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          setOpen(true);
          trackEvent("booking_opened", { source });
        }}
        className={className}
      >
        {icon && <CalendarDays className="h-4 w-4" aria-hidden="true" />}
        {label}
      </button>
      {open && <BookCallDialog source={source} onClose={() => setOpen(false)} />}
    </>
  );
}
