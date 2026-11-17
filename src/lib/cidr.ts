/** IPv4 CIDR maths. Addresses are held as unsigned 32-bit numbers. */
export interface Cidr {
  ip: number;
  prefix: number;
}

export interface CidrInfo {
  cidr: string;
  network: string;
  broadcast: string;
  netmask: string;
  wildcard: string;
  firstHost: string;
  lastHost: string;
  total: number;
  usable: number;
  /** Usable in an AWS VPC subnet, where 5 addresses are reserved. Null when the block is outside /16–/28. */
  awsUsable: number | null;
  scope: string;
}

export const toIp = (n: number) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");

const maskOf = (prefix: number) => (prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0);

export function parseCidr(input: string): Cidr | { error: string } {
  const match = /^\s*(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\s*\/\s*(\d{1,2})\s*$/.exec(input);
  if (!match) return { error: "Enter an IPv4 block in CIDR form, for example 10.0.0.0/16." };
  const octets = match.slice(1, 5).map(Number);
  const prefix = Number(match[5]);
  if (octets.some((o) => o > 255)) return { error: "Each part of the address must be between 0 and 255." };
  if (prefix > 32) return { error: "The prefix length must be between 0 and 32." };
  const ip = ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
  return { ip, prefix };
}

function scopeOf(network: number): string {
  const inRange = (base: string, prefix: number) => {
    const parsed = parseCidr(`${base}/${prefix}`) as Cidr;
    return (network & maskOf(prefix)) >>> 0 === parsed.ip;
  };
  if (inRange("10.0.0.0", 8) || inRange("172.16.0.0", 12) || inRange("192.168.0.0", 16)) return "Private (RFC 1918)";
  if (inRange("100.64.0.0", 10)) return "Shared address space (RFC 6598, carrier-grade NAT)";
  if (inRange("127.0.0.0", 8)) return "Loopback";
  if (inRange("169.254.0.0", 16)) return "Link-local";
  if (inRange("224.0.0.0", 4)) return "Multicast";
  return "Public";
}

export function describeCidr({ ip, prefix }: Cidr): CidrInfo {
  const mask = maskOf(prefix);
  const network = (ip & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = 2 ** (32 - prefix);
  // /31 has two usable addresses on point-to-point links (RFC 3021); /32 is a single host.
  const usable = prefix >= 31 ? total : total - 2;
  return {
    cidr: `${toIp(network)}/${prefix}`,
    network: toIp(network),
    broadcast: toIp(broadcast),
    netmask: toIp(mask),
    wildcard: toIp(~mask >>> 0),
    firstHost: toIp(prefix >= 31 ? network : network + 1),
    lastHost: toIp(prefix >= 31 ? broadcast : broadcast - 1),
    total,
    usable,
    awsUsable: prefix >= 16 && prefix <= 28 ? total - 5 : null,
    scope: scopeOf(network),
  };
}

export interface Subnet {
  cidr: string;
  first: string;
  last: string;
  usable: number;
}

/** Split a block into equal subnets of `newPrefix`. Returns at most `limit` rows plus the full count. */
export function splitCidr({ ip, prefix }: Cidr, newPrefix: number, limit = 64): { count: number; subnets: Subnet[] } {
  const network = (ip & maskOf(prefix)) >>> 0;
  const count = 2 ** (newPrefix - prefix);
  const size = 2 ** (32 - newPrefix);
  const subnets: Subnet[] = [];
  for (let i = 0; i < Math.min(count, limit); i++) {
    const info = describeCidr({ ip: network + i * size, prefix: newPrefix });
    subnets.push({ cidr: info.cidr, first: info.firstHost, last: info.lastHost, usable: info.usable });
  }
  return { count, subnets };
}
