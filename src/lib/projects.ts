/**
 * Project case studies.
 *
 * Every fact here comes from the project's own README (and, for the MLOps
 * project, its TROUBLESHOOTING.md). Numbers appear only where the README
 * states them. If a README does not support a claim, the claim is not here.
 */

export type DiagramAccent = "violet" | "magenta" | "olive" | "amber";

export interface DiagramNode {
  label: string;
  note?: string;
  accent?: DiagramAccent;
}

export interface DiagramLane {
  title: string;
  nodes: DiagramNode[];
}

export interface ProjectDiagram {
  /** Full plain-language description, used as the diagram's accessible name. */
  description: string;
  lanes: DiagramLane[];
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  featured: boolean;

  /** Short type label, e.g. "MLOps pipeline". */
  kind: string;
  /** Main programming languages, for structured data. */
  languages: string[];
  overview: string[];
  diagram: ProjectDiagram;
  stackGroups: { label: string; items: string[] }[];
  decisions: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  challenges?: { title: string; problem: string; fix: string }[];
  snippet?: { title: string; lang: string; code: string; caption: string };
}

export const projects: Project[] = [
  {
    slug: "mlops-sentiment-analyzer",
    title: "MLOps Sentiment Analyzer",
    summary:
      "A sentiment analysis model served with FastAPI on AWS EKS, deployed by GitHub Actions and Argo CD, monitored with Prometheus.",
    problem:
      "Getting a machine learning model into production is mostly an infrastructure problem. The model has to be packaged without shipping gigabytes of unused libraries, it needs health checks that know whether the model has actually loaded, and every change should reach the cluster without anyone running kubectl by hand.",
    stack: [
      "Python",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "AWS EKS",
      "Terraform",
      "Argo CD",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
    ],
    repoUrl: "https://github.com/ajayautade/mlops-sentiment-analyzer",
    featured: true,
    kind: "MLOps pipeline",
    languages: ["Python", "HCL"],
    overview: [
      "This project takes a pre-trained HuggingFace DistilBERT sentiment model and runs it as a FastAPI service on Amazon EKS. The interesting part is everything around the model: the image build, the cluster, the delivery pipeline and the monitoring.",
      "One Git repository holds the application, the Kubernetes manifests, the Terraform code and the Argo CD application. A push to main runs the CI pipeline, the pipeline commits a new image tag back to the repository, and Argo CD rolls that tag out to the cluster.",
      "The README's own timeline puts a push to main at roughly eight minutes from commit to serving traffic, most of which is the image build and Argo CD's three-minute polling interval.",
    ],
    diagram: {
      description:
        "Architecture of the MLOps Sentiment Analyzer. A developer pushes to GitHub. GitHub Actions runs pytest, flake8 and black, and a Trivy scan, then builds a Docker image, pushes it to Docker Hub and commits the new image tag to the Kubernetes manifest. Inside an AWS VPC managed by Terraform, Argo CD on the EKS cluster detects the commit and rolls out the FastAPI and DistilBERT deployment, which scales between 2 and 10 pods. Prometheus scrapes the pods' metrics endpoint and Grafana displays them. An S3 bucket and an ECR repository sit alongside the cluster.",
      lanes: [
        {
          title: "Source",
          nodes: [
            { label: "git push", note: "main branch" },
            { label: "GitHub repo", note: "app, k8s, terraform, argocd" },
          ],
        },
        {
          title: "CI · GitHub Actions",
          nodes: [
            { label: "pytest", note: "24 tests", accent: "olive" },
            { label: "flake8 + black", accent: "olive" },
            { label: "Trivy scan", accent: "amber" },
            { label: "Build + push", note: "Docker Hub, SHA tag", accent: "violet" },
            { label: "Update manifest", note: "commit image tag", accent: "magenta" },
          ],
        },
        {
          title: "AWS · EKS cluster",
          nodes: [
            { label: "Argo CD", note: "polls every 3 min", accent: "magenta" },
            { label: "FastAPI + DistilBERT", note: "2–10 pods via HPA", accent: "violet" },
            { label: "Prometheus", note: "scrapes /metrics", accent: "amber" },
            { label: "Grafana", accent: "amber" },
          ],
        },
        {
          title: "AWS · supporting",
          nodes: [
            { label: "VPC", note: "2 AZs, NAT gateway" },
            { label: "ECR", note: "scan on push" },
            { label: "S3", note: "model artifacts" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Model and API", items: ["HuggingFace Transformers", "PyTorch (CPU build)", "FastAPI", "Uvicorn", "Pydantic"] },
      { label: "Packaging", items: ["Docker multi-stage build"] },
      { label: "Infrastructure", items: ["Terraform", "AWS VPC", "Amazon EKS", "Amazon ECR", "Amazon S3"] },
      { label: "Delivery", items: ["GitHub Actions", "Argo CD", "Trivy"] },
      { label: "Runtime", items: ["Kubernetes Deployment", "Horizontal Pod Autoscaler", "Startup, readiness and liveness probes"] },
      { label: "Observability", items: ["Prometheus", "Grafana", "ServiceMonitor"] },
    ],
    decisions: [
      {
        title: "A multi-stage image with CPU-only PyTorch",
        body: "The default PyTorch install pulls in CUDA libraries the EKS nodes can't use. Installing the CPU wheel and using a multi-stage build brings the image to about 800MB, against roughly 3GB for a naive build.",
      },
      {
        title: "Git as the only way to deploy",
        body: "CI never talks to the cluster. Its last job commits the new image tag to k8s/deployment.yaml, and Argo CD, running inside the cluster, pulls that change. The cluster credentials stay out of GitHub, and the repository always shows what is running.",
      },
      {
        title: "Rolling updates that never drop below capacity",
        body: "The deployment uses maxSurge 1 and maxUnavailable 0. A new pod has to pass its readiness probe before an old one is removed, which matters here because the model takes around twenty seconds to load.",
      },
      {
        title: "Probes that wait for the model",
        body: "A startup probe gives the container time to download and load the model before the readiness and liveness probes take over. Without it, Kubernetes would restart pods that were still loading.",
      },
      {
        title: "Autoscaling tuned for inference",
        body: "The HPA scales from 2 to 10 pods at 70% CPU or 80% memory. It scales up quickly (two pods a minute) and down slowly (one pod every two minutes after a five-minute stabilisation window), so short dips in traffic don't cause churn.",
      },
      {
        title: "Metrics about the model, not only the pod",
        body: "The API exports nine custom Prometheus metrics, including prediction latency, confidence score distribution, error counts and whether the model is loaded. Pod CPU tells you the service is up; these tell you whether it is doing its job.",
      },
    ],
    steps: [
      {
        title: "Serve the model",
        body: "Wrapped DistilBERT in a FastAPI app with single and batch prediction endpoints, a health endpoint and a metrics endpoint, and covered it with 24 pytest tests.",
      },
      {
        title: "Build the image",
        body: "Wrote a multi-stage Dockerfile and moved the model pre-download into its own script so the model is baked into the image at build time.",
      },
      {
        title: "Provision AWS with Terraform",
        body: "Split the Terraform into files per concern: a VPC across two availability zones with public and private subnets and a NAT gateway, an EKS 1.31 cluster with a managed node group, an ECR repository with scan-on-push and lifecycle rules, and a versioned, encrypted S3 bucket. Dev and prod use separate variable sets.",
      },
      {
        title: "Install the platform tools",
        body: "Terraform also installs Argo CD and the kube-prometheus-stack through their Helm charts, so a fresh cluster comes up with delivery and monitoring already in place.",
      },
      {
        title: "Wire up CI",
        body: "Five GitHub Actions jobs run in sequence: test, lint, security scan, build and push, then the manifest update. Documentation and Terraform changes are skipped so they don't trigger a rebuild.",
      },
      {
        title: "Hand delivery to Argo CD",
        body: "Applied the Argo CD application manifest that points at the k8s directory. From then on, any committed manifest change is synced to the cluster.",
      },
    ],
    challenges: [
      {
        title: "EKS node group failed to create",
        problem:
          "terraform apply failed with AsgInstanceLaunchFailures because the t3.medium instance type wasn't available to the account.",
        fix: "Switched the node group to m7i-flex.large, which also gives the pods 8GB of memory to work with.",
      },
      {
        title: "Docker build timeouts and a huge image",
        problem:
          "pip install torch downloads the CUDA build of PyTorch. The download timed out during builds and bloated an image that would only ever run on CPU nodes.",
        fix: "Pinned the CPU-only wheel (torch 2.6.0+cpu) from the PyTorch index. The library dropped to around 200MB and the builds stopped timing out.",
      },
      {
        title: "Trivy failing the pipeline",
        problem:
          "The security scan failed on HIGH severity findings in upstream Python packages that had no fix available yet.",
        fix: "Changed the Trivy step to fail only on CRITICAL findings, so unpatched third-party warnings are reported without blocking every deployment.",
      },
      {
        title: "Lint and formatting failures",
        problem: "flake8 failed on unused imports in the tests and black failed on formatting differences.",
        fix: "Removed the unused variables and reformatted the app directory with black so local and CI results match.",
      },
      {
        title: "IndentationError inside the Dockerfile",
        problem:
          "An inline Python script with line continuations in a RUN instruction broke with an IndentationError while pre-downloading the model.",
        fix: "Moved the download logic into a standalone download_model.py and ran that from the Dockerfile.",
      },
    ],
    snippet: {
      title: "hpa (summary)",
      lang: "yaml",
      caption: "The autoscaling targets from the project README.",
      code: `minReplicas: 2
maxReplicas: 10
metrics:
  - cpu:    70%   # target utilisation
  - memory: 80%
behavior:
  scaleUp:   +2 pods per 60s
  scaleDown: -1 pod per 120s   # 5 min stabilisation`,
    },
  },
  {
    slug: "moviesmonkey",
    title: "MoviesMonkey",
    summary:
      "A React movie discovery app with a full delivery pipeline: Docker, GitHub Actions, Helm, Terraform and a Prometheus monitoring stack.",
    problem:
      "A front-end app is easy to host and easy to neglect. I wanted to treat a small React app the way a production service is treated: linted and tested on every push, scanned for vulnerabilities, packaged as an image, deployable to Kubernetes in more than one environment, and monitored with real alert rules.",
    stack: ["React", "Docker", "GitHub Actions", "Kubernetes", "Helm", "Terraform", "Argo CD", "Prometheus", "Grafana"],
    repoUrl: "https://github.com/ajayautade/MoviesMonkey",
    liveUrl: "https://mymoviesmonkey.netlify.app",
    featured: true,
    kind: "Web app with a DevOps pipeline",
    languages: ["JavaScript", "HCL"],
    overview: [
      "MoviesMonkey is a React app for browsing upcoming and top-rated films, searching by title or genre and keeping a watchlist. It reads from the TMDB and OMDB APIs and has light and dark themes.",
      "The app itself is simple on purpose. The work is in the delivery side: two GitHub Actions workflows, a multi-stage Docker build, raw Kubernetes manifests and a Helm chart with separate dev and prod values, Terraform for an EKS cluster and VPC, and a monitoring stack with alert rules.",
      "The repository also documents a deployment on a K3s cluster running on an AWS EC2 instance, with Argo CD syncing the k8s directory and Prometheus and Grafana running alongside the app. A public preview of the front end is hosted on Netlify.",
    ],
    diagram: {
      description:
        "Architecture of MoviesMonkey. A push to GitHub triggers the CI workflow, which runs ESLint, unit tests, a production build and a Hadolint check of the Dockerfile. The CD workflow builds a Docker image, pushes it to Docker Hub and scans it with Trivy. Argo CD on a K3s cluster on AWS EC2 syncs the Kubernetes manifests every three minutes and runs two replicas of the app behind an Nginx ingress with a horizontal pod autoscaler. Prometheus, Alertmanager and Grafana monitor it.",
      lanes: [
        {
          title: "CI · ci.yml",
          nodes: [
            { label: "ESLint", accent: "olive" },
            { label: "Unit tests", note: "with coverage", accent: "olive" },
            { label: "Production build", accent: "violet" },
            { label: "Hadolint", note: "Dockerfile lint", accent: "amber" },
          ],
        },
        {
          title: "CD · cd.yml",
          nodes: [
            { label: "Docker build", note: "multi-stage", accent: "violet" },
            { label: "Docker Hub", note: "multi-tag push" },
            { label: "Trivy scan", accent: "amber" },
          ],
        },
        {
          title: "Cluster · K3s on EC2",
          nodes: [
            { label: "Argo CD", note: "auto-sync, 3 min", accent: "magenta" },
            { label: "Ingress", note: "Nginx" },
            { label: "App pods", note: "2 replicas + HPA", accent: "violet" },
          ],
        },
        {
          title: "Monitoring",
          nodes: [
            { label: "Prometheus", accent: "amber" },
            { label: "Alertmanager", note: "4 alert rules", accent: "amber" },
            { label: "Grafana", accent: "amber" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Application", items: ["React", "React Router", "Axios", "TMDB API", "OMDB API"] },
      { label: "Packaging", items: ["Docker multi-stage build", "Docker Compose", "Nginx"] },
      { label: "CI/CD", items: ["GitHub Actions", "ESLint", "Hadolint", "Trivy", "npm audit"] },
      { label: "Orchestration", items: ["Kubernetes", "Helm", "Argo CD", "K3s"] },
      { label: "Infrastructure", items: ["Terraform", "Amazon EKS", "AWS VPC", "AWS EC2"] },
      { label: "Monitoring", items: ["Prometheus", "Grafana", "Alertmanager", "Node Exporter", "Nginx Exporter"] },
    ],
    decisions: [
      {
        title: "Two workflows instead of one",
        body: "CI runs on pushes and pull requests to main and develop and only checks the code: lint, tests, build and a Dockerfile lint. CD runs on main and on version tags and is the only workflow that publishes an image. A pull request can never push to the registry.",
      },
      {
        title: "Raw manifests and a Helm chart",
        body: "The k8s directory holds plain manifests that Argo CD syncs directly. The Helm chart wraps the same resources with values files for dev and prod, so the two environments differ by configuration only.",
      },
      {
        title: "Nginx serving a static build",
        body: "The multi-stage build compiles the React app and copies the output into an Nginx image. The Nginx configuration lives in a ConfigMap, so caching rules can change without rebuilding the image.",
      },
      {
        title: "Alerts written down as rules",
        body: "Four alert rules ship with the repository: error rate above 5% for five minutes, P95 latency above two seconds, the app being unreachable, and memory above 90% for five minutes.",
      },
      {
        title: "A Makefile as the front door",
        body: "Build, run, compose and deploy commands are wrapped in make targets, so the common tasks are one command each and are the same on any machine.",
      },
    ],
    steps: [
      {
        title: "Containerise the app",
        body: "Wrote a multi-stage Dockerfile and Compose files with production and development profiles, the latter with hot reload.",
      },
      {
        title: "Add the CI workflow",
        body: "Lint with ESLint, run unit tests with coverage, produce a production build and validate the Dockerfile with Hadolint.",
      },
      {
        title: "Add the CD workflow",
        body: "Build and push a multi-tagged image to Docker Hub, scan it with Trivy and write a deployment summary to the Actions run.",
      },
      {
        title: "Write the Kubernetes resources",
        body: "A two-replica deployment with probes, a service, an Nginx ingress, a ConfigMap for the Nginx config and a horizontal pod autoscaler, then the same set as a Helm chart.",
      },
      {
        title: "Describe the infrastructure",
        body: "Terraform for an EKS cluster and its VPC, kept in the repository next to the app.",
      },
      {
        title: "Deploy with GitOps and monitor",
        body: "Ran the app on a K3s cluster on an EC2 instance, with Argo CD watching the k8s directory and Prometheus, Grafana and Alertmanager in a monitoring namespace.",
      },
    ],
    snippet: {
      title: "alert_rules.yml (summary)",
      lang: "yaml",
      caption: "The four alert conditions listed in the README.",
      code: `HighErrorRate:      5xx > 5% for 5m
HighResponseTime:   P95 latency > 2s
ContainerDown:      app unreachable
HighMemoryUsage:    memory > 90% for 5m`,
    },
  },
  {
    slug: "notes-app-django",
    title: "Full-Stack Notes App",
    summary: "A small React and Django notes app, packaged as a Docker image and served behind an Nginx reverse proxy.",
    problem:
      "Before automating deployments I wanted a plain application to practise the basics on: put a two-part app (a React front end and a Django back end) into one image, run it as a container, and put a reverse proxy in front of it on a Linux server.",
    stack: ["Python", "Django", "React", "Docker", "Nginx"],
    repoUrl: "https://github.com/ajayautade/notes-app-django",
    featured: false,
    kind: "Containerised web app",
    languages: ["Python", "JavaScript"],
    overview: [
      "This is a simple notes application with a React front end and a Django back end. It is the smallest project here and the most basic: build an image, run a container, expose it through Nginx.",
      "I keep it in the portfolio because it is the starting point the other projects build on. The pipelines and clusters in the later projects automate exactly these steps.",
    ],
    diagram: {
      description:
        "Architecture of the notes app. A browser sends requests to an Nginx reverse proxy on the server. Nginx forwards them to a Docker container that runs the Django application with the React front end on port 8000.",
      lanes: [
        { title: "Client", nodes: [{ label: "Browser" }] },
        { title: "Server", nodes: [{ label: "Nginx", note: "reverse proxy", accent: "amber" }] },
        {
          title: "Container",
          nodes: [
            { label: "Django", note: "port 8000", accent: "violet" },
            { label: "React build", accent: "magenta" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Application", items: ["Python 3.9", "Django", "React", "Node.js"] },
      { label: "Packaging", items: ["Docker"] },
      { label: "Serving", items: ["Nginx"] },
    ],
    decisions: [
      {
        title: "One image for the whole app",
        body: "The front end and back end ship together in a single image. For an app this size that keeps the deployment to one build and one container.",
      },
      {
        title: "Nginx in front of the container",
        body: "The container listens on port 8000 and isn't exposed directly. Nginx on the host takes public traffic and proxies it through, which is where TLS and caching would go.",
      },
    ],
    steps: [
      { title: "Build", body: "Build the image from the repository's Dockerfile with docker build." },
      { title: "Run", body: "Start the container in the background and publish port 8000." },
      { title: "Proxy", body: "Install Nginx on the server and configure it as a reverse proxy to the container." },
    ],
    snippet: {
      title: "build and run",
      lang: "bash",
      caption: "The two commands from the README.",
      code: `docker build -t notes-app .
docker run -d -p 8000:8000 notes-app:latest`,
    },
  },
  {
    slug: "end-to-end-cicd-pipeline",
    title: "End-to-End CI/CD Pipeline",
    summary:
      "A FastAPI service with CI on GitHub Actions, local Kubernetes on kind with Helm, and keyless deploys to AWS through OIDC.",
    problem:
      "Most pipeline tutorials stop at building an image, and most of them store long-lived AWS keys in GitHub secrets. I wanted one small repository that goes all the way from a test run to a running service, works on a laptop without any cloud account, and deploys to AWS without storing a single access key.",
    stack: ["FastAPI", "Docker", "Kubernetes", "kind", "Helm", "GitHub Actions", "Terraform", "AWS ECR", "AWS ECS Fargate"],
    repoUrl: "https://github.com/ajayautade/End-To-End-CICD-Pipeline",
    featured: true,
    kind: "CI/CD reference project",
    languages: ["Python", "HCL"],
    overview: [
      "The application is a minimal FastAPI service with a health endpoint and a small test suite. It exists to give the pipeline something real to build, test and deploy.",
      "There are two deployment paths. Locally, a kind cluster and a Helm chart run the service on Kubernetes with a couple of make commands. On AWS, Terraform provisions ECR, ECS Fargate and a load balancer, and GitHub Actions deploys there on every push to main.",
      "The AWS path uses GitHub's OIDC provider. The workflow assumes an IAM role for the length of the job, so no AWS access keys are stored in the repository.",
    ],
    diagram: {
      description:
        "Architecture of the end-to-end CI/CD pipeline. A push to GitHub triggers GitHub Actions, which runs unit tests, helm lint and terraform fmt, then builds a Docker image and publishes it to GitHub Container Registry. For AWS, the workflow assumes an IAM role through OIDC, pushes the image to ECR, registers a new ECS task definition and updates the Fargate service behind an application load balancer. Locally, the same image is deployed to a kind cluster with a Helm chart.",
      lanes: [
        {
          title: "CI · GitHub Actions",
          nodes: [
            { label: "Unit tests", accent: "olive" },
            { label: "helm lint", accent: "olive" },
            { label: "terraform fmt", accent: "olive" },
            { label: "Docker build", accent: "violet" },
            { label: "GHCR", note: "latest + SHA" },
          ],
        },
        {
          title: "AWS · via OIDC",
          nodes: [
            { label: "IAM role", note: "no stored keys", accent: "amber" },
            { label: "ECR", note: "SHA + latest" },
            { label: "ECS Fargate", note: "new task revision", accent: "violet" },
            { label: "ALB", note: "public URL", accent: "magenta" },
          ],
        },
        {
          title: "Local",
          nodes: [
            { label: "kind cluster", accent: "violet" },
            { label: "Helm chart", accent: "magenta" },
            { label: "port-forward", note: ":8000/health" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Application", items: ["FastAPI", "Uvicorn", "pytest"] },
      { label: "Packaging", items: ["Docker", "Helm"] },
      { label: "CI", items: ["GitHub Actions", "GitHub Container Registry"] },
      { label: "Local cluster", items: ["kind", "kubectl"] },
      { label: "AWS", items: ["Terraform", "Amazon ECR", "ECS Fargate", "Application Load Balancer", "IAM OIDC"] },
    ],
    decisions: [
      {
        title: "OIDC instead of access keys",
        body: "Terraform creates an IAM role that trusts GitHub's OIDC provider for this repository. The workflow exchanges a short-lived token for temporary credentials. There is nothing long-lived to leak or rotate.",
      },
      {
        title: "CI checks the infrastructure code too",
        body: "The same workflow that runs the unit tests also runs helm lint on the chart and terraform fmt on the infrastructure. A broken chart or unformatted Terraform fails the build just like a failing test.",
      },
      {
        title: "Every image is tagged with its commit",
        body: "Images are pushed with both the commit SHA and latest. The SHA tag is what the ECS task definition references, so a running task can always be traced back to a commit.",
      },
      {
        title: "kind for a free, disposable cluster",
        body: "The local path needs only Docker. make kind-up creates a cluster, make deploy-local installs the chart, and make kind-down removes it. It is a way to test Kubernetes changes without paying for a cluster.",
      },
      {
        title: "AWS deployment is opt-in",
        body: "The AWS steps only run when the repository variables for region, role and repository are set. Without them the pipeline still tests, lints and publishes to GHCR.",
      },
    ],
    steps: [
      { title: "Write the service", body: "A minimal FastAPI app and a small unit test suite." },
      { title: "Containerise it", body: "A Dockerfile that runs Uvicorn on port 8000." },
      { title: "Add the local workflow", body: "Scripts for a kind cluster and a Helm chart for the app, wrapped in make targets." },
      {
        title: "Add CI",
        body: "A GitHub Actions workflow that runs the tests, lints the chart, checks the Terraform formatting, builds the image and deploys into a kind cluster as an end-to-end check.",
      },
      {
        title: "Add the AWS path",
        body: "Terraform for ECR, ECS Fargate, the load balancer and the GitHub OIDC role, then workflow steps that push to ECR, register a new task definition and wait for the service to become stable.",
      },
    ],
    snippet: {
      title: "local Kubernetes",
      lang: "bash",
      caption: "The whole local loop, from the README.",
      code: `make kind-up
make deploy-local
kubectl port-forward svc/myapp 8000:8000
curl http://localhost:8000/health
make kind-down`,
    },
  },
  {
    slug: "gitops-argocd-deployment",
    title: "GitOps Argo CD Deployment",
    summary:
      "An EKS cluster built with Terraform that bootstraps Argo CD and monitoring, then deploys a Flask API straight from Git.",
    problem:
      "A cluster that is configured by hand drifts. Someone edits a deployment to fix an incident, nobody writes it down, and the manifests in Git stop describing what is running. I wanted a setup where Git is the only way to change the cluster and where a new cluster arrives with its tooling already installed.",
    stack: ["Argo CD", "Kubernetes", "AWS EKS", "Terraform", "Helm", "Docker", "GitHub Actions", "Prometheus", "Grafana"],
    repoUrl: "https://github.com/ajayautade/gitops-argocd-app",
    featured: false,
    kind: "GitOps platform",
    languages: ["Python", "HCL"],
    overview: [
      "One terraform apply builds a VPC and an Amazon EKS cluster, then uses the Helm provider to install Argo CD and the Prometheus and Grafana stack as soon as the cluster is ready. The README notes that this takes about fifteen minutes.",
      "The application is a small Python Flask API in an Alpine-based image. GitHub Actions builds the image, pushes it to Docker Hub and updates the image tag in the Kubernetes manifests.",
      "Argo CD watches the k8s directory of the repository. When the tag changes, it syncs the cluster to match. Editing app.py and pushing is the whole deployment process.",
    ],
    diagram: {
      description:
        "Architecture of the GitOps deployment. Terraform creates an AWS VPC and an EKS cluster and installs Argo CD and the Prometheus and Grafana stack through Helm. A push to GitHub triggers GitHub Actions, which builds a Docker image, pushes it to Docker Hub and updates the image tag in the Kubernetes manifests. Argo CD detects the manifest change and syncs the Flask API on the cluster.",
      lanes: [
        {
          title: "Provisioning · Terraform",
          nodes: [
            { label: "VPC", accent: "olive" },
            { label: "EKS cluster", accent: "violet" },
            { label: "Helm: Argo CD", accent: "magenta" },
            { label: "Helm: monitoring", note: "Prometheus + Grafana", accent: "amber" },
          ],
        },
        {
          title: "CI · GitHub Actions",
          nodes: [
            { label: "git push" },
            { label: "Docker build", note: "Alpine image", accent: "violet" },
            { label: "Docker Hub" },
            { label: "Update manifests", note: "new image tag", accent: "magenta" },
          ],
        },
        {
          title: "CD · in the cluster",
          nodes: [
            { label: "Argo CD", note: "watches k8s/", accent: "magenta" },
            { label: "Flask API", accent: "violet" },
            { label: "Grafana", accent: "amber" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Infrastructure", items: ["Terraform", "AWS VPC", "Amazon EKS", "Helm provider"] },
      { label: "Application", items: ["Python", "Flask", "Docker (Alpine)"] },
      { label: "Delivery", items: ["GitHub Actions", "Docker Hub", "Argo CD"] },
      { label: "Monitoring", items: ["Prometheus", "Grafana"] },
    ],
    decisions: [
      {
        title: "Bootstrap the tools with the cluster",
        body: "Argo CD and the monitoring stack are installed by the same Terraform run that creates the cluster. There is no separate, manual setup phase between a cluster existing and a cluster being usable.",
      },
      {
        title: "Pull, don't push",
        body: "CI updates a file in Git and stops there. Argo CD pulls the change from inside the cluster. If someone edits a resource by hand, Argo CD shows the difference from Git and can put it back.",
      },
      {
        title: "A small base image",
        body: "The API runs on an Alpine-based image, which keeps the image small and reduces the number of packages that can carry vulnerabilities.",
      },
      {
        title: "Destroy is part of the design",
        body: "An EKS control plane costs money while it exists. Everything is created by Terraform, so terraform destroy removes all of it in one command when the work is done.",
      },
    ],
    steps: [
      { title: "Provision", body: "Run terraform apply to create the VPC, the EKS cluster, Argo CD and the monitoring stack." },
      { title: "Connect", body: "Update the local kubeconfig with the aws eks command that Terraform prints." },
      { title: "Configure CI", body: "Add the Docker Hub username and token as GitHub Actions secrets so the workflow can push images." },
      { title: "Register the app", body: "Apply argocd-app.yaml, which points Argo CD at the k8s directory in the repository." },
      { title: "Ship a change", body: "Edit the Flask app and push. CI builds the image and updates the manifest; Argo CD rolls it out." },
    ],
    snippet: {
      title: "bring the platform up",
      lang: "bash",
      caption: "From the README. The region shown is the one the README uses.",
      code: `cd terraform/
terraform init
terraform apply

aws eks --region ap-south-1 update-kubeconfig --name gitops-argocd-cluster
kubectl apply -f argocd-app.yaml`,
    },
  },
  {
    slug: "s3-database-backup-automation",
    title: "S3 Database Backup Automation",
    summary:
      "A Bash script that dumps a MySQL or MariaDB database, compresses it, uploads it to S3 and removes old backups on a schedule.",
    problem:
      "Manual database backups get forgotten, and a backup stored on the same server as the database is lost along with it when that server fails. Backups need to happen without anyone remembering to run them, and they need to leave the machine.",
    stack: ["Bash", "AWS S3", "MySQL/MariaDB", "Linux", "Cron"],
    repoUrl: "https://github.com/ajayautade/s3-db-backup-automation",
    featured: false,
    kind: "Automation script",
    languages: ["Shell"],
    overview: [
      "db-backup-s3.sh is a single script with a configuration block at the top. It exports the database with mysqldump, compresses the dump, uploads the archive to an S3 bucket with the AWS CLI and deletes backups older than a set number of days.",
      "It is meant to be run by cron. The README schedules it for 2:00 AM every day and sends its output to a log file, so there is a record of each run.",
      "It is a small tool, and that is the point: no agent, no service, nothing to keep running. It needs mysqldump, the AWS CLI and a bucket.",
    ],
    diagram: {
      description:
        "Flow of the backup script. Cron starts the script every night at 2 AM. The script runs mysqldump against the MySQL or MariaDB database, compresses the dump into a tar.gz archive, uploads the archive to an Amazon S3 bucket with the AWS CLI, and then deletes backups older than the retention period. Output is appended to a log file.",
      lanes: [
        {
          title: "Schedule",
          nodes: [
            { label: "cron", note: "0 2 * * *", accent: "amber" },
            { label: "db-backup-s3.sh", accent: "violet" },
          ],
        },
        {
          title: "On the server",
          nodes: [
            { label: "mysqldump", note: "MySQL / MariaDB", accent: "olive" },
            { label: "Compress", note: ".tar.gz", accent: "olive" },
            { label: "Log", note: "/var/log/db-backup.log" },
          ],
        },
        {
          title: "Off the server",
          nodes: [
            { label: "aws s3 upload", accent: "magenta" },
            { label: "S3 bucket", accent: "violet" },
            { label: "Rotate", note: "older than 7 days" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Script", items: ["Bash", "mysqldump", "tar / gzip"] },
      { label: "Storage", items: ["Amazon S3", "AWS CLI"] },
      { label: "Scheduling", items: ["cron", "Linux"] },
    ],
    decisions: [
      {
        title: "Backups leave the server",
        body: "The archive is uploaded to S3 as part of the same run. A disk failure or a lost server doesn't take the backups with it.",
      },
      {
        title: "Compress before uploading",
        body: "SQL dumps compress well. Compressing first means less to transfer and less to store.",
      },
      {
        title: "Retention is a setting",
        body: "RETENTION_DAYS controls how long backups are kept and defaults to seven. Old archives are removed automatically, so storage doesn't grow without limit.",
      },
      {
        title: "Known limits, and what I would change",
        body: "The script reads the database password from its own configuration block and uses credentials from aws configure. The README lists the improvements I'd make for production use: load credentials from an environment file, attach an IAM role to the server instead of using access keys, and send a notification when a run finishes.",
      },
    ],
    steps: [
      { title: "Install the prerequisites", body: "mysqldump, the AWS CLI and an S3 bucket to write to." },
      { title: "Configure", body: "Set the database user, password, database name, bucket name and retention period in the script's configuration block." },
      { title: "Test by hand", body: "Run the script once and check that a .tar.gz archive appears in the bucket." },
      { title: "Schedule", body: "Add a crontab entry so the script runs every night and appends its output to a log file." },
    ],
    snippet: {
      title: "crontab",
      lang: "cron",
      caption: "Runs the backup at 2:00 AM every day and keeps a log.",
      code: `0 2 * * * /bin/bash /path/to/s3-db-backup-automation/db-backup-s3.sh >> /var/log/db-backup.log 2>&1`,
    },
  },
  {
    slug: "aws-3tier-architecture",
    title: "AWS 3-Tier Architecture",
    summary:
      "A three-tier AWS setup in Terraform: a load balancer, an auto-scaled Flask tier and a MySQL database, across two availability zones.",
    problem:
      "A single server that holds the web app and the database is easy to start with and hard to keep running. I wanted the standard alternative written down as code: separate tiers in separate subnets, nothing but the load balancer reachable from the internet, and the whole thing created and destroyed with one command.",
    stack: ["Terraform", "AWS VPC", "ALB", "EC2 Auto Scaling", "RDS MySQL", "S3", "DynamoDB", "Flask"],
    repoUrl: "https://github.com/ajayautade/aws-3tier-architecture",
    featured: false,
    kind: "Infrastructure as Code",
    languages: ["HCL", "Python"],
    overview: [
      "The project provisions a classic three-tier layout on AWS with Terraform. An application load balancer sits in public subnets, a Flask application runs on EC2 instances in private subnets, and an RDS MySQL 8.0 database sits in its own isolated subnets.",
      "Everything is spread across two availability zones. The EC2 tier is an Auto Scaling group that runs between two and six instances and scales on CloudWatch CPU metrics.",
      "The Terraform code is split into five modules (vpc, security-groups, alb, asg and rds) with a dev environment that wires them together. State is kept in an S3 bucket with a DynamoDB table for locking.",
    ],
    diagram: {
      description:
        "Architecture of the AWS three-tier project. Inside one VPC with the range 10.0.0.0/16, users reach an application load balancer in two public subnets through an internet gateway. The load balancer forwards to Flask on EC2 instances in two private application subnets, managed by an Auto Scaling group of two to six instances that reach the internet through a NAT gateway. The instances connect to an RDS MySQL 8.0 database in two isolated database subnets. Terraform state lives in an S3 bucket with a DynamoDB lock table.",
      lanes: [
        {
          title: "Public subnets",
          nodes: [
            { label: "Internet gateway" },
            { label: "Application load balancer", note: "ports 80 / 443", accent: "magenta" },
            { label: "NAT gateway", note: "outbound only" },
          ],
        },
        {
          title: "Private · application",
          nodes: [
            { label: "Auto Scaling group", note: "2 to 6 instances", accent: "violet" },
            { label: "EC2 · Flask", note: "two AZs", accent: "violet" },
            { label: "CloudWatch", note: "CPU alarms", accent: "amber" },
          ],
        },
        {
          title: "Private · data",
          nodes: [{ label: "RDS MySQL 8.0", note: "port 3306 from app tier only", accent: "olive" }],
        },
        {
          title: "Terraform state",
          nodes: [
            { label: "S3 bucket", note: "remote state" },
            { label: "DynamoDB", note: "state lock" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Network", items: ["VPC", "Public and private subnets", "Internet gateway", "NAT gateway", "Route tables"] },
      { label: "Compute", items: ["EC2 launch template", "Auto Scaling group", "Application Load Balancer"] },
      { label: "Data", items: ["Amazon RDS MySQL 8.0"] },
      { label: "Infrastructure as Code", items: ["Terraform modules", "S3 remote state", "DynamoDB locking", "Make"] },
      { label: "Application", items: ["Flask"] },
    ],
    decisions: [
      {
        title: "Security groups chained tier to tier",
        body: "The load balancer accepts HTTP and HTTPS from anywhere. The application tier accepts HTTP only from the load balancer's security group, and SSH only from one admin IP. The database accepts port 3306 only from the application tier. There is no route from the internet to the database.",
      },
      {
        title: "Six subnets, three purposes",
        body: "Each tier gets two subnets, one per availability zone: 10.0.1.0/24 and 10.0.2.0/24 are public, 10.0.3.0/24 and 10.0.4.0/24 hold the application, and 10.0.5.0/24 and 10.0.6.0/24 hold the database.",
      },
      {
        title: "Scale on CPU, slowly down",
        body: "One instance is added when CPU stays above 70% for two evaluation periods, with a 120 second cooldown. One is removed when CPU stays below 30% for five periods, with a 300 second cooldown. Scaling in is deliberately slower than scaling out.",
      },
      {
        title: "Remote state with locking",
        body: "A script creates the S3 bucket and DynamoDB table before the first terraform init. State is not kept on a laptop, and two applies cannot run at the same time.",
      },
      {
        title: "One module per concern",
        body: "The VPC, security groups, load balancer, Auto Scaling group and database are separate modules with their own inputs and outputs. The dev environment is a thin layer that connects them, so a second environment would reuse the same modules.",
      },
    ],
    steps: [
      { title: "Create the state backend", body: "Run scripts/init-backend.sh to create the S3 bucket and the DynamoDB lock table." },
      { title: "Set the variables", body: "Put your IP address and an existing EC2 key pair name in environments/dev/terraform.tfvars." },
      { title: "Plan and apply", body: "make init, make plan, make apply. The README notes the apply takes roughly five to ten minutes, mostly waiting for RDS." },
      { title: "Open the application", body: "Terraform prints the load balancer's DNS name. The Flask page it serves reads from the RDS database." },
      { title: "Destroy it", body: "The stack is meant to be torn down after use, so nothing keeps billing." },
    ],
    snippet: {
      title: "security group chain",
      lang: "text",
      caption: "Allowed traffic between tiers, from the README.",
      code: `Internet --[80/443]--> ALB SG --[80]--> App SG --[3306]--> DB SG
                                          ^
                                  [22]----+
                              (admin IP only)`,
    },
  },
  {
    slug: "k8s-predictscale",
    title: "K8s PredictScale",
    summary:
      "A predictive autoscaler for Kubernetes that forecasts load from Prometheus metrics and scales deployments ahead of demand.",
    problem:
      "The Horizontal Pod Autoscaler reacts. It adds pods after CPU or memory has already crossed a threshold, and new pods need time to start, so the first minutes of a traffic spike are served by too few of them. I wanted to explore the other approach: forecast the load from recent metrics and scale before it arrives, with HPA left in place as a safety net.",
    stack: ["Python", "TensorFlow/Keras", "Prophet", "FastAPI", "Prometheus", "Grafana", "Kubernetes", "Terraform", "GitHub Actions", "Docker"],
    repoUrl: "https://github.com/ajayautade/k8s-predictscale",
    featured: false,
    kind: "Kubernetes autoscaling",
    languages: ["Python", "HCL"],
    overview: [
      "PredictScale is a Python service that runs next to a workload on Kubernetes. It reads metrics from Prometheus, turns them into features, forecasts load with two models, and asks the Kubernetes API to change the replica count.",
      "The code is organised as a pipeline of four parts: a collector, a preprocessor, a prediction engine and a scaling controller, with a FastAPI server for monitoring and control.",
      "The repository includes a Docker Compose setup that starts Prometheus, Grafana, a sample NGINX deployment and the engine, plus scripts to generate synthetic traffic, train the models and run load tests. The README's roadmap still lists most phases as open, so I treat this as a working design and an experiment, not a finished product.",
    ],
    diagram: {
      description:
        "Architecture of K8s PredictScale. Application pods expose metrics that Prometheus scrapes every 15 seconds. The collector service queries Prometheus with PromQL for CPU, memory, request rate, latency, error rate and network metrics. The preprocessor cleans the data and builds features such as rolling averages, lag values and time-of-day encodings. The prediction engine combines an LSTM model and a Prophet model into one weighted forecast. The scaling controller turns the forecast into a replica count, applies safety limits and calls the Kubernetes API to scale the deployment. A FastAPI server and Grafana dashboards expose predictions against actual values.",
      lanes: [
        {
          title: "Cluster",
          nodes: [
            { label: "Application pods", note: "the workload being scaled" },
            { label: "Prometheus", note: "scrapes every 15s", accent: "amber" },
          ],
        },
        {
          title: "PredictScale pipeline",
          nodes: [
            { label: "Collector", note: "PromQL queries", accent: "olive" },
            { label: "Preprocessor", note: "clean, features, normalise", accent: "olive" },
            { label: "Prediction engine", note: "LSTM + Prophet", accent: "violet" },
            { label: "Scaling controller", note: "decision + safety guard", accent: "magenta" },
          ],
        },
        {
          title: "Outputs",
          nodes: [
            { label: "Kubernetes API", note: "scale the deployment", accent: "magenta" },
            { label: "FastAPI", note: "monitoring and control" },
            { label: "Grafana", note: "predicted vs actual" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Forecasting", items: ["TensorFlow/Keras (LSTM)", "Prophet", "Pandas", "NumPy"] },
      { label: "Service", items: ["Python 3.11", "FastAPI", "APScheduler", "prometheus-client", "Kubernetes Python client"] },
      { label: "Monitoring", items: ["Prometheus", "Grafana"] },
      { label: "Deployment", items: ["Docker", "Docker Compose", "Kustomize overlays", "Helm chart"] },
      { label: "Infrastructure", items: ["Terraform (VPC, EKS, monitoring)", "Amazon ECR"] },
      { label: "CI", items: ["GitHub Actions", "flake8", "black", "isort", "mypy", "pytest"] },
    ],
    decisions: [
      {
        title: "Two models, one forecast",
        body: "The LSTM takes the last 60 time steps and predicts the next 10. Prophet models daily and weekly seasonality on the raw series. The two outputs are combined with a weight that shifts toward whichever model has had the lower recent error.",
      },
      {
        title: "Features, not raw metrics",
        body: "The preprocessor adds rolling means, rates of change, lagged values from 15 minutes and an hour earlier, and sine and cosine encodings of the hour. Traffic has a daily shape, and these features let the model see it.",
      },
      {
        title: "A safety guard between forecast and cluster",
        body: "The controller has a separate safety module between the decision engine and the Kubernetes scaler. A forecast is a suggestion; limits on how far and how fast the replica count can move are enforced before anything is applied.",
      },
      {
        title: "Alongside HPA, not instead of it",
        body: "The predictive scaler is meant to act early, while the standard autoscaler stays in place to react if a forecast is wrong.",
      },
      {
        title: "Runs without a cluster",
        body: "Docker Compose brings up the full loop locally, and a script generates two weeks of synthetic traffic to train on. That makes it possible to work on the models without paying for EKS.",
      },
    ],
    steps: [
      { title: "Collect", body: "A scheduled collector queries Prometheus and stores recent metrics in a local buffer." },
      { title: "Prepare", body: "A preprocessing pipeline cleans gaps and outliers, builds features and normalises them into sequences." },
      { title: "Predict", body: "LSTM and Prophet models are trained and combined by an ensemble module, managed by a model manager." },
      { title: "Decide and scale", body: "A decision engine converts the forecast into a target replica count, the safety guard checks it, and the scaler calls the Kubernetes API." },
      { title: "Package and test", body: "A Dockerfile, Kustomize manifests with RBAC, unit and integration tests, and a GitHub Actions workflow that lints, type-checks, tests and builds the image." },
    ],
    snippet: {
      title: "try the models locally",
      lang: "bash",
      caption: "From the README: generate synthetic traffic, then train on it.",
      code: `python3 scripts/generate_synthetic_data.py --hours 336 --output data.csv
python3 scripts/train_model.py --data data.csv
python3 scripts/load_test.py --mode spike --url http://localhost:8080`,
    },
  },
  {
    slug: "terraform-templates",
    title: "Terraform Templates",
    summary:
      "Six ready-to-edit Terraform templates for common AWS resources: EC2, security groups, VPC, S3, RDS and EKS.",
    problem:
      "Most small AWS tasks start the same way: an instance, a network, a bucket, a database. Writing that Terraform from an empty file each time is slow, and copying it from an old project brings that project's assumptions along. I wanted a small set of clean starting points where the only thing to change is a variables file.",
    stack: ["Terraform", "AWS EC2", "AWS VPC", "S3", "RDS", "EKS"],
    repoUrl: "https://github.com/ajayautade/terraform-templates",
    featured: false,
    kind: "Terraform templates",
    languages: ["HCL"],
    overview: [
      "This repository is a collection of standalone Terraform templates for AWS. Each one lives in its own folder with a terraform.tfvars file for the values you are expected to change.",
      "There are six templates: a single EC2 instance with a security group, a security group with common DevOps ports, a VPC with public and private subnets, an S3 bucket with versioning and encryption, an RDS database for MySQL or PostgreSQL, and an EKS cluster.",
      "The README is written for people new to Terraform. It walks through installing the tools, configuring AWS credentials, and the init, plan, apply and destroy cycle.",
    ],
    diagram: {
      description:
        "Workflow for the Terraform templates. You pick one of six template folders (EC2 instance, security group, VPC, S3 bucket, RDS or EKS), edit its terraform.tfvars file, then run terraform init, terraform plan and terraform apply to create the resources in AWS. Running terraform destroy removes them again.",
      lanes: [
        {
          title: "Pick a template",
          nodes: [
            { label: "ec2-instance" },
            { label: "security-group" },
            { label: "vpc" },
            { label: "s3-bucket" },
            { label: "rds" },
            { label: "eks" },
          ],
        },
        {
          title: "Configure",
          nodes: [{ label: "terraform.tfvars", note: "your values", accent: "amber" }],
        },
        {
          title: "Run",
          nodes: [
            { label: "init", accent: "olive" },
            { label: "plan", accent: "olive" },
            { label: "apply", accent: "violet" },
            { label: "destroy", note: "when finished", accent: "magenta" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Compute", items: ["EC2 instance", "EKS cluster"] },
      { label: "Network", items: ["VPC with public and private subnets", "Security group"] },
      { label: "Storage and data", items: ["S3 bucket with versioning and encryption", "RDS MySQL / PostgreSQL"] },
      { label: "Tooling", items: ["Terraform", "AWS CLI"] },
    ],
    decisions: [
      {
        title: "One folder per resource",
        body: "The templates do not depend on each other. You can copy a single folder into another project without bringing anything else along.",
      },
      {
        title: "Values live in terraform.tfvars",
        body: "The resource definitions stay untouched. Region, names and sizes are set in one variables file, which keeps the code readable and makes the differences between two uses obvious.",
      },
      {
        title: "Safe defaults for storage",
        body: "The S3 template turns on versioning and encryption from the start, so a bucket created from it is not left in the default state.",
      },
      {
        title: "Destroy is part of the workflow",
        body: "The README treats terraform destroy as a normal last step, with a reminder that AWS bills by the hour. It also warns against committing state files, which can contain sensitive values.",
      },
    ],
    steps: [
      { title: "Install and configure", body: "Install Terraform and the AWS CLI, then run aws configure with your access keys and region." },
      { title: "Choose a template", body: "Clone the repository and change into the folder for the resource you need." },
      { title: "Edit the variables", body: "Open terraform.tfvars and set the values for your account." },
      { title: "Apply", body: "terraform init once, terraform plan to preview, terraform apply to create." },
      { title: "Clean up", body: "terraform destroy when you are done." },
    ],
    snippet: {
      title: "using a template",
      lang: "bash",
      caption: "The full cycle for any of the six templates.",
      code: `git clone https://github.com/ajayautade/terraform-templates.git
cd terraform-templates/vpc
nano terraform.tfvars
terraform init
terraform plan
terraform apply
terraform destroy`,
    },
  },
  {
    slug: "kind-voting-app",
    title: "Kind Voting App with Argo CD",
    summary:
      "A three-node kind cluster on an EC2 instance, running Docker's example voting app through Argo CD with Prometheus and Grafana.",
    problem:
      "A managed Kubernetes cluster costs money every hour it exists, which makes it a poor place to practise. I wanted a multi-node cluster on a single EC2 instance where I could work through the full routine: create the cluster, install Argo CD, deploy a multi-service application from Git, and watch it with a dashboard and metrics.",
    stack: ["Kubernetes", "kind", "Argo CD", "AWS EC2", "Docker", "Prometheus", "Grafana"],
    repoUrl: "https://github.com/ajayautade/kind-voting-app",
    featured: false,
    kind: "GitOps practice cluster",
    languages: ["YAML", "Shell"],
    overview: [
      "This project is a step-by-step setup of Kubernetes with kind on one AWS EC2 instance. The cluster has one control-plane node and two workers, all running as Docker containers.",
      "The workload is Docker's public example voting app, which I did not write. It has five parts: a Python voting front end, Redis, a .NET worker, a Postgres database and a Node.js results page. That mix is what makes it useful for practising deployments.",
      "My part is the platform around it: the kind configuration, the install scripts, the Kubernetes Dashboard, Argo CD connected to the repository, and Prometheus and Grafana for monitoring. The repository also keeps the full list of commands I used.",
    ],
    diagram: {
      description:
        "Architecture of the kind voting app project. On a single AWS EC2 instance, Docker runs a kind cluster with one control-plane node and two worker nodes. Argo CD, installed in the cluster, reads the Kubernetes manifests from the Git repository and deploys the voting application: a Python vote front end writes to Redis, a .NET worker moves votes from Redis into Postgres, and a Node.js result page reads from Postgres. The Kubernetes Dashboard, Prometheus and Grafana run alongside for management and monitoring.",
      lanes: [
        {
          title: "Host",
          nodes: [
            { label: "AWS EC2 instance" },
            { label: "Docker" },
            { label: "kind cluster", note: "1 control plane, 2 workers", accent: "violet" },
          ],
        },
        {
          title: "Delivery",
          nodes: [
            { label: "Git repository", note: "k8s-specifications/" },
            { label: "Argo CD", note: "syncs manifests", accent: "magenta" },
          ],
        },
        {
          title: "Voting app",
          nodes: [
            { label: "vote", note: "Python", accent: "olive" },
            { label: "Redis" },
            { label: "worker", note: ".NET", accent: "olive" },
            { label: "Postgres" },
            { label: "result", note: "Node.js", accent: "olive" },
          ],
        },
        {
          title: "Operations",
          nodes: [
            { label: "Kubernetes Dashboard" },
            { label: "Prometheus", accent: "amber" },
            { label: "Grafana", accent: "amber" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Cluster", items: ["kind", "Docker", "kubectl", "AWS EC2"] },
      { label: "Delivery", items: ["Argo CD", "Kubernetes manifests"] },
      { label: "Workload", items: ["Docker example voting app (Python, .NET, Node.js, Redis, Postgres)"] },
      { label: "Operations", items: ["Kubernetes Dashboard", "Prometheus", "Grafana"] },
    ],
    decisions: [
      {
        title: "kind instead of a managed cluster",
        body: "kind runs each Kubernetes node as a Docker container, so a three-node cluster fits on one EC2 instance. It can be deleted and recreated in a couple of minutes, which suits practice better than a cluster that takes a quarter of an hour to provision.",
      },
      {
        title: "Three nodes, not one",
        body: "The config file defines a control plane and two workers. Scheduling, node failures and services across nodes only behave realistically when there is more than one node.",
      },
      {
        title: "An existing application as the workload",
        body: "Using Docker's sample app kept the focus on the platform. Five services in three languages with two data stores is enough to exercise deployments, services and startup order.",
      },
      {
        title: "Deployments through Argo CD",
        body: "The manifests are applied by Argo CD from the repository instead of by hand with kubectl, so the cluster follows what is in Git.",
      },
    ],
    steps: [
      { title: "Prepare the instance", body: "Launch an EC2 instance, then install Docker, kind and kubectl with the scripts in kind-cluster/." },
      { title: "Create the cluster", body: "kind create cluster --config=config.yml brings up the control plane and two workers." },
      { title: "Install the dashboard and Argo CD", body: "Deploy the Kubernetes Dashboard with an admin user, then install Argo CD and expose its server." },
      { title: "Deploy the application", body: "Point Argo CD at the k8s-specifications folder and let it sync the five services." },
      { title: "Add monitoring", body: "Install Prometheus and Grafana and build dashboards for the cluster." },
    ],
    snippet: {
      title: "kind-cluster/config.yml",
      lang: "yaml",
      caption: "The three-node cluster definition from the repository.",
      code: `kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4

nodes:
- role: control-plane
  image: kindest/node:v1.30.0
- role: worker
  image: kindest/node:v1.30.0
- role: worker
  image: kindest/node:v1.30.0`,
    },
  },
  {
    slug: "chat-app",
    title: "Real-Time Chat App Deployment",
    summary:
      "A React, Node.js and MongoDB chat application run with Docker Compose, a Jenkins pipeline with SonarQube, and Kubernetes manifests.",
    problem:
      "A three-part application is where deployment stops being trivial. The front end, the API and the database each need their own container, they need to find each other, and the database needs storage that outlives its container. I used a real-time chat app to work through that with Docker Compose, Jenkins and Kubernetes.",
    stack: ["Docker", "Docker Compose", "Jenkins", "SonarQube", "Kubernetes", "Nginx", "Node.js", "React", "MongoDB"],
    repoUrl: "https://github.com/ajayautade/chat-app",
    featured: false,
    kind: "Containerised full-stack app",
    languages: ["JavaScript", "YAML"],
    overview: [
      "The application is a full-stack chat app: a React front end styled with TailwindCSS, a Node.js and Express back end that uses Socket.io for real-time messages and JWT for authentication, and MongoDB for storage.",
      "This page is about how it is packaged and run. Each part has its own Dockerfile, and the front end is served by Nginx. A Docker Compose file starts all three together.",
      "A Jenkinsfile checks out the code, runs a SonarQube scan and deploys with Docker Compose. The repository also has Kubernetes manifests for a namespace, the three deployments and their services, an ingress, a secret, and a persistent volume for MongoDB. The README lists Kubernetes orchestration as planned, so I describe those manifests as written, not as a running deployment.",
    ],
    diagram: {
      description:
        "Architecture of the chat app deployment. A browser connects to the React front end, which is served by Nginx. The front end calls the Node.js and Express back end over HTTP for login and message history, and over Socket.io for real-time messages. The back end stores users and messages in MongoDB. A Jenkins pipeline checks out the code, runs a SonarQube code quality scan and deploys the three containers with Docker Compose. Kubernetes manifests describe the same three services with an ingress and a persistent volume for MongoDB.",
      lanes: [
        {
          title: "Application",
          nodes: [
            { label: "Browser" },
            { label: "Front end", note: "React behind Nginx", accent: "violet" },
            { label: "Back end", note: "Express + Socket.io", accent: "magenta" },
            { label: "MongoDB", note: "users and messages", accent: "olive" },
          ],
        },
        {
          title: "Jenkins pipeline",
          nodes: [
            { label: "Clean up" },
            { label: "Checkout" },
            { label: "SonarQube scan", accent: "amber" },
            { label: "docker compose up", note: "build and deploy", accent: "violet" },
          ],
        },
        {
          title: "Kubernetes manifests",
          nodes: [
            { label: "Namespace + secret" },
            { label: "3 deployments + services" },
            { label: "Ingress", accent: "magenta" },
            { label: "PV + PVC", note: "MongoDB data", accent: "olive" },
          ],
        },
      ],
    },
    stackGroups: [
      { label: "Front end", items: ["React", "TailwindCSS", "DaisyUI", "Zustand", "Nginx"] },
      { label: "Back end", items: ["Node.js", "Express", "Socket.io", "JWT"] },
      { label: "Data", items: ["MongoDB"] },
      { label: "Packaging", items: ["Docker", "Docker Compose"] },
      { label: "Pipeline", items: ["Jenkins", "SonarQube"] },
      { label: "Orchestration", items: ["Kubernetes manifests", "Ingress", "Persistent volume"] },
    ],
    decisions: [
      {
        title: "Nginx serves the front end",
        body: "The React app is built to static files and served by Nginx on port 80, with its own nginx.conf. The build tooling does not ship in the running container.",
      },
      {
        title: "Configuration through environment variables",
        body: "The back end reads the MongoDB connection string, the JWT secret and its port from a .env file. In Kubernetes the same values come from a Secret, so nothing sensitive is baked into an image.",
      },
      {
        title: "A code quality stage before deploy",
        body: "The Jenkins pipeline runs a SonarQube scan before it builds and starts the containers, so every deployment has passed through static analysis first.",
      },
      {
        title: "Storage that outlives the database pod",
        body: "MongoDB gets a persistent volume and claim in the Kubernetes manifests. Restarting or replacing the pod does not lose the messages.",
      },
    ],
    steps: [
      { title: "Containerise each part", body: "A Dockerfile for the front end, one for the back end, and the official MongoDB image." },
      { title: "Compose them", body: "A docker-compose.yml that starts the database, the API and the front end, with the app available on port 80." },
      { title: "Automate with Jenkins", body: "A Jenkinsfile with clean-up, checkout, SonarQube and deploy stages." },
      { title: "Describe it for Kubernetes", body: "Manifests for the namespace, secret, deployments, services, ingress and MongoDB storage." },
    ],
    snippet: {
      title: "run it locally",
      lang: "bash",
      caption: "From the README: start all three containers with Compose.",
      code: `git clone https://github.com/ajayautade/chat-app/
cd chat-app
docker-compose up -d --build
# then open http://localhost`,
    },
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
