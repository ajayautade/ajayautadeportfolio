/** Kubernetes resource maths for one container replicated N times. CPU in millicores, memory in MiB. */
export interface ResourceInput {
  replicas: number;
  cpuRequest: number | null;
  cpuLimit: number | null;
  memRequest: number | null;
  memLimit: number | null;
  nodeCpu: number; // vCPU
  nodeMemGiB: number;
  /** Share of the node kept back for the kubelet, system daemons and eviction threshold. */
  reservedPercent: number;
}

export type QosClass = "Guaranteed" | "Burstable" | "BestEffort";

export interface ResourceResult {
  qos: QosClass;
  qosReason: string;
  totalCpuRequest: number;
  totalMemRequest: number;
  totalCpuLimit: number | null;
  totalMemLimit: number | null;
  allocCpu: number;
  allocMem: number;
  podsPerNode: number | null;
  nodes: number | null;
  warnings: string[];
  yaml: string;
}

/**
 * QoS rules for a single-container pod, from the Kubernetes documentation:
 * Guaranteed needs CPU and memory requests equal to limits; BestEffort has
 * no requests or limits at all; everything else is Burstable. A limit set
 * without a request makes the request default to the limit.
 */
export function calculate(input: ResourceInput): ResourceResult {
  const cpuRequest = input.cpuRequest ?? input.cpuLimit;
  const memRequest = input.memRequest ?? input.memLimit;
  const { cpuLimit, memLimit } = input;
  const warnings: string[] = [];

  let qos: QosClass;
  let qosReason: string;
  if (cpuRequest === null && memRequest === null && cpuLimit === null && memLimit === null) {
    qos = "BestEffort";
    qosReason = "No requests or limits are set. These pods are the first to be evicted when a node runs short of memory.";
  } else if (cpuLimit !== null && memLimit !== null && cpuRequest === cpuLimit && memRequest === memLimit) {
    qos = "Guaranteed";
    qosReason = "CPU and memory requests equal their limits. These pods are the last to be evicted under memory pressure.";
  } else {
    qos = "Burstable";
    qosReason = "At least one request is set, but requests and limits are not all equal. Evicted after BestEffort pods, before Guaranteed ones.";
  }

  if (cpuLimit !== null && cpuRequest !== null && cpuLimit < cpuRequest) warnings.push("The CPU limit is lower than the CPU request. Kubernetes rejects this.");
  if (memLimit !== null && memRequest !== null && memLimit < memRequest) warnings.push("The memory limit is lower than the memory request. Kubernetes rejects this.");
  if (memLimit === null && qos !== "BestEffort") warnings.push("No memory limit: a leak in this container can take memory from everything else on the node.");
  if (memRequest === null && qos !== "BestEffort") warnings.push("No memory request: the scheduler assumes this container needs no memory when placing it.");
  if (cpuRequest === null && qos !== "BestEffort") warnings.push("No CPU request: the container gets the smallest CPU share when the node is busy.");

  const keep = 1 - input.reservedPercent / 100;
  const allocCpu = Math.floor(input.nodeCpu * 1000 * keep);
  const allocMem = Math.floor(input.nodeMemGiB * 1024 * keep);

  const fits: number[] = [];
  if (cpuRequest) fits.push(Math.floor(allocCpu / cpuRequest));
  if (memRequest) fits.push(Math.floor(allocMem / memRequest));
  const podsPerNode = fits.length ? Math.min(...fits) : null;
  if (podsPerNode === 0) warnings.push("One pod's requests are larger than a node's allocatable resources, so it can never be scheduled.");
  const nodes = podsPerNode ? Math.ceil(input.replicas / podsPerNode) : null;

  const lines = ["resources:"];
  if (cpuRequest !== null || memRequest !== null) {
    lines.push("  requests:");
    if (cpuRequest !== null) lines.push(`    cpu: "${cpuRequest}m"`);
    if (memRequest !== null) lines.push(`    memory: "${memRequest}Mi"`);
  }
  if (cpuLimit !== null || memLimit !== null) {
    lines.push("  limits:");
    if (cpuLimit !== null) lines.push(`    cpu: "${cpuLimit}m"`);
    if (memLimit !== null) lines.push(`    memory: "${memLimit}Mi"`);
  }
  if (lines.length === 1) lines[0] = "resources: {}";

  return {
    qos,
    qosReason,
    totalCpuRequest: (cpuRequest ?? 0) * input.replicas,
    totalMemRequest: (memRequest ?? 0) * input.replicas,
    totalCpuLimit: cpuLimit === null ? null : cpuLimit * input.replicas,
    totalMemLimit: memLimit === null ? null : memLimit * input.replicas,
    allocCpu,
    allocMem,
    podsPerNode,
    nodes,
    warnings,
    yaml: lines.join("\n"),
  };
}

export const formatCpu = (millicores: number) =>
  millicores >= 1000 ? `${(millicores / 1000).toFixed(millicores % 1000 === 0 ? 0 : 2)} vCPU` : `${millicores}m`;

export const formatMem = (mib: number) => (mib >= 1024 ? `${(mib / 1024).toFixed(mib % 1024 === 0 ? 0 : 2)} GiB` : `${mib} MiB`);
