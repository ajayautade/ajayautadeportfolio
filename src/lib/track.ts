import { track } from "@vercel/analytics";

/**
 * Conversion events sent to Vercel Analytics. Keep the list short and the
 * properties free of personal data: no names, emails or message text.
 */
export type TrackEvent =
  | "contact_submitted"
  | "booking_opened"
  | "booking_requested"
  | "checkup_completed"
  | "pricing_click"
  | "tool_used"
  | "code_copied";

export function trackEvent(name: TrackEvent, props?: Record<string, string | number | boolean>) {
  try {
    track(name, props);
  } catch {
    // Analytics must never break the page.
  }
}
