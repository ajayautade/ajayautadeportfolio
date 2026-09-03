export const personalInfo = {
  name: "Ajay Autade",
  title: "DevOps & Cloud Engineer",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  phone: "9545034120",
  email: "contact@ajayautade.com",
  secondaryEmail: "ajayautade2@gmail.com",
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
      { name: "Helm", icon: "Blocks" },
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
    title: "Databases",
    icon: "Database",
    skills: [
      { name: "MongoDB", icon: "Database" },
      { name: "MySQL", icon: "Database" },
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
      "Zero-touch ML deployment pipeline — 45min to ~8min code-to-production on AWS EKS",
    longDescription:
      "Built a zero-touch deployment pipeline using GitHub Actions and ArgoCD, reducing code-to-production time from 45 minutes to ~8 minutes on AWS EKS. Shrunk ML Docker images by 73% (3GB→800MB) via multi-stage builds, configured Kubernetes HPA to scale pods (2→10) based on CPU/Memory loads, and tracked 9 real-time inference metrics via Prometheus + Grafana.",
    techStack: [
      "Python",
      "FastAPI",
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
      "Cloud-native web app on AWS EKS with dual-pipeline CI/CD and 5-service monitoring stack",
    longDescription:
      "Engineered a dual-pipeline GitHub Actions workflow with Trivy security scans and ArgoCD, auto-syncing Kubernetes manifests every 3 minutes. Provisioned an AWS EKS cluster via Modular Terraform and deployed using Helm with HPA auto-scaling (2→10 pods at 70% CPU/80% Memory). Architected a 5-service monitoring stack with 4 custom PromQL alert rules.",
    techStack: [
      "AWS EKS",
      "Kubernetes",
      "Terraform",
      "ArgoCD",
      "GitHub Actions",
      "Helm",
      "Prometheus",
      "Grafana",
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
    role: "DevOps Engineering Intern",
    duration: "June 2025 – Dec 2025",
    description: [
      "Automated AWS infrastructure provisioning (EC2, S3, VPC, IAM) using Terraform, cutting manual setup time from hours to minutes",
      "Containerized 4+ applications with Docker and deployed them on Kubernetes clusters, ensuring scalability and zero-downtime deployments",
      "Designed and deployed end-to-end CI/CD pipelines using Jenkins and GitHub Actions, reducing release time by 60% across 4+ applications",
    ],
    technologies: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Jenkins",
      "GitHub Actions",
      "AWS EC2",
      "AWS S3",
      "VPC",
      "IAM",
      "Linux",
      "Git",
    ],
  },
  {
    company: "Anlage Infotech Pvt. Ltd.",
    role: "Software Developer Intern",
    duration: "Nov 2023 – April 2024",
    description: [
      "Engineered scalable RESTful APIs to facilitate seamless, secure data exchange between distributed application components, improving overall system integration",
      "Actively participated in cross-functional code reviews, architectural planning, and pair programming sessions to uphold strict coding standards",
      "Designed and deployed end-to-end CI/CD pipelines using Jenkins and GitHub Actions, reducing release time by 60% across 4+ applications",
    ],
    technologies: [
      "Python",
      "Flask",
      "Docker Compose",
      "Jenkins",
      "GitHub Actions",
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
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Certifications", href: "/certifications" },
  { name: "Deep Dives", href: "/deep-dives" },
  { name: "Contact", href: "#contact" },
];

export const stats = [
  { label: "Dockerized Apps", value: 30 },
  { label: "CI/CD Pipelines", value: 50 },
  { label: "Cloud Providers", value: 3 },
  { label: "Uptime Achieved", value: 99 },
];
