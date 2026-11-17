import type { Metadata } from "next";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";
import K8sResourceCalculator from "@/components/tools/K8sResourceCalculator";
import { site } from "@/lib/site";

const title = "Kubernetes Requests and Limits Calculator, with QoS Class";
const description =
  "Free Kubernetes resource calculator: enter CPU and memory requests, limits and replicas to get the QoS class, total reservation, pods per node and ready-to-paste YAML.";
const path = "/tools/kubernetes-resource-calculator";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | ${site.name}`, description, url: path },
};

export default function K8sResourcesPage() {
  return (
    <ToolShell
      slug="kubernetes-resource-calculator"
      lead="Enter requests, limits and replicas to see the QoS class, what the scheduler reserves, and how many pods fit on a node."
      description={description}
      notesHeading="Requests, limits and QoS"
      notes={[
        {
          title: "Requests are for the scheduler",
          body: (
            <>
              A request is what the scheduler sets aside on a node when it places the pod. A pod is only scheduled
              where its requests fit, whether or not it ever uses that much.
            </>
          ),
        },
        {
          title: "Limits are enforced at run time",
          body: (
            <>
              A container that reaches its CPU limit is throttled: it slows down. A container that goes over its
              memory limit is killed and restarted, which shows up as <code>OOMKilled</code>.
            </>
          ),
        },
        {
          title: "The three QoS classes",
          body: (
            <>
              <strong>Guaranteed</strong>: CPU and memory requests equal their limits. <strong>BestEffort</strong>:
              nothing is set. <strong>Burstable</strong>: everything in between. When a node runs out of memory,
              BestEffort pods are evicted first and Guaranteed pods last.
            </>
          ),
        },
        {
          title: "Why a node holds less than its size",
          body: (
            <>
              Part of every node is kept for the kubelet, the operating system and an eviction threshold. The 10%
              default here is a placeholder, not a measurement. For the real figure, read <code>Allocatable</code> in{" "}
              <code>kubectl describe node</code>.
            </>
          ),
        },
        {
          title: "Where the numbers should come from",
          body: (
            <>
              From measurement, not guesswork: run the service, watch its usage in Prometheus, and set requests
              near what it normally uses. The queries in my{" "}
              <Link href="/blog/kind-multi-node-kubernetes-argocd">kind cluster article</Link> are a starting point.
            </>
          ),
        },
      ]}
    >
      <K8sResourceCalculator />
    </ToolShell>
  );
}
