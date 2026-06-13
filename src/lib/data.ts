export const personalInfo = {
  name: "Ajay Autade",
  title: "DevOps Engineer",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  phone: "7820902571",
  email: "ajayautade2@gmail.com",
  github: "https://github.com/ajayautade",
  linkedin: "https://www.linkedin.com/in/ajayautadepatil",
  bio: "Results driven DevOps Engineer with hands-on expertise in Kubernetes, Docker, and AWS infrastructure. Proficient in applying automation and cloud provisioning practices using Terraform, Ansible, and AWS to deliver robust and reliable systems.",
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
      "Production-grade MLOps pipeline: HuggingFace AI model deployed on AWS EKS with ArgoCD GitOps, Terraform IaC, Docker, GitHub Actions CI/CD, and Prometheus/Grafana monitoring.",
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
      "Movie search website with dynamic search and browsing capabilities",
    longDescription:
      "A movie search website built with web technologies, featuring dynamic search functionality, responsive design, and integration with movie database APIs for real-time results and detailed movie information.",
    techStack: ["HTML", "CSS", "JavaScript", "API Integration"],
    githubUrl: "https://github.com/ajayautade/MoviesMonkey",
    featured: true,
  },
  {
    title: "Full-Stack Notes App",
    description:
      "Django-based notes application with full CRUD operations and user authentication",
    longDescription:
      "A full-stack notes application built with Django, featuring complete CRUD functionality, user authentication, and a clean responsive interface.",
    techStack: ["Python", "Django", "HTML", "CSS", "JavaScript", "SQLite"],
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
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const stats = [
  { label: "Projects", value: 19 },
  { label: "Tools & Tech", value: 13 },
  { label: "Internships", value: 2 },
  { label: "Year Exp.", value: 1 },
];
