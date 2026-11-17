/**
 * Facts the policy pages share. Pricing, Terms, Refund and Delivery all read from
 * here so they cannot disagree with each other.
 */
export const legal = {
  /** ISO date the policies were last changed. Shown on every policy page. */
  updated: "2026-11-15",
  /** Share of a project fee paid before work starts. */
  advancePercent: 50,
  /** Notice needed to cancel or move a consultation call for a full refund. */
  consultationNoticeHours: 24,
  /** How long an approved refund takes to reach the original payment method. */
  refundWorkingDays: "5 to 7 working days",
  /** How quickly a refund or cancellation request gets a reply. */
  replyWorkingDays: "2 working days",
  governingLaw: "India",
  jurisdiction: "Chhatrapati Sambhajinagar, Maharashtra",
  paymentProcessor: "Razorpay",
} as const;
