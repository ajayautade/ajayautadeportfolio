// DRAFT: written from the public repo; review before publishing.
import type { PostMeta } from "@/lib/posts";
import CodeBlock from "@/components/site/CodeBlock";
import { A, Callout, DataTable, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "helm-chart-dev-prod-values",
  title: "One Helm chart, two environments: dev and prod values, and the lines I'd change",
  description:
    "How MoviesMonkey's Helm chart uses one values.yaml with dev and prod overrides, what that layout gets right, and five lines that cause trouble: a latest tag, replicas next to an HPA, and an ingress rewrite.",
  date: "2026-11-22",
  tags: ["Kubernetes", "Helm", "CI/CD", "Docker"],
  readingMinutes: 6,
  service: "docker-kubernetes",
  project: "moviesmonkey",
  cta: "Running the same app in more than one environment by copy and paste? I can turn it into one Helm chart with per-environment values.",
};

export const headings: Heading[] = [
  { id: "the-layout", title: "The layout: one chart, three values files" },
  { id: "what-changes", title: "What changes between environments" },
  { id: "deploying", title: "Deploying with the overrides" },
  { id: "latest-tag", title: "Line 1: the latest tag" },
  { id: "replicas-and-hpa", title: "Line 2: replicas next to an HPA" },
  { id: "namespace", title: "Line 3: the namespace in values" },
  { id: "rewrite-target", title: "Line 4: the rewrite that breaks the assets" },
  { id: "pipeline", title: "Line 5: the pipeline around the chart" },
  { id: "what-id-do-next", title: "What I'd do next" },
];

const tree = `
helm/moviemonkey/
├── Chart.yaml
├── values.yaml          # defaults: what every environment shares
├── values-dev.yaml      # only what dev does differently
├── values-prod.yaml     # only what prod does differently
└── templates/
    ├── deployment.yaml
    ├── service.yaml
    ├── hpa.yaml
    └── ingress.yaml
`;

const devValues = `
# values-dev.yaml
replicaCount: 1

resources:
  requests:
    memory: "32Mi"
    cpu: "25m"
  limits:
    memory: "64Mi"
    cpu: "50m"

autoscaling:
  enabled: false

ingress:
  hosts:
    - host: moviemonkey.dev.local
      paths:
        - path: /
          pathType: Prefix
`;

const install = `
# Dev: defaults plus the dev overrides
helm upgrade --install moviemonkey ./helm/moviemonkey \\
  -f helm/moviemonkey/values-dev.yaml

# Prod: same chart, prod overrides, and the image built for this commit
helm upgrade --install moviemonkey ./helm/moviemonkey \\
  -f helm/moviemonkey/values-prod.yaml \\
  --set image.tag=sha-1a2b3c4

# See exactly what will be applied before applying it
helm template moviemonkey ./helm/moviemonkey -f helm/moviemonkey/values-prod.yaml | less
`;

const replicasFix = `
# templates/deployment.yaml
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
`;

const namespaceBefore = `
# templates/deployment.yaml (as in the repo)
metadata:
  name: {{ .Release.Name }}
  namespace: {{ .Values.namespace }}
`;

const namespaceAfter = `
metadata:
  name: {{ .Release.Name }}
  namespace: {{ .Release.Namespace }}

# and install with:
#   helm upgrade --install moviemonkey ./helm/moviemonkey -n moviemonkey --create-namespace
`;

const ingressBefore = `
# values.yaml
ingress:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
  hosts:
    - host: moviemonkey.local
      paths:
        - path: /
          pathType: Prefix
`;

const ingressAfter = `
# values.yaml: no rewrite needed when the app is served at /
ingress:
  annotations: {}
  hosts:
    - host: moviemonkey.local
      paths:
        - path: /
          pathType: Prefix
`;

const nginxSpa = `
# nginx.conf (copied into the image): unknown paths fall back to the React app
root /usr/share/nginx/html;

location / {
  try_files $uri $uri/ /index.html;
}
`;

export default function Post() {
  return (
    <Prose>
      <p>
        <A href="/projects/moviesmonkey">MoviesMonkey</A> is a small React app with a deliberately large delivery
        setup around it. One part of that setup is a Helm chart that deploys the same image to a development and a
        production environment with different sizes, scaling and hostnames. The layout is worth copying. A few
        lines in it are worth not copying, and they are the kind that only show up once the chart is running.
      </p>
      <p>
        Everything here is from the <A href="https://github.com/ajayautade/MoviesMonkey">public repository</A>.
      </p>

      <H2 id="the-layout">The layout: one chart, three values files</H2>
      <CodeBlock lang="bash" title="helm/moviemonkey" code={tree} />
      <p>
        <code>values.yaml</code> holds every setting with a sensible default. The two environment files contain only
        the settings that differ. That is the whole idea: when someone asks &ldquo;how is prod different from
        dev?&rdquo;, the answer is one short file, not a diff between two copies of the manifests.
      </p>
      <p>The dev file, in full:</p>
      <CodeBlock lang="yaml" title="values-dev.yaml" code={devValues} />

      <H2 id="what-changes">What changes between environments</H2>
      <DataTable
        caption="Settings that differ between the dev and prod values in MoviesMonkey's Helm chart"
        head={["Setting", "Default", "Dev", "Prod"]}
        rows={[
          ["Replicas", <code key="a">2</code>, <code key="b">1</code>, <code key="c">3</code>],
          ["CPU request / limit", <code key="a">50m / 100m</code>, <code key="b">25m / 50m</code>, <code key="c">100m / 200m</code>],
          ["Memory request / limit", <code key="a">64Mi / 128Mi</code>, <code key="b">32Mi / 64Mi</code>, <code key="c">128Mi / 256Mi</code>],
          ["Autoscaling", "2–10 pods, 70% CPU", "off", "3–20 pods, 60% CPU"],
          ["Ingress", "moviemonkey.local", "moviemonkey.dev.local", "TLS via cert-manager"],
        ]}
      />
      <p>
        Two choices in there are good habits. Dev turns autoscaling off, so a developer looking at one pod sees one
        pod. Prod scales on a lower CPU target (60% against 70%), which leaves more headroom while new pods start.
        The deployment template also sets <code>maxSurge: 1</code> and <code>maxUnavailable: 0</code>, so a rollout
        adds a new pod before removing an old one and capacity never drops.
      </p>

      <H2 id="deploying">Deploying with the overrides</H2>
      <p>
        Helm merges files given with <code>-f</code> on top of <code>values.yaml</code>, in order, and{" "}
        <code>--set</code> on top of those:
      </p>
      <CodeBlock lang="bash" code={install} />
      <p>
        <code>helm template</code> is the habit worth building. It renders the manifests without touching the
        cluster, so you can read what prod will actually get, or diff dev against prod.
      </p>

      <H2 id="latest-tag">Line 1: the latest tag</H2>
      <p>
        <code>values.yaml</code> sets <code>image.tag: &quot;latest&quot;</code> with{" "}
        <code>pullPolicy: IfNotPresent</code>. Together they cause two problems:
      </p>
      <ul>
        <li>
          <strong>Upgrades do nothing.</strong> If the tag in the rendered manifest has not changed, the pod spec has
          not changed, so <code>helm upgrade</code> does not start a rollout. The new image sits in the registry.
        </li>
        <li>
          <strong>Nodes run different versions.</strong> With <code>IfNotPresent</code>, a node that already has an
          old <code>latest</code> keeps using it, while a new node pulls the current one.
        </li>
      </ul>
      <p>
        The CD workflow already tags every image with the commit (<code>sha-…</code>) and with semantic versions on
        tags. The fix is to deploy those: keep a placeholder in <code>values.yaml</code> and always pass{" "}
        <code>--set image.tag=sha-…</code> from the pipeline, as in the command above. Rolling back then means
        deploying the previous tag, and <code>kubectl get pods -o yaml</code> tells you exactly which commit is
        running.
      </p>

      <H2 id="replicas-and-hpa">Line 2: replicas next to an HPA</H2>
      <p>
        The deployment always sets <code>replicas: {"{{ .Values.replicaCount }}"}</code>, and prod also enables an
        HPA. The HPA owns the replica count from then on, but each <code>helm upgrade</code> sends the chart&rsquo;s
        value again. If the HPA had scaled prod to 12 pods during a busy period, an upgrade resets it to 3 until the
        HPA notices and scales back up.
      </p>
      <p>
        The Kubernetes documentation recommends leaving <code>spec.replicas</code> out when an HPA manages the
        deployment. In the template that is one condition:
      </p>
      <CodeBlock lang="yaml" title="templates/deployment.yaml" code={replicasFix} />

      <H2 id="namespace">Line 3: the namespace in values</H2>
      <CodeBlock lang="yaml" code={namespaceBefore} />
      <p>
        Helm already has a namespace for every release: the one given with <code>-n</code>. Reading it from values
        instead means the two can disagree. Install with <code>-n staging</code> and the resources still go to{" "}
        <code>moviemonkey</code>, while Helm records the release in <code>staging</code>, and{" "}
        <code>helm list -n moviemonkey</code> shows nothing. Use the built-in value:
      </p>
      <CodeBlock lang="yaml" code={namespaceAfter} />

      <H2 id="rewrite-target">Line 4: the rewrite that breaks the assets</H2>
      <CodeBlock lang="yaml" code={ingressBefore} />
      <p>
        This annotation is copied into a lot of charts. With ingress-nginx, <code>rewrite-target</code> replaces the
        matched part of the path with the target. When the path is <code>/</code> with no capture group, every
        request is rewritten to <code>/</code>, including <code>/static/js/main.js</code>. nginx then answers the
        JavaScript request with <code>index.html</code>, and the browser shows a blank page.
      </p>
      <p>
        Rewrites are for serving an app under a sub-path, such as <code>/movies(/|$)(.*)</code> rewritten to{" "}
        <code>/$2</code>. An app served at the root does not need one:
      </p>
      <CodeBlock lang="yaml" code={ingressAfter} />
      <Callout title="Client-side routes">
        <p>
          What a React app does need is for unknown paths such as <code>/movie/42</code> to return{" "}
          <code>index.html</code>. That belongs in the nginx config inside the image, not in the ingress, and the
          repo&rsquo;s <code>nginx.conf</code> already does it:
        </p>
        <CodeBlock lang="nginx" code={nginxSpa} />
      </Callout>

      <H2 id="pipeline">Line 5: the pipeline around the chart</H2>
      <p>
        The workflows split cleanly: CI (lint, test, build, Dockerfile lint) runs on pull requests and can never
        push an image; CD runs on <code>main</code> and version tags and is the only workflow that publishes. Three
        details undo some of that:
      </p>
      <ul>
        <li>
          <strong>Lint cannot fail.</strong> The ESLint step ends in <code>|| true</code>, so it always passes.
          Either fix the warnings and remove it, or drop the step; a check that cannot fail only adds time.
        </li>
        <li>
          <strong>The scan looks at a different image.</strong> Trivy scans <code>:latest</code> after the push, not
          the <code>sha-…</code> tag that was just built. If two pushes land close together, it can scan the other
          one. Scan the commit&rsquo;s tag.
        </li>
        <li>
          <strong>The API keys are public anyway.</strong> The TMDB and OMDb keys are passed as build arguments into{" "}
          <code>REACT_APP_*</code> variables. Create React App writes those into the JavaScript bundle, so anyone can
          read them in the browser. That is fine for keys meant for client-side use, but keeping them in GitHub
          secrets does not make them secret. Keys that must stay private need a small backend in front of the API.
        </li>
      </ul>

      <H2 id="what-id-do-next">What I&rsquo;d do next</H2>
      <ul>
        <li>Make the four template fixes above and add <code>helm lint</code> and <code>helm template</code> to CI.</li>
        <li>
          Add a deploy job to CD that runs <code>helm upgrade --install --atomic --wait</code> with the commit&rsquo;s
          tag, so a failed rollout rolls itself back. Or hand that job to Argo CD, as in my{" "}
          <A href="/blog/gitops-argocd-github-actions-eks">GitOps on EKS article</A>.
        </li>
        <li>
          Check the requests against real usage. The{" "}
          <A href="/tools/kubernetes-resource-calculator">Kubernetes resource calculator</A> shows what the prod
          values reserve per node, and the <A href="/tools/dockerfile-checker">Dockerfile checker</A> covers the
          image side.
        </li>
      </ul>
    </Prose>
  );
}
