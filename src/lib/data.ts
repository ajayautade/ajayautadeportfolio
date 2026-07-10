export const personalInfo = {
  name: "Ajay Autade",
  title: "DevOps & Cloud Engineer",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  phone: "7820902571",
  email: "contact@ajayautade.com",
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

export interface EarnedCertificate {
  name: string;
  issuer: string;
  platform: "coursera" | "udemy" | "aws" | "linkedin" | "google" | "other";
  date: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
}

export const earnedCertificates: EarnedCertificate[] = [
  {
    name: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM",
    platform: "coursera",
    date: "Jun 2022",
    credentialId: "9NN4D47DNCU6",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/9NN4D47DNCU6",
    skills: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
  },
  {
    name: "AI For Everyone",
    issuer: "DeepLearning.AI",
    platform: "coursera",
    date: "May 2022",
    credentialId: "8YZGXC6KTV76",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/8YZGXC6KTV76",
    skills: ["AI Strategy", "Deep Learning", "Data Science"],
  },
  {
    name: "Introduction to Google SEO",
    issuer: "University of California, Davis",
    platform: "coursera",
    date: "Sep 2021",
    credentialId: "TWKU7EVH9TR7",
    credentialUrl: "https://coursera.org/share/9a65d362389e0892336d6872087b8363",
    skills: ["SEO", "Google Analytics", "Digital Marketing"],
  },
  {
    name: "High Performance Collaboration: Leadership, Teamwork, and Negotiation",
    issuer: "Northwestern University",
    platform: "coursera",
    date: "Nov 2021",
    credentialId: "F84K3NTH2G7Y",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/F84K3NTH2G7Y",
    skills: ["Leadership", "Teamwork", "Negotiation"],
  },
  {
    name: "Interpersonal Communication for Engineering Leaders",
    issuer: "Rice University",
    platform: "coursera",
    date: "Nov 2021",
    credentialId: "SNF9WKWUEMQ3",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/SNF9WKWUEMQ3",
    skills: ["Communication", "Engineering Leadership", "Team Management"],
  },
  {
    name: "High-Impact Business Writing",
    issuer: "University of California, Irvine",
    platform: "coursera",
    date: "Nov 2021",
    credentialId: "FYBR9NRVH2ZJ",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/FYBR9NRVH2ZJ",
    skills: ["Business Writing", "Professional Communication"],
  },
  // ── Udemy Certificates (DevOps-relevant first) ──
  {
    name: "Terraform + AWS - Your Introduction!",
    issuer: "Udemy",
    platform: "udemy",
    date: "Dec 2019",
    credentialId: "UC-ZWIHCCTS",
    credentialUrl: "https://www.udemy.com/certificate/UC-ZWIHCCTS/",
    skills: ["Terraform", "AWS", "Infrastructure as Code"],
  },
  {
    name: "The Cyber Security Bootcamp",
    issuer: "Udemy",
    platform: "udemy",
    date: "May 2020",
    credentialId: "UC-e2f230d4",
    credentialUrl: "https://www.udemy.com/certificate/UC-e2f230d4-be58-4f63-b0aa-eaafab2f3e41/",
    skills: ["Cyber Security", "Network Security", "DevSecOps"],
  },
  {
    name: "Learn To Code From Scratch With Python 3",
    issuer: "Udemy",
    platform: "udemy",
    date: "Jun 2020",
    credentialId: "UC-70cc9030",
    credentialUrl: "https://www.udemy.com/certificate/UC-70cc9030-2552-43f0-a067-ea487bd4874e/",
    skills: ["Python", "Scripting", "Automation"],
  },
  {
    name: "Object Oriented Programming in Python",
    issuer: "Udemy",
    platform: "udemy",
    date: "Dec 2019",
    credentialId: "UC-BFP145P5",
    credentialUrl: "https://www.udemy.com/certificate/UC-BFP145P5/",
    skills: ["Python", "OOP", "Software Design"],
  },
  {
    name: "JavaScript for QA Engineers and SDETs",
    issuer: "Udemy",
    platform: "udemy",
    date: "May 2020",
    credentialId: "UC-4284e65b",
    credentialUrl: "https://www.udemy.com/certificate/UC-4284e65b-f43a-4450-9948-a18c5f84125d/",
    skills: ["JavaScript", "QA Testing", "Test Automation"],
  },
  {
    name: "Learn Node.js From Scratch",
    issuer: "Udemy",
    platform: "udemy",
    date: "Dec 2019",
    credentialId: "UC-JMB9XR4G",
    credentialUrl: "https://www.udemy.com/certificate/UC-JMB9XR4G/",
    skills: ["Node.js", "Backend Development", "JavaScript"],
  },
  {
    name: "C++ Tutorial for Complete Beginners",
    issuer: "Udemy",
    platform: "udemy",
    date: "Jun 2020",
    credentialId: "UC-83db59e7",
    credentialUrl: "https://www.udemy.com/certificate/UC-83db59e7-ba9e-4cba-baaf-d4f6f12f78e4/",
    skills: ["C++", "Programming Fundamentals"],
  },
  {
    name: "Learn HTML and CSS Together for Beginners",
    issuer: "Udemy",
    platform: "udemy",
    date: "Jun 2020",
    credentialId: "UC-574089cf",
    credentialUrl: "https://www.udemy.com/certificate/UC-574089cf-d3d5-48bb-8b0c-ed272fd69595/",
    skills: ["HTML", "CSS", "Web Development"],
  },
  {
    name: "Learn C++ Game Development",
    issuer: "Udemy",
    platform: "udemy",
    date: "May 2022",
    credentialId: "UC-3fe83ec4",
    credentialUrl: "https://www.udemy.com/certificate/UC-3fe83ec4-7b96-4db0-81b1-38fdc0ba978d/",
    skills: ["C++", "Game Development"],
  },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Projects", href: "#projects" },
  { name: "Pipeline", href: "#pipeline" },
  { name: "Contact", href: "#contact" },
];

export const stats = [
  { label: "Containers Deployed", value: 50 },
  { label: "CI/CD Pipelines", value: 10 },
  { label: "Cloud Providers", value: 3 },
  { label: "Uptime Achieved", value: 99 },
];
