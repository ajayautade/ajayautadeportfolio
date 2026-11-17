import type { Metadata } from "next";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";
import CidrCalculator from "@/components/tools/CidrCalculator";
import { site } from "@/lib/site";

const title = "CIDR Subnet Calculator, with AWS Usable Addresses";
const description =
  "Free CIDR calculator: enter an IPv4 block to get the network range, subnet mask and usable hosts, split it into equal subnets, and see how many addresses AWS leaves you.";
const path = "/tools/cidr-subnet-calculator";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | ${site.name}`, description, url: path },
};

export default function CidrPage() {
  return (
    <ToolShell
      slug="cidr-subnet-calculator"
      lead="Enter an IPv4 block to see its range, mask and usable addresses, then split it into equal subnets for a VPC."
      description={description}
      notesHeading="Reading CIDR notation"
      notes={[
        {
          title: "What the number after the slash means",
          body: (
            <>
              It is how many of the 32 bits are fixed. <code>10.0.0.0/16</code> fixes the first 16 bits, leaving 16
              bits, or 65,536 addresses, for hosts. Each step up halves the block: a <code>/17</code> is half a{" "}
              <code>/16</code>.
            </>
          ),
        },
        {
          title: "Why usable hosts is two fewer than the total",
          body: (
            <>
              The first address identifies the network and the last is the broadcast address, so neither is given to
              a host. The exceptions are <code>/31</code>, used for point-to-point links, and <code>/32</code>, a
              single host.
            </>
          ),
        },
        {
          title: "Why AWS gives you five fewer",
          body: (
            <>
              In every VPC subnet AWS keeps the first four addresses and the last one: the network address, the VPC
              router, DNS, one held for future use, and broadcast. A <code>/28</code>, the smallest subnet AWS
              allows, has 16 addresses and 11 you can use.
            </>
          ),
        },
        {
          title: "Planning a VPC",
          body: (
            <>
              Pick a private range that does not overlap with anything you may peer with later, then split it by tier
              and availability zone. My{" "}
              <Link href="/blog/aws-3-tier-architecture-terraform">3-tier architecture write-up</Link> uses a{" "}
              <code>/16</code> cut into six <code>/24</code> subnets.
            </>
          ),
        },
      ]}
    >
      <CidrCalculator />
    </ToolShell>
  );
}
