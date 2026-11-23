/**
 * Single source of truth for identity, navigation and contact details.
 * Everything here is factual; nothing is inferred or estimated.
 */
export const site = {
  url: "https://ajayautade.com",
  name: "Ajay Autade",
  role: "Cloud & DevOps Engineer",
  tagline: "Building reliable cloud infrastructure. Automating everything in between.",
  description:
    "Ajay Autade is a Cloud & DevOps Engineer in India. He helps teams deploy on AWS, containerise with Docker and Kubernetes, automate infrastructure with Terraform, and build CI/CD pipelines.",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  locality: "Chhatrapati Sambhajinagar",
  region: "Maharashtra",
  country: "IN",
  email: "contact@ajayautade.com",
  /** Name payments and invoices are made out to. An individual, not a registered company. */
  legalName: "Ajay Autade",
  phone: "+91 95450 34120",
  phoneHref: "tel:+919545034120",
  /**
   * TODO before applying to a payment gateway: fill in the street address and PIN code.
   * Reviewers look for a full postal address on the Contact page. Empty values are simply not rendered.
   */
  street: "",
  postalCode: "",
  /**
   * Razorpay Payment Link for the paid 60-minute session (Dashboard → Payment Links).
   * Leave empty until the account is approved: the Pricing page then sends people to the contact form instead.
   */
  paidSessionPaymentLink: "",
  /**
   * Public status page from an uptime monitor (Better Stack, UptimeRobot, …).
   * Leave empty until the monitor exists: the footer link only appears once this is set.
   */
  statusPageUrl: "",
  github: "https://github.com/ajayautade",
  linkedin: "https://www.linkedin.com/in/ajayautadepatil",
  education: "B.Tech in Computer Science and Engineering",
  /** Web3Forms public access key. It is designed to be exposed in the browser. */
  formAccessKey: "da2a32de-3577-47d5-aeda-d5322f125776",
} as const;

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  {
    title: "Work",
    links: [
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Free tools", href: "/tools" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About me", href: "/about" },
      { label: "Certifications", href: "/certifications" },
      { label: "Deep dives", href: "/deep-dives" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

/** Policy links shown in the footer of every page. */
export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cancellation & Refund Policy", href: "/refund-policy" },
  { label: "Shipping & Delivery Policy", href: "/shipping-policy" },
] as const;

/** Postal address as display lines. The street and PIN appear once they are filled in above. */
export const addressLines = (): string[] =>
  [
    site.street,
    [site.locality, site.postalCode].filter(Boolean).join(" "),
    `${site.region}, India`,
  ].filter(Boolean);

export const absoluteUrl = (path = "/") =>
  `${site.url}${path === "/" ? "" : path}`;
