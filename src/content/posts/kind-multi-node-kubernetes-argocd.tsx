// DRAFT: written from the public repo; review before publishing.
import type { PostMeta } from "@/lib/posts";
import CodeBlock from "@/components/site/CodeBlock";
import { A, Callout, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "kind-multi-node-kubernetes-argocd",
  title: "A three-node Kubernetes cluster on one machine with kind, Argo CD and Prometheus",
  description:
    "Set up a multi-node Kubernetes cluster with kind on a single EC2 instance or laptop, deploy a five-service app, then add Argo CD and the kube-prometheus-stack.",
  date: "2026-11-15",
  tags: ["Kubernetes", "kind", "Argo CD", "GitOps", "Prometheus"],
  readingMinutes: 7,
};

export const headings: Heading[] = [
  { id: "why-kind", title: "Why kind" },
  { id: "the-cluster", title: "A cluster from nine lines of YAML" },
  { id: "the-app", title: "Deploying the voting app" },
  { id: "reaching-services", title: "Reaching services from outside" },
  { id: "argo-cd", title: "Adding Argo CD" },
  { id: "monitoring", title: "Adding Prometheus and Grafana" },
  { id: "clean-up", title: "Cleaning up" },
  { id: "limits", title: "What kind is not for" },
];

const config = `
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4

nodes:
- role: control-plane
  image: kindest/node:v1.30.0
- role: worker
  image: kindest/node:v1.30.0
- role: worker
  image: kindest/node:v1.30.0
`;

const create = `
# Install kind (Linux, x86_64)
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind && sudo mv ./kind /usr/local/bin/kind

kind create cluster --config=config.yml

kubectl cluster-info --context kind-kind
kubectl get nodes
`;

const app = `
kubectl apply -f k8s-specifications/
kubectl get all
`;

const forward = `
kubectl port-forward service/vote 5000:5000 --address=0.0.0.0 &
kubectl port-forward service/result 5001:5001 --address=0.0.0.0 &
`;

const argo = `
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

kubectl port-forward -n argocd service/argocd-server 8443:443 --address=0.0.0.0 &

# Initial admin password
kubectl get secret -n argocd argocd-initial-admin-secret \\
  -o jsonpath="{.data.password}" | base64 -d && echo
`;

const monitoring = `
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

kubectl create namespace monitoring
helm install kind-prometheus prometheus-community/kube-prometheus-stack --namespace monitoring

kubectl port-forward svc/kind-prometheus-kube-prome-prometheus -n monitoring 9090:9090 --address=0.0.0.0 &
kubectl port-forward svc/kind-prometheus-grafana -n monitoring 31000:80 --address=0.0.0.0 &
`;

const promql = `
# CPU used by the default namespace, as a percentage of the machine
sum(rate(container_cpu_usage_seconds_total{namespace="default"}[1m])) / sum(machine_cpu_cores) * 100

# Memory per pod
sum(container_memory_usage_bytes{namespace="default"}) by (pod)

# Network in and out per pod
sum(rate(container_network_receive_bytes_total{namespace="default"}[5m])) by (pod)
sum(rate(container_network_transmit_bytes_total{namespace="default"}[5m])) by (pod)
`;

export default function Article() {
  return (
    <Prose>
      <p>
        A managed Kubernetes cluster costs money every hour it exists, which makes it a poor place to try things.
        For my <A href="/projects/kind-voting-app">kind voting app project</A> I ran a three-node cluster on a
        single EC2 instance instead, deployed a five-service application to it, and then added Argo CD and a
        monitoring stack. Everything here also works on a laptop with Docker installed.
      </p>
      <p>
        The files and the full command history are in{" "}
        <A href="https://github.com/ajayautade/kind-voting-app">the repository</A>, under{" "}
        <code>kind-cluster/</code>.
      </p>

      <H2 id="why-kind">Why kind</H2>
      <p>
        <A href="https://kind.sigs.k8s.io/">kind</A> stands for Kubernetes in Docker. Each &ldquo;node&rdquo; is a
        Docker container running a real kubelet, so you get an actual multi-node cluster, with scheduling across
        workers, on one machine. It starts in about the time it takes to pull the node image, and deleting it
        leaves nothing behind.
      </p>

      <H2 id="the-cluster">A cluster from nine lines of YAML</H2>
      <CodeBlock lang="yaml" title="kind-cluster/config.yml" code={config} />
      <p>
        One control-plane node and two workers. The node image is pinned to a Kubernetes version, so the cluster is
        the same every time it is created.
      </p>
      <CodeBlock lang="bash" code={create} />
      <p>
        <code>kubectl get nodes</code> should list three nodes. Having two workers is what makes this more useful
        than a single-node setup: you can watch pods spread across nodes, and see what happens when one is
        drained.
      </p>

      <H2 id="the-app">Deploying the voting app</H2>
      <p>
        The application is Docker&rsquo;s example voting app, which is a good test because its five parts are
        written in different stacks and depend on each other:
      </p>
      <ul>
        <li>a Python web app where you vote,</li>
        <li>Redis, which collects the votes,</li>
        <li>a .NET worker that moves votes from Redis to the database,</li>
        <li>Postgres, which stores them,</li>
        <li>a Node.js web app that shows the results live.</li>
      </ul>
      <CodeBlock lang="bash" code={app} />
      <p>
        The <code>k8s-specifications/</code> folder holds a Deployment for each part and a Service for the four
        that receive connections. The worker has no Service because nothing calls it.
      </p>

      <H2 id="reaching-services">Reaching services from outside</H2>
      <p>This is the step that catches people out with kind.</p>
      <Callout title="NodePort does not work the way you expect">
        <p>
          On a normal cluster, a NodePort service is reachable on the node&rsquo;s IP. In kind, the nodes are
          containers, so that port opens inside a container, not on your machine. Unless the cluster config maps
          it with <code>extraPortMappings</code>, nothing outside can reach it.
        </p>
      </Callout>
      <p>
        The simple way around it is port-forwarding. On EC2, <code>--address=0.0.0.0</code> makes the forward
        listen on all interfaces so you can open it from your browser:
      </p>
      <CodeBlock lang="bash" code={forward} />
      <p>
        The instance&rsquo;s security group must allow those ports, and it should allow them from your IP only. A
        port-forward bound to <code>0.0.0.0</code> on a public instance is open to anyone the security group lets
        in.
      </p>

      <H2 id="argo-cd">Adding Argo CD</H2>
      <CodeBlock lang="bash" code={argo} />
      <p>
        Log in as <code>admin</code>, create an application that points at the repository and the{" "}
        <code>k8s-specifications</code> path, and Argo CD takes over deploying it. From then on, changing a
        manifest in Git changes the cluster. I go through that model in more detail in{" "}
        <A href="/blog/gitops-argocd-github-actions-eks">GitOps on EKS with GitHub Actions and Argo CD</A>.
      </p>

      <H2 id="monitoring">Adding Prometheus and Grafana</H2>
      <p>
        The kube-prometheus-stack Helm chart installs Prometheus, Grafana, Alertmanager and the exporters in one
        release, with dashboards already set up:
      </p>
      <CodeBlock lang="bash" code={monitoring} />
      <p>A few queries that are useful straight away in the Prometheus UI:</p>
      <CodeBlock lang="promql" code={promql} />
      <p>
        Open the voting page, cast a batch of votes, and the network and CPU graphs for the vote, Redis and worker
        pods move in sequence. It is a small thing, but it is the quickest way I know to see how a request flows
        through a set of services.
      </p>

      <H2 id="clean-up">Cleaning up</H2>
      <CodeBlock lang="bash" code={"kind delete cluster --name=kind"} />
      <p>
        That removes the three containers and everything in them. If the cluster was on EC2, stop or terminate the
        instance as well.
      </p>

      <H2 id="limits">What kind is not for</H2>
      <ul>
        <li>
          <strong>Production.</strong> All three &ldquo;nodes&rdquo; share one machine. If it goes down, so does
          the whole cluster.
        </li>
        <li>
          <strong>Testing cloud integrations.</strong> There are no real load balancers, no cloud volumes and no
          IAM roles for service accounts. For those you need the real thing, such as the EKS cluster in my{" "}
          <A href="/projects/gitops-argocd-deployment">GitOps project</A>.
        </li>
        <li>
          <strong>Realistic performance numbers.</strong> Everything competes for the same CPU and disk.
        </li>
      </ul>
      <p>
        What it is good for is everything before that: learning how the pieces fit, testing manifests and Helm
        charts, and running a pipeline&rsquo;s integration tests against a cluster that exists for five minutes.
      </p>
    </Prose>
  );
}
