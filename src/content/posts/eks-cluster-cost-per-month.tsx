// DRAFT: prices taken from the AWS Price List on 2026-11-15; review before publishing.
import type { PostMeta } from "@/lib/posts";
import { A, Callout, DataTable, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "eks-cluster-cost-per-month",
  title: "What a small Amazon EKS cluster costs per month, line by line",
  description:
    "A small EKS cluster with two nodes, a NAT gateway and a load balancer, priced line by line for N. Virginia and Mumbai, with what is left out and how to cut it.",
  date: "2026-11-15",
  tags: ["AWS", "Kubernetes", "EKS", "Cost"],
  readingMinutes: 8,
  service: "cloud-optimization-reliability",
  project: "gitops-argocd-deployment",
  cta: "Not sure where your own AWS bill goes? I can go through what you run and write up what each part costs and what can go.",
};

export const headings: Heading[] = [
  { id: "the-setup", title: "The setup being priced" },
  { id: "the-bill", title: "The bill, line by line" },
  { id: "what-stands-out", title: "What stands out" },
  { id: "not-included", title: "What is not in the table" },
  { id: "extended-support", title: "The charge that catches people out" },
  { id: "fargate-and-auto-mode", title: "Fargate and Auto Mode" },
  { id: "cutting-it", title: "Ways to cut it" },
  { id: "do-you-need-eks", title: "Do you need EKS yet?" },
];

export default function Article() {
  return (
    <Prose>
      <p>
        &ldquo;How much will Kubernetes on AWS cost us?&rdquo; is usually asked after the cluster exists. The
        honest answer for a small cluster is that the nodes are not the biggest line. This article prices the
        smallest setup I would call usable, one line at a time, so you can swap in your own numbers.
      </p>
      <p>
        All prices are on-demand, in US dollars, from the{" "}
        <A href="https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json">AWS Price List</A>, the
        machine-readable source behind the pricing pages, as published on 15 November 2026. A month is taken as 730 hours. AWS changes prices, so check the{" "}
        <A href="https://aws.amazon.com/eks/pricing/">EKS</A>,{" "}
        <A href="https://aws.amazon.com/ec2/pricing/on-demand/">EC2</A> and{" "}
        <A href="https://aws.amazon.com/vpc/pricing/">VPC</A> pricing pages before relying on any figure here.
        To price your own setup, change the numbers in the{" "}
        <A href="/tools/aws-cost-estimator">EKS and EC2 cost estimator</A>, which uses the same unit prices.
      </p>

      <H2 id="the-setup">The setup being priced</H2>
      <ul>
        <li>One EKS cluster on a Kubernetes version in standard support.</li>
        <li>
          Two <code>t3.medium</code> worker nodes (2 vCPU, 4 GiB each), one per availability zone, each with a 20
          GB gp3 volume.
        </li>
        <li>Nodes in private subnets, with one NAT gateway for outbound traffic.</li>
        <li>One Application Load Balancer in front, across two zones.</li>
      </ul>
      <p>
        This is close to what the Terraform in my <A href="/projects/gitops-argocd-deployment">GitOps project</A>{" "}
        builds: a VPC, an EKS cluster and the tools on top.
      </p>

      <H2 id="the-bill">The bill, line by line</H2>
      <DataTable
        caption="Monthly cost of a small EKS cluster in us-east-1 and ap-south-1"
        head={["Item", "Unit price (N. Virginia)", "N. Virginia / month", "Mumbai / month"]}
        rows={[
          ["EKS control plane", "$0.10 / hour", "$73.00", "$73.00"],
          ["2 × t3.medium nodes", "$0.0416 / hour each", "$60.74", "$65.41"],
          ["NAT gateway, hourly", "$0.045 / hour", "$32.85", "$40.88"],
          ["Application Load Balancer, hourly", "$0.0225 / hour", "$16.43", "$17.45"],
          ["3 public IPv4 addresses", "$0.005 / hour each", "$10.95", "$10.95"],
          ["2 × 20 GB gp3 volumes", "$0.08 / GB-month", "$3.20", "$3.65"],
          [<strong key="t">Total before traffic</strong>, "", <strong key="a">$197.16</strong>, <strong key="b">$211.33</strong>],
        ]}
      />
      <p>
        Mumbai (<code>ap-south-1</code>) unit prices: <code>t3.medium</code> $0.0448 an hour, NAT gateway $0.056 an
        hour, ALB $0.0239 an hour, gp3 $0.0912 per GB-month. The control plane and IPv4 prices are the same in
        both regions.
      </p>
      <p>
        The three public addresses are one for the NAT gateway and one per zone for the load balancer. AWS{" "}
        <A href="https://aws.amazon.com/vpc/pricing/">charges for every public IPv4 address</A>, including the ones
        attached to its own services.
      </p>

      <H2 id="what-stands-out">What stands out</H2>
      <p>
        The two machines that run your application are $60.74 of a $197.16 bill, a little under a third. The
        control plane alone costs more than both nodes. The NAT gateway, which does nothing but let private nodes
        reach the internet, costs more than one of them.
      </p>
      <p>
        That is the shape of a small cluster: a fixed platform cost of about $133 a month in N. Virginia before
        the first pod is scheduled. It is the same whether you run two nodes or twenty, which is why EKS looks
        expensive for a single small service and reasonable for a fleet.
      </p>

      <H2 id="not-included">What is not in the table</H2>
      <p>These depend on traffic and usage, so I have left them out instead of guessing:</p>
      <ul>
        <li>
          <strong>NAT gateway data processing</strong>: $0.045 per GB in N. Virginia, $0.056 in Mumbai, on
          everything that passes through it. Pulling container images through NAT adds up quickly.
        </li>
        <li>
          <strong>Load balancer capacity units</strong>: $0.008 per LCU-hour on top of the hourly charge.
        </li>
        <li>
          <strong>Data transfer</strong> out to the internet and between availability zones.
        </li>
        <li>
          <strong>Logs and metrics</strong> sent to CloudWatch, and container image storage in ECR.
        </li>
      </ul>

      <H2 id="extended-support">The charge that catches people out</H2>
      <p>
        The $0.10 an hour control plane price applies while your Kubernetes version is in standard support. Once it
        moves to extended support, the{" "}
        <A href="https://aws.amazon.com/eks/pricing/">EKS pricing page</A> adds $0.50 an hour, for $0.60 in total.
      </p>
      <Callout title="In monthly terms">
        <p>
          The control plane goes from $73.00 to $438.00 a month. Nothing about the cluster changes except the
          date. Upgrading Kubernetes on schedule is the cheapest cost optimisation EKS has.
        </p>
      </Callout>

      <H2 id="fargate-and-auto-mode">Fargate and Auto Mode</H2>
      <p>
        <strong>Fargate</strong> replaces nodes with per-pod billing: $0.04048 per vCPU-hour and $0.004445 per
        GB-hour in N. Virginia. A pod with 0.25 vCPU and 0.5 GB running all month comes to about $9.01. That is
        attractive for a handful of small pods and gets expensive as the count grows, because you pay for each
        pod&rsquo;s full request around the clock.
      </p>
      <p>
        <strong>EKS Auto Mode</strong> manages the nodes for you and adds a management fee per instance on top of
        the EC2 price. For a <code>t3.medium</code> in N. Virginia the Price List shows $0.00499 an hour, about
        $3.64 a month per node. You are paying AWS to do node upgrades and scaling you would otherwise do
        yourself.
      </p>

      <H2 id="cutting-it">Ways to cut it</H2>
      <ul>
        <li>
          <strong>Destroy what is not in use.</strong> A development cluster that exists only during working hours
          costs a fraction of one that runs all month. Every project of mine that creates a cluster ends with{" "}
          <code>terraform destroy</code> for this reason.
        </li>
        <li>
          <strong>Use one NAT gateway, not one per zone,</strong> outside production. It is a single point of
          failure for outbound traffic, which is usually acceptable for a test environment.
        </li>
        <li>
          <strong>Add VPC endpoints for S3 and ECR</strong> so image pulls stop going through the NAT gateway and
          its per-GB charge.
        </li>
        <li>
          <strong>Keep the Kubernetes version in standard support.</strong> See above.
        </li>
        <li>
          <strong>Share one load balancer</strong> between services with an ingress controller, instead of one per
          service.
        </li>
        <li>
          <strong>Set resource requests from measurements,</strong> so you are not paying for nodes that hold
          reserved but unused capacity. The{" "}
          <A href="/tools/kubernetes-resource-calculator">resource calculator</A> shows how requests translate into
          nodes.
        </li>
      </ul>

      <H2 id="do-you-need-eks">Do you need EKS yet?</H2>
      <p>
        For one or two services, possibly not. A single EC2 instance running k3s or Docker Compose has no control
        plane fee and no NAT gateway. An <code>m7i-flex.large</code>, the size my{" "}
        <A href="/projects/moviesmonkey">MoviesMonkey</A> deployment ran on, is $0.09576 an hour in N. Virginia,
        about $69.90 a month. For learning and testing, a{" "}
        <A href="/blog/kind-multi-node-kubernetes-argocd">kind cluster</A> costs only the machine it runs on.
      </p>
      <p>
        What you give up is what the control plane fee buys: a managed, highly available API server, and
        integration with IAM and load balancers. Once losing the one instance would be a real outage, or several
        teams are deploying, that fee starts to look cheap.
      </p>
      <p>
        If you already have a cluster and the bill is higher than this article suggests it should be, that is the
        kind of thing an <A href="/services/cloud-optimization-reliability">infrastructure review</A> is for.
      </p>
    </Prose>
  );
}
