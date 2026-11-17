// DRAFT: written from the public repo; review before publishing.
import type { PostMeta } from "@/lib/posts";
import CodeBlock from "@/components/site/CodeBlock";
import { A, Callout, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "gitops-argocd-github-actions-eks",
  title: "GitOps on EKS: GitHub Actions builds, Argo CD deploys",
  description:
    "How a push becomes a deployment without CI ever touching the cluster: GitHub Actions builds the image and commits the new tag, and Argo CD syncs EKS from Git.",
  date: "2026-11-15",
  tags: ["Argo CD", "GitOps", "GitHub Actions", "Kubernetes", "CI/CD"],
  readingMinutes: 7,
};

export const headings: Heading[] = [
  { id: "the-idea", title: "The idea: CI writes to Git, not to the cluster" },
  { id: "bootstrap", title: "Installing Argo CD with Terraform" },
  { id: "the-pipeline", title: "The pipeline" },
  { id: "avoiding-the-loop", title: "Avoiding the build loop" },
  { id: "the-application", title: "The Argo CD Application" },
  { id: "probes", title: "Why the probes matter here" },
  { id: "what-id-change", title: "What I'd change before production" },
];

const helmRelease = `
resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "5.46.7"
  namespace  = kubernetes_namespace.argocd.metadata[0].name
  wait       = false
  timeout    = 600

  set {
    name  = "server.service.type"
    value = "LoadBalancer"
  }

  depends_on = [kubernetes_namespace.argocd]
}
`;

const workflow = `
on:
  push:
    branches: [main]
    paths-ignore:
      - 'k8s/**'
      - 'terraform/**'
      - 'README.md'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: docker/login-action@v2
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}

      - uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: \${{ secrets.DOCKERHUB_USERNAME }}/gitops-demo-app:\${{ github.sha }}

      - name: Update the manifest
        run: |
          sed -i "s|image: .*/gitops-demo-app:.*|image: \${{ secrets.DOCKERHUB_USERNAME }}/gitops-demo-app:\${{ github.sha }}|g" k8s/deployment.yaml
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add k8s/deployment.yaml
          git commit -m "auto: deploy image tag \${{ github.sha }}"
          git push
`;

const application = `
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: gitops-demo-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: 'https://github.com/ajayautade/gitops-argocd-app.git'
    targetRevision: HEAD
    path: k8s
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
`;

const probes = `
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 15
  periodSeconds: 20
readinessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
`;

export default function Article() {
  return (
    <Prose>
      <p>
        In most pipelines the last step is <code>kubectl apply</code> or <code>helm upgrade</code>, run by CI with
        credentials for the cluster. My <A href="/projects/gitops-argocd-deployment">GitOps project</A> removes
        that step. CI never talks to Kubernetes. It builds an image, writes the new tag into a manifest, and
        commits. <A href="https://argo-cd.readthedocs.io/">Argo CD</A>, running inside the cluster, notices the
        commit and applies it.
      </p>
      <p>
        The code is in <A href="https://github.com/ajayautade/gitops-argocd-app">the repository</A>. This article
        walks through the three files that make it work, and what I would change before trusting it with a real
        service.
      </p>

      <H2 id="the-idea">The idea: CI writes to Git, not to the cluster</H2>
      <p>The flow has two halves that only meet in Git:</p>
      <ol>
        <li>A push to <code>main</code> triggers GitHub Actions.</li>
        <li>The workflow builds a Docker image tagged with the commit SHA and pushes it to Docker Hub.</li>
        <li>
          The workflow edits <code>k8s/deployment.yaml</code> to point at that tag and commits the change back.
        </li>
        <li>Argo CD sees that Git and the cluster differ, and syncs the cluster to match.</li>
      </ol>
      <p>
        Two things follow from this. The cluster credentials never leave the cluster, so CI has nothing to leak.
        And the Git history of <code>k8s/</code> is the deployment history: every release is a commit, and a
        rollback is a revert.
      </p>

      <H2 id="bootstrap">Installing Argo CD with Terraform</H2>
      <p>
        The same Terraform run that creates the VPC and the EKS cluster also installs Argo CD, through the Helm
        provider. One <code>terraform apply</code> ends with a cluster that is ready to be pointed at a repository.
      </p>
      <CodeBlock lang="hcl" title="terraform/argocd.tf" code={helmRelease} />
      <p>
        The chart version is pinned, so a later apply does not quietly upgrade Argo CD. <code>wait = false</code>{" "}
        stops Terraform blocking until every pod is ready. The monitoring stack (Prometheus and Grafana) is
        installed the same way from a second file.
      </p>

      <H2 id="the-pipeline">The pipeline</H2>
      <CodeBlock lang="yaml" title=".github/workflows/ci.yml" code={workflow} />
      <p>
        The image tag is <code>github.sha</code>, not <code>latest</code>. That matters for GitOps: Argo CD compares
        manifests, and a manifest that always says <code>latest</code> never changes, so there would be nothing to
        sync. A unique tag per commit also means you can tell exactly which code is running.
      </p>

      <H2 id="avoiding-the-loop">Avoiding the build loop</H2>
      <p>
        The workflow pushes a commit to the branch that triggers it. Without a guard, that commit would start
        another run, which would push another commit, and so on. The <code>paths-ignore</code> block is the guard:
        a commit that only touches <code>k8s/</code> does not start the workflow.
      </p>
      <Callout title="Worth knowing">
        <p>
          Pushes made with the default <code>GITHUB_TOKEN</code> do not trigger new workflow runs anyway. The{" "}
          <code>paths-ignore</code> rule still earns its place: it also stops a hand-edited manifest or a README
          fix from rebuilding the image.
        </p>
      </Callout>

      <H2 id="the-application">The Argo CD Application</H2>
      <p>One manifest tells Argo CD what to watch and where to put it:</p>
      <CodeBlock lang="yaml" title="argocd-app.yaml" code={application} />
      <ul>
        <li>
          <strong>
            <code>path: k8s</code>
          </strong>{" "}
          limits Argo CD to the manifests folder. Application code changes do not trigger a sync until CI has
          produced an image and updated the tag.
        </li>
        <li>
          <strong>
            <code>prune: true</code>
          </strong>{" "}
          deletes resources from the cluster when their manifest is deleted from Git.
        </li>
        <li>
          <strong>
            <code>selfHeal: true</code>
          </strong>{" "}
          reverts manual changes. If someone scales the deployment with <code>kubectl</code>, Argo CD puts it back.
          That is the point: Git is the only way in.
        </li>
        <li>
          The <strong>finalizer</strong> makes deleting the Application also delete what it deployed.
        </li>
      </ul>

      <H2 id="probes">Why the probes matter here</H2>
      <p>
        With nobody watching a deploy script, something has to decide whether a release worked. That is the job of
        the probes on the Deployment:
      </p>
      <CodeBlock lang="yaml" title="k8s/deployment.yaml" code={probes} />
      <p>
        Kubernetes only sends traffic to a new pod once its readiness probe passes, and keeps the old pods until
        then. Argo CD reports the application as healthy only when the rollout completes. A broken image shows up
        as a degraded application in Argo CD instead of an outage.
      </p>

      <H2 id="what-id-change">What I&rsquo;d change before production</H2>
      <p>The repository is a learning project, and it takes shortcuts I would not keep:</p>
      <ul>
        <li>
          <strong>Do not expose the Argo CD UI with a public LoadBalancer.</strong> Keep the service internal and
          reach it through port-forwarding, a VPN, or an ingress with authentication.
        </li>
        <li>
          <strong>Change the Grafana admin password.</strong> The README logs in with the chart default.
        </li>
        <li>
          <strong>Give the workflow explicit permissions.</strong> It needs <code>contents: write</code> to push,
          and nothing else.
        </li>
        <li>
          <strong>Split application code and manifests into two repositories</strong> once more than one person
          deploys. It keeps bot commits out of the application history and lets you restrict who can change what
          runs in the cluster.
        </li>
        <li>
          <strong>Scan the image before it is pushed.</strong> My{" "}
          <A href="/projects/mlops-sentiment-analyzer">MLOps sentiment analyzer</A> does this with Trivy.
        </li>
        <li>
          <strong>Move Terraform state to a remote backend</strong> with locking, so the state file is not kept on
          a laptop or in the repository.
        </li>
      </ul>
      <p>
        None of these change the shape of the pipeline. The core of it, CI that writes to Git and a cluster that
        pulls from Git, stays the same.
      </p>
    </Prose>
  );
}
