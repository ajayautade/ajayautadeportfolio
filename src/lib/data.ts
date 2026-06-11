export const personalInfo = {
  name: "Ajay Autade",
  title: "DevOps Engineer",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  phone: "7820902571",
  email: "ajayautade2@gmail.com",
  github: "https://github.com/ajayautade",
  linkedin: "https://www.linkedin.com/in/ajayautadepatil",
  twitter: "https://twitter.com/ajayautade11",
  bio: "Passionate DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and container orchestration. I bridge the gap between development and operations, automating workflows and building scalable, resilient systems. Currently focused on mastering GitOps practices and advancing cloud-native architectures.",
  shortBio:
    "Building robust infrastructure & automating everything in between.",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    college: "MGM's Jawaharlal Nehru Engineering College",
    status: "Graduate",
  },
};

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: string;
}

export const skillCategories = [
  {
    title: "Cloud & Infrastructure",
    icon: "Cloud",
    skills: [
      { name: "AWS", icon: "Cloud", level: 80 },
      { name: "Terraform", icon: "Blocks", level: 75 },
    ],
  },
  {
    title: "Containerization & Orchestration",
    icon: "Container",
    skills: [
      { name: "Docker", icon: "Box", level: 85 },
      { name: "Kubernetes", icon: "Network", level: 78 },
    ],
  },
  {
    title: "CI/CD & Automation",
    icon: "Workflow",
    skills: [
      { name: "Jenkins", icon: "Cog", level: 80 },
      { name: "GitHub Actions", icon: "GitBranch", level: 82 },
      { name: "CI/CD", icon: "RefreshCw", level: 85 },
    ],
  },
  {
    title: "Version Control",
    icon: "GitBranch",
    skills: [
      { name: "Git", icon: "GitBranch", level: 90 },
      { name: "GitHub", icon: "Github", level: 88 },
    ],
  },
  {
    title: "Scripting & Programming",
    icon: "Code",
    skills: [
      { name: "Python", icon: "Code", level: 75 },
      { name: "Shell Scripting", icon: "Terminal", level: 82 },
    ],
  },
  {
    title: "OS & Networking",
    icon: "Monitor",
    skills: [
      { name: "Linux", icon: "Monitor", level: 88 },
      { name: "Networking", icon: "Wifi", level: 72 },
    ],
  },
  {
    title: "Monitoring & Observability",
    icon: "Activity",
    skills: [{ name: "Monitoring", icon: "Activity", level: 70 }],
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
      "🤖 Production-grade MLOps pipeline: HuggingFace AI model deployed on AWS EKS with ArgoCD GitOps, Terraform IaC, Docker, GitHub Actions CI/CD, and Prometheus/Grafana monitoring. End-to-end machine learning operations demonstrating industry-standard DevOps practices.",
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
    title: "Full-Stack Notes App",
    description:
      "Django-based notes application with full CRUD operations and user authentication",
    longDescription:
      "A full-stack notes application built with Django, featuring complete CRUD functionality, user authentication, and a clean responsive interface. Demonstrates full-stack development skills with Python backend and modern frontend design.",
    techStack: ["Python", "Django", "HTML", "CSS", "JavaScript", "SQLite"],
    githubUrl: "https://github.com/ajayautade/notes-app-django",
    featured: true,
  },
  {
    title: "MoviesMonkey",
    description:
      "Movie search website with dynamic search and browsing capabilities",
    longDescription:
      "A movie search website built with web technologies, featuring dynamic search functionality, responsive design, and integration with movie database APIs. Clean UI with real-time search results and detailed movie information.",
    techStack: ["HTML", "CSS", "JavaScript", "API Integration"],
    githubUrl: "https://github.com/ajayautade/MoviesMonkey",
    featured: true,
  },
];

export interface RoadmapItem {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  icon: string;
}

export const roadmapItems: RoadmapItem[] = [
  {
    title: "Linux & Networking Fundamentals",
    description: "System administration, networking protocols, and server management",
    status: "completed",
    icon: "Monitor",
  },
  {
    title: "Version Control (Git & GitHub)",
    description: "Branching strategies, pull requests, and collaborative workflows",
    status: "completed",
    icon: "GitBranch",
  },
  {
    title: "Scripting (Python & Shell)",
    description: "Automation scripts, system tools, and infrastructure management",
    status: "completed",
    icon: "Terminal",
  },
  {
    title: "Containerization (Docker)",
    description: "Container images, Docker Compose, and multi-stage builds",
    status: "completed",
    icon: "Box",
  },
  {
    title: "Orchestration (Kubernetes)",
    description: "Pod management, deployments, services, and Helm charts",
    status: "completed",
    icon: "Network",
  },
  {
    title: "CI/CD (Jenkins & GitHub Actions)",
    description: "Pipeline design, automated testing, and deployment workflows",
    status: "completed",
    icon: "RefreshCw",
  },
  {
    title: "Infrastructure as Code (Terraform)",
    description: "AWS resource provisioning, state management, and modules",
    status: "completed",
    icon: "Blocks",
  },
  {
    title: "Cloud (AWS)",
    description: "EC2, S3, EKS, IAM, VPC, and cloud architecture best practices",
    status: "completed",
    icon: "Cloud",
  },
  {
    title: "Monitoring (Prometheus & Grafana)",
    description: "Metrics collection, dashboards, and alerting systems",
    status: "in-progress",
    icon: "Activity",
  },
  {
    title: "GitOps (ArgoCD)",
    description: "Declarative deployments, sync strategies, and application management",
    status: "in-progress",
    icon: "Rocket",
  },
  {
    title: "Service Mesh & Advanced K8s",
    description: "Istio, advanced networking, and production-grade cluster management",
    status: "upcoming",
    icon: "Sparkles",
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
      "Developed and maintained client websites using modern web technologies",
      "Implemented responsive designs and cross-browser compatibility",
      "Participated in team standups and sprint planning sessions",
      "Assisted in deploying web applications and managing hosting environments",
    ],
    technologies: ["Python", "Git", "Linux", "Docker"],
  },
  {
    company: "Anlage Infotech Pvt. Ltd.",
    role: "Software Development Intern",
    duration: "6 Months",
    description: [
      "Collaborated with development teams on client-facing software projects",
      "Gained hands-on experience with software development lifecycle and agile methodologies",
      "Contributed to code reviews, testing, and deployment processes",
      "Worked on improving application performance and code quality",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Git"],
  },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Contact", href: "#contact" },
];

export const terminalCommands = [
  "$ docker build -t app:latest .",
  "$ kubectl apply -f deployment.yaml",
  "$ terraform init && terraform plan",
  "$ git push origin main",
  "$ jenkins-cli build DevOps-Pipeline",
  "$ aws eks update-kubeconfig --name cluster",
  "$ helm upgrade --install app ./chart",
  "$ ansible-playbook deploy.yml",
];

export const stats = [
  { label: "Repositories", value: 19 },
  { label: "Technologies", value: 13 },
  { label: "Internships", value: 2 },
];
