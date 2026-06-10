export const personalInfo = {
  name: "Ajay Autade",
  title: "DevOps & Cloud Engineer",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  phone: "7820902571",
  email: "ajayautade2@gmail.com",
  github: "https://github.com/ajayautade",
  linkedin: "https://www.linkedin.com/in/ajayautadepatil",
  bio: "I automate the boring stuff so engineering teams can ship faster. From spinning up Kubernetes clusters to building CI/CD pipelines that just work — I make infrastructure disappear behind a great developer experience.",
  shortBio:
    "Building resilient infrastructure & automating everything in between.",
  philosophy:
    "I believe in Infrastructure as Code, GitOps-driven deployments, and monitoring-first design. Every pipeline I build is reproducible, every server is disposable, and every deployment is a non-event.",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    college: "MGM's Jawaharlal Nehru Engineering College",
    status: "Graduate",
  },
};

export interface Skill {
  name: string;
  icon: string;
}

export const skillCategories = [
  {
    title: "Cloud & Infrastructure",
    icon: "Cloud",
    skills: [
      { name: "AWS", icon: "Cloud" },
      { name: "GCP", icon: "Cloud" },
      { name: "Terraform", icon: "Blocks" },
      { name: "Ansible", icon: "Terminal" },
    ],
  },
  {
    title: "Containerization & Orchestration",
    icon: "Container",
    skills: [
      { name: "Docker", icon: "Box" },
      { name: "Kubernetes", icon: "Network" },
      { name: "EKS", icon: "Cloud" },
    ],
  },
  {
    title: "CI/CD & Automation",
    icon: "Workflow",
    skills: [
      { name: "Jenkins", icon: "Cog" },
      { name: "GitHub Actions", icon: "GitBranch" },
      { name: "ArgoCD", icon: "RefreshCw" },
    ],
  },
  {
    title: "Monitoring & Observability",
    icon: "Activity",
    skills: [
      { name: "Grafana", icon: "Activity" },
      { name: "Prometheus", icon: "Activity" },
      { name: "CloudWatch", icon: "Cloud" },
    ],
  },
  {
    title: "Version Control",
    icon: "GitBranch",
    skills: [
      { name: "Git", icon: "GitBranch" },
      { name: "GitHub", icon: "Github" },
    ],
  },
  {
    title: "Scripting & Programming",
    icon: "Code",
    skills: [
      { name: "Python", icon: "Code" },
      { name: "Shell Scripting", icon: "Terminal" },
    ],
  },
  {
    title: "OS & Networking",
    icon: "Monitor",
    skills: [
      { name: "Linux", icon: "Monitor" },
      { name: "Networking", icon: "Wifi" },
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "MLOps Sentiment Analyzer",
    description:
      "Production-grade MLOps pipeline with HuggingFace AI model deployed on AWS EKS",
    longDescription:
      "End-to-end MLOps pipeline: HuggingFace sentiment model containerized with Docker, orchestrated on AWS EKS via Terraform IaC, with ArgoCD GitOps for zero-touch deployments, GitHub Actions CI/CD, and full Prometheus + Grafana observability stack.",
    techStack: [
      "Python",
      "Docker",
      "Kubernetes",
      "AWS EKS",
      "Terraform",
      "ArgoCD",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
    ],
    githubUrl: "https://github.com/ajayautade/mlops-sentiment-analyzer",
    featured: true,
  },
  {
    title: "MoviesMonkey",
    description:
      "Containerized movie search app with automated CI/CD and cloud deployment",
    longDescription:
      "Movie search platform with real-time API integration, containerized with Docker and deployed on AWS EC2 behind an Nginx reverse proxy. Includes GitHub Actions CI/CD pipeline for automated builds and deployments.",
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Docker",
      "Nginx",
      "AWS EC2",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/ajayautade/MoviesMonkey",
    featured: true,
  },
  {
    title: "Full-Stack Notes App",
    description:
      "Django app with Docker Compose, automated testing, and CI/CD pipeline",
    longDescription:
      "Full-stack Django notes application with user authentication, deployed using Docker Compose with separate web and database containers. Includes a GitHub Actions CI pipeline for automated testing and linting on every push.",
    techStack: [
      "Python",
      "Django",
      "Docker Compose",
      "PostgreSQL",
      "GitHub Actions",
      "Nginx",
    ],
    githubUrl: "https://github.com/ajayautade/notes-app-django",
    featured: true,
  },
];

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: "Invictus Web Solutions Pvt. Ltd.",
    role: "DevOps Engineer Intern",
    duration: "6 Months",
    description: [
      "Dockerized 3 client-facing web applications, reducing deployment time from 2+ hours to under 15 minutes per release",
      "Configured GitHub Actions CI/CD pipelines for 4 projects, enabling automated testing and zero-downtime deployments",
      "Wrote Bash and Python scripts to automate server health checks, eliminating ~4 hours/week of manual monitoring",
      "Managed AWS EC2 instances and configured Nginx reverse proxies for production traffic routing and SSL termination",
    ],
    technologies: [
      "Docker",
      "GitHub Actions",
      "AWS EC2",
      "Nginx",
      "Python",
      "Bash",
      "Linux",
      "Git",
    ],
  },
  {
    company: "Anlage Infotech Pvt. Ltd.",
    role: "Software Development Intern",
    duration: "6 Months",
    description: [
      "Built and deployed 2 internal tools using Python and Flask, serving 15+ team members daily",
      "Introduced Git branching strategy (GitFlow) to the team, reducing merge conflicts by 60%",
      "Set up staging environments with Docker Compose for pre-production testing, catching 30+ bugs before release",
      "Participated in code reviews and improved test coverage from 45% to 78% across 3 key repositories",
    ],
    technologies: [
      "Python",
      "Flask",
      "Docker Compose",
      "Git",
      "Linux",
      "PostgreSQL",
    ],
  },
];

export interface Certification {
  name: string;
  issuer: string;
  status: "earned" | "in-progress";
  icon: string;
  color: string;
  date?: string;
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: "AWS Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    status: "in-progress",
    icon: "Cloud",
    color: "text-[#FF9900]",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    status: "in-progress",
    icon: "Network",
    color: "text-[#326CE5]",
  },
  {
    name: "HashiCorp Terraform Associate",
    issuer: "HashiCorp",
    status: "in-progress",
    icon: "Blocks",
    color: "text-[#7B42BC]",
  },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const stats = [
  { label: "Containers Deployed", value: 50 },
  { label: "CI/CD Pipelines", value: 10 },
  { label: "Cloud Providers", value: 3 },
  { label: "Uptime Achieved", value: 99 },
];
