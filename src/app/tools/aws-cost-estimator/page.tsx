import type { Metadata } from "next";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";
import AwsCostEstimator from "@/components/tools/AwsCostEstimator";
import { site } from "@/lib/site";

const title = "EKS and EC2 Monthly Cost Estimator, from AWS Prices";
const description =
  "Free AWS cost estimator: price an EKS cluster or EC2 instances per month, line by line, with NAT gateways, load balancers, public IPv4 and gp3 disks, from AWS's published on-demand prices.";
const path = "/tools/aws-cost-estimator";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | ${site.name}`, description, url: path },
};

export default function AwsCostPage() {
  return (
    <ToolShell
      slug="aws-cost-estimator"
      lead="Price a small EKS cluster or a few EC2 instances per month, line by line, from AWS's published on-demand prices."
      description={description}
      notesHeading="What goes into the number"
      notes={[
        {
          title: "Where the prices come from",
          body: (
            <>
              The AWS Price List, the machine-readable source behind the pricing pages: Linux, shared tenancy,
              on-demand, in US dollars. The date the prices were taken is shown under the result. AWS changes prices, so
              treat the number as a starting point.
            </>
          ),
        },
        {
          title: "The lines people forget",
          body: (
            <>
              A NAT gateway costs money every hour it exists, plus a charge per GB it processes. Every public IPv4
              address is billed, including the ones AWS puts on your load balancer and NAT gateway. On a small cluster
              these can cost more than the nodes.
            </>
          ),
        },
        {
          title: "EKS extended support",
          body: (
            <>
              The control plane is $0.10 an hour while your Kubernetes version is in standard support. When it moves to
              extended support the price rises to $0.60 an hour, six times as much, until you upgrade.
            </>
          ),
        },
        {
          title: "What is not included",
          body: (
            <>
              Tax, data transfer out to the internet, load balancer capacity units, CloudWatch, EBS snapshots, Savings
              Plans and Reserved Instances. It also assumes everything runs all month. Use the AWS Pricing Calculator for
              a quote you can budget against.
            </>
          ),
        },
        {
          title: "The worked example",
          body: (
            <>
              The default EKS setup is the one priced in my{" "}
              <Link href="/blog/eks-cluster-cost-per-month">article on what a small EKS cluster costs per month</Link>,
              which also covers ways to bring the bill down.
            </>
          ),
        },
      ]}
    >
      <AwsCostEstimator />
    </ToolShell>
  );
}
