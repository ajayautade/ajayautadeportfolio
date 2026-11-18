/**
 * Monthly cost of a small EC2 or EKS setup, from AWS's published on-demand prices.
 *
 * Every price below comes from the AWS Price List (the machine-readable source behind the
 * pricing pages): EC2 Linux, shared tenancy, on-demand, in US dollars. Change PRICES_AS_OF
 * whenever you refresh them. Nothing here estimates savings or usage; it multiplies.
 */

export const PRICES_AS_OF = "2026-11-22";
export const HOURS_PER_MONTH = 730;

export type Region = "us-east-1" | "ap-south-1";

export const regions: { id: Region; label: string }[] = [
  { id: "us-east-1", label: "US East (N. Virginia)" },
  { id: "ap-south-1", label: "Asia Pacific (Mumbai)" },
];

export interface InstanceType {
  name: string;
  vcpu: number;
  memGiB: number;
  arch: "x86" | "arm";
  /** On-demand USD per hour, by region. */
  hourly: Record<Region, number>;
}

export const instanceTypes: InstanceType[] = [
  { name: "t3.micro", vcpu: 2, memGiB: 1, arch: "x86", hourly: { "us-east-1": 0.0104, "ap-south-1": 0.0112 } },
  { name: "t3.small", vcpu: 2, memGiB: 2, arch: "x86", hourly: { "us-east-1": 0.0208, "ap-south-1": 0.0224 } },
  { name: "t3.medium", vcpu: 2, memGiB: 4, arch: "x86", hourly: { "us-east-1": 0.0416, "ap-south-1": 0.0448 } },
  { name: "t3.large", vcpu: 2, memGiB: 8, arch: "x86", hourly: { "us-east-1": 0.0832, "ap-south-1": 0.0896 } },
  { name: "t3.xlarge", vcpu: 4, memGiB: 16, arch: "x86", hourly: { "us-east-1": 0.1664, "ap-south-1": 0.1792 } },
  { name: "t4g.small", vcpu: 2, memGiB: 2, arch: "arm", hourly: { "us-east-1": 0.0168, "ap-south-1": 0.0112 } },
  { name: "t4g.medium", vcpu: 2, memGiB: 4, arch: "arm", hourly: { "us-east-1": 0.0336, "ap-south-1": 0.0224 } },
  { name: "t4g.large", vcpu: 2, memGiB: 8, arch: "arm", hourly: { "us-east-1": 0.0672, "ap-south-1": 0.0448 } },
  { name: "m6i.large", vcpu: 2, memGiB: 8, arch: "x86", hourly: { "us-east-1": 0.096, "ap-south-1": 0.101 } },
  { name: "m6i.xlarge", vcpu: 4, memGiB: 16, arch: "x86", hourly: { "us-east-1": 0.192, "ap-south-1": 0.202 } },
  { name: "m6i.2xlarge", vcpu: 8, memGiB: 32, arch: "x86", hourly: { "us-east-1": 0.384, "ap-south-1": 0.404 } },
  { name: "m7g.large", vcpu: 2, memGiB: 8, arch: "arm", hourly: { "us-east-1": 0.0816, "ap-south-1": 0.0583 } },
  { name: "m7g.xlarge", vcpu: 4, memGiB: 16, arch: "arm", hourly: { "us-east-1": 0.1632, "ap-south-1": 0.1166 } },
  { name: "c6i.large", vcpu: 2, memGiB: 4, arch: "x86", hourly: { "us-east-1": 0.085, "ap-south-1": 0.085 } },
  { name: "c6i.xlarge", vcpu: 4, memGiB: 8, arch: "x86", hourly: { "us-east-1": 0.17, "ap-south-1": 0.17 } },
  { name: "c7g.large", vcpu: 2, memGiB: 4, arch: "arm", hourly: { "us-east-1": 0.0725, "ap-south-1": 0.0491 } },
  { name: "r6i.large", vcpu: 2, memGiB: 16, arch: "x86", hourly: { "us-east-1": 0.126, "ap-south-1": 0.13 } },
  { name: "r6i.xlarge", vcpu: 4, memGiB: 32, arch: "x86", hourly: { "us-east-1": 0.252, "ap-south-1": 0.26 } },
];

/** Non-EC2 unit prices, the same ones used in the EKS cost article. */
export const unitPrices: Record<
  Region,
  { eksStandard: number; eksExtended: number; natHourly: number; natPerGB: number; albHourly: number; ipv4Hourly: number; gp3PerGB: number }
> = {
  "us-east-1": { eksStandard: 0.1, eksExtended: 0.6, natHourly: 0.045, natPerGB: 0.045, albHourly: 0.0225, ipv4Hourly: 0.005, gp3PerGB: 0.08 },
  "ap-south-1": { eksStandard: 0.1, eksExtended: 0.6, natHourly: 0.056, natPerGB: 0.056, albHourly: 0.0239, ipv4Hourly: 0.005, gp3PerGB: 0.0912 },
};

export interface CostInput {
  region: Region;
  mode: "ec2" | "eks";
  instanceType: string;
  count: number;
  /** Root volume per instance, GB of gp3. */
  volumeGB: number;
  natGateways: number;
  natDataGB: number;
  loadBalancers: number;
  /** Public IPv4 addresses, including the ones on load balancers and NAT gateways. */
  publicIps: number;
  extendedSupport: boolean;
}

export interface CostLine {
  item: string;
  unit: string;
  monthly: number;
}

export interface CostResult {
  lines: CostLine[];
  total: number;
  instance: InstanceType;
  computeShare: number;
}

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;

export function estimate(input: CostInput): CostResult {
  const instance = instanceTypes.find((t) => t.name === input.instanceType) ?? instanceTypes[2];
  const p = unitPrices[input.region];
  const hourly = instance.hourly[input.region];
  const lines: CostLine[] = [];
  const push = (item: string, unit: string, monthly: number) => {
    if (monthly > 0) lines.push({ item, unit, monthly });
  };

  if (input.mode === "eks") {
    const rate = input.extendedSupport ? p.eksExtended : p.eksStandard;
    push(`EKS control plane${input.extendedSupport ? " (extended support)" : ""}`, `${money(rate)} / hour`, rate * HOURS_PER_MONTH);
  }
  push(
    `${input.count} × ${instance.name}${input.mode === "eks" ? " nodes" : ""}`,
    `${money(hourly)} / hour each`,
    hourly * HOURS_PER_MONTH * input.count,
  );
  push(`${input.count} × ${input.volumeGB} GB gp3`, `${money(p.gp3PerGB)} / GB-month`, p.gp3PerGB * input.volumeGB * input.count);
  push(`${input.natGateways} × NAT gateway, hourly`, `${money(p.natHourly)} / hour each`, p.natHourly * HOURS_PER_MONTH * input.natGateways);
  if (input.natGateways > 0)
    push(`NAT data processing, ${input.natDataGB} GB`, `${money(p.natPerGB)} / GB`, p.natPerGB * input.natDataGB);
  push(`${input.loadBalancers} × Application Load Balancer, hourly`, `${money(p.albHourly)} / hour each`, p.albHourly * HOURS_PER_MONTH * input.loadBalancers);
  push(`${input.publicIps} × public IPv4 address`, `${money(p.ipv4Hourly)} / hour each`, p.ipv4Hourly * HOURS_PER_MONTH * input.publicIps);

  // Lines keep full precision; round only for display, so the total matches the unrounded sum.
  const total = lines.reduce((sum, l) => sum + l.monthly, 0);
  const compute = lines.find((l) => l.item.includes(instance.name))?.monthly ?? 0;
  return { lines, total, instance, computeShare: total > 0 ? compute / total : 0 };
}


export const formatUsd = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
