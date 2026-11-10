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
  github: "https://github.com/ajayautade",
  linkedin: "https://www.linkedin.com/in/ajayautadepatil",
  education: "B.Tech in Computer Science and Engineering",
  /** Web3Forms public access key. It is designed to be exposed in the browser. */
  formAccessKey: "da2a32de-3577-47d5-aeda-d5322f125776",
} as const;

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = [
  {
    title: "Work",
    links: [
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
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

export const absoluteUrl = (path = "/") =>
  `${site.url}${path === "/" ? "" : path}`;
