/**
 * A small static checker for Dockerfiles. It reads the instructions and flags common problems
 * with image size, security and build caching. It does not build the image or run hadolint.
 */

export type Severity = "high" | "medium" | "low";

export interface Finding {
  id: string;
  severity: Severity;
  line?: number;
  title: string;
  detail: string;
}

export interface Instruction {
  line: number;
  op: string;
  args: string;
}

export interface CheckResult {
  instructions: Instruction[];
  stages: number;
  findings: Finding[];
  passed: string[];
}

/** Joins continuation lines and drops comments, keeping the line each instruction starts on. */
export function parseDockerfile(text: string): Instruction[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const out: Instruction[] = [];
  let buffer = "";
  let start = 0;
  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (buffer === "" && (line === "" || line.startsWith("#"))) return;
    if (buffer !== "" && line.startsWith("#")) return; // comments inside a continuation
    if (buffer === "") start = i + 1;
    if (line.endsWith("\\")) {
      buffer += line.slice(0, -1) + " ";
      return;
    }
    buffer += line;
    const match = buffer.match(/^(\w+)\s*([\s\S]*)$/);
    if (match) out.push({ line: start, op: match[1].toUpperCase(), args: match[2].trim() });
    buffer = "";
  });
  if (buffer.trim()) {
    const match = buffer.match(/^(\w+)\s*([\s\S]*)$/);
    if (match) out.push({ line: start, op: match[1].toUpperCase(), args: match[2].trim() });
  }
  return out;
}

const SECRET_RE = /\b(\w*(?:password|passwd|secret|token|api_?key|access_?key|private_?key)\w*)\s*[= ]/i;

export function checkDockerfile(text: string): { error: string } | CheckResult {
  if (text.trim() === "") return { error: "Paste a Dockerfile." };
  const instructions = parseDockerfile(text);
  if (!instructions.some((i) => i.op === "FROM")) return { error: "No FROM instruction found. Every Dockerfile starts from a base image." };

  const findings: Finding[] = [];
  const passed: string[] = [];
  const add = (f: Finding) => findings.push(f);

  const froms = instructions.filter((i) => i.op === "FROM");
  const stageNames = new Set<string>();
  for (const from of froms) {
    const parts = from.args.split(/\s+/).filter((p) => !p.startsWith("--"));
    const image = parts[0] ?? "";
    const asIndex = parts.findIndex((p) => p.toLowerCase() === "as");
    if (asIndex > 0 && parts[asIndex + 1]) stageNames.add(parts[asIndex + 1].toLowerCase());
    if (stageNames.has(image.toLowerCase()) || image === "scratch" || image.startsWith("$")) continue;
    const ref = image.split("@")[0];
    const tag = ref.includes(":") && !ref.endsWith("]") ? ref.slice(ref.lastIndexOf(":") + 1) : "";
    if (image.includes("@sha256:")) continue;
    if (tag === "" || tag.includes("/"))
      add({ id: "untagged", severity: "high", line: from.line, title: `${image} has no tag`, detail: "With no tag Docker pulls :latest, so the same Dockerfile can build a different image tomorrow. Pin a version such as python:3.12-slim." });
    else if (tag === "latest")
      add({ id: "latest", severity: "high", line: from.line, title: `${image} uses :latest`, detail: "The :latest tag moves. Pin a version, and a digest (@sha256:...) if you need byte-for-byte repeatable builds." });
  }

  const stages = froms.length;
  const finalStart = froms[froms.length - 1].line;
  const finalStage = instructions.filter((i) => i.line >= finalStart);
  const runs = instructions.filter((i) => i.op === "RUN");
  const allRun = runs.map((r) => r.args).join("\n");
  const installsBuildTools = /\b(gcc|g\+\+|build-essential|make|cargo|go build|npm (ci|install)|yarn install|pnpm install|pip install|mvn |gradle )/i.test(allRun);

  if (stages === 1 && installsBuildTools)
    add({ id: "single-stage", severity: "medium", title: "Single-stage build with build tools", detail: "Compilers, package caches and dev dependencies end up in the image you ship. Build in one stage and COPY --from only the output into a clean runtime stage." });
  else if (stages > 1) passed.push(`Multi-stage build (${stages} stages)`);

  const users = finalStage.filter((i) => i.op === "USER");
  const lastUser = users[users.length - 1];
  const finalBase = froms[froms.length - 1].args.split(/\s+/).filter((p) => !p.startsWith("--"))[0] ?? "";
  const distroless = /distroless.*nonroot|chainguard/i.test(finalBase);
  if (!lastUser && !distroless)
    add({ id: "root", severity: "high", title: "The container runs as root", detail: "No USER in the final stage, so the process runs as root. Create a user and switch to it: RUN useradd --create-home app, then USER app." });
  else if (lastUser && /^(root|0)(:|$)/.test(lastUser.args))
    add({ id: "root", severity: "high", line: lastUser.line, title: "The final USER is root", detail: "The last USER instruction switches back to root, so the process runs as root. End with a non-root USER." });
  else passed.push("Runs as a non-root user");

  for (const run of runs) {
    const a = run.args;
    if (/\bapt-get\s+install\b/.test(a)) {
      if (!/--no-install-recommends/.test(a))
        add({ id: "apt-recommends", severity: "low", line: run.line, title: "apt-get install without --no-install-recommends", detail: "Recommended packages are installed too, which often adds tens of megabytes you never use." });
      if (!/rm -rf \/var\/lib\/apt\/lists/.test(a))
        add({ id: "apt-lists", severity: "low", line: run.line, title: "apt lists are left in the layer", detail: "Add && rm -rf /var/lib/apt/lists/* in the same RUN. Deleting them in a later RUN does not shrink the image." });
      if (!/\s-y\b|--yes|--assume-yes/.test(a))
        add({ id: "apt-yes", severity: "medium", line: run.line, title: "apt-get install without -y", detail: "The build waits for a yes that never comes and fails." });
    }
    if (/\bapt-get\s+update\b/.test(a) && !/\binstall\b/.test(a))
      add({ id: "apt-update-alone", severity: "medium", line: run.line, title: "apt-get update in its own RUN", detail: "Docker caches this layer, so a later install can use a stale package list. Run update and install in the same RUN." });
    if (/\bapt\s+(install|update)\b/.test(a))
      add({ id: "apt-cli", severity: "low", line: run.line, title: "apt instead of apt-get", detail: "apt is meant for people at a terminal and warns that its interface may change. Use apt-get in scripts." });
    if (/\bpip3?\s+install\b/.test(a) && !/--no-cache-dir/.test(a) && !/PIP_NO_CACHE_DIR/.test(text))
      add({ id: "pip-cache", severity: "low", line: run.line, title: "pip install keeps its cache", detail: "Add --no-cache-dir (or set ENV PIP_NO_CACHE_DIR=1). The wheel cache can be hundreds of megabytes for ML packages." });
    if (/\bapk\s+add\b/.test(a) && !/--no-cache/.test(a))
      add({ id: "apk-cache", severity: "low", line: run.line, title: "apk add without --no-cache", detail: "The package index stays in the layer. --no-cache fetches it, installs, and leaves nothing behind." });
    if (/\b(curl|wget)\b[^|]*\|\s*(ba|z)?sh\b/.test(a))
      add({ id: "curl-pipe", severity: "medium", line: run.line, title: "Downloads a script and pipes it to a shell", detail: "Whatever the server returns runs in your build. Download it, check a checksum, then run it." });
    if (/\bsudo\b/.test(a))
      add({ id: "sudo", severity: "low", line: run.line, title: "sudo in a RUN", detail: "Build steps already run as the current USER. Switch with USER root for the step instead of installing sudo." });
    if (/\bchmod\s+(-R\s+)?777\b/.test(a))
      add({ id: "chmod-777", severity: "medium", line: run.line, title: "chmod 777", detail: "World-writable files let any process in the container change them. Set ownership with COPY --chown and use tighter modes." });
    if (/\bchown\s+-R\b/.test(a))
      add({ id: "chown-r", severity: "low", line: run.line, title: "chown -R in a RUN", detail: "Changing ownership rewrites every file into a new layer, doubling its size. Use COPY --chown=user:group instead." });
    if (/^cd\s+\S+$/.test(a))
      add({ id: "cd", severity: "low", line: run.line, title: "RUN cd on its own", detail: "Each RUN starts a new shell, so the cd does not carry over. Use WORKDIR." });
  }

  const adds = instructions.filter((i) => i.op === "ADD");
  for (const add_ of adds) {
    const isUrl = /https?:\/\//.test(add_.args);
    const isArchive = /\.(tar|tar\.gz|tgz|tar\.bz2|tar\.xz)\b/.test(add_.args);
    if (!isUrl && !isArchive)
      add({ id: "add", severity: "low", line: add_.line, title: "ADD where COPY would do", detail: "ADD also unpacks archives and fetches URLs, which can surprise you. Use COPY for plain files." });
  }

  for (const i of instructions) {
    if ((i.op === "ENV" || i.op === "ARG") && SECRET_RE.test(i.args) && /=\s*\S/.test(i.args))
      add({ id: "secret", severity: "high", line: i.line, title: `Possible secret in ${i.op}`, detail: `${i.op} values are stored in the image metadata and visible with docker history. Pass secrets at run time, or use RUN --mount=type=secret during the build.` });
  }

  const copyAll = instructions.find((i) => i.op === "COPY" && /^(--\S+\s+)*\.\s+\S+$/.test(i.args));
  const installAfter = copyAll && runs.find((r) => r.line > copyAll.line && /\b(pip3? install|npm (ci|install)|yarn( install)?$|pnpm install|go mod download|bundle install|composer install)/.test(r.args));
  if (copyAll && installAfter)
    add({ id: "cache-order", severity: "medium", line: copyAll.line, title: "Source copied before dependencies are installed", detail: "Any code change invalidates the cache for the install step below it. Copy the lockfile (requirements.txt, package-lock.json) first, install, then COPY . ." });
  if (copyAll)
    add({ id: "dockerignore", severity: "low", line: copyAll.line, title: "COPY . . sends the whole folder", detail: "Make sure a .dockerignore excludes .git, node_modules, .env and test data, or they end up in the image and slow every build." });

  const workdir = instructions.some((i) => i.op === "WORKDIR");
  if (!workdir)
    add({ id: "workdir", severity: "low", title: "No WORKDIR", detail: "Files land in / by default. Set WORKDIR /app so paths are predictable." });

  const hasCmd = finalStage.some((i) => i.op === "CMD" || i.op === "ENTRYPOINT");
  const shellForm = finalStage.filter((i) => (i.op === "CMD" || i.op === "ENTRYPOINT") && !i.args.startsWith("["));
  if (!hasCmd)
    add({ id: "no-cmd", severity: "low", title: "No CMD or ENTRYPOINT in the final stage", detail: "The image inherits the base image's command, which is rarely your app." });
  for (const s of shellForm)
    add({ id: "shell-form", severity: "medium", line: s.line, title: `${s.op} in shell form`, detail: `Shell form runs your app under /bin/sh -c, so it does not receive SIGTERM and Kubernetes has to kill it after the grace period. Use the exec form: ${s.op} ["executable", "arg"].` });
  if (hasCmd && shellForm.length === 0) passed.push("CMD / ENTRYPOINT in exec form");

  const maintainer = instructions.find((i) => i.op === "MAINTAINER");
  if (maintainer)
    add({ id: "maintainer", severity: "low", line: maintainer.line, title: "MAINTAINER is deprecated", detail: 'Use LABEL org.opencontainers.image.authors="..." instead.' });

  if (!instructions.some((i) => i.op === "HEALTHCHECK"))
    passed.push("No HEALTHCHECK: fine on Kubernetes, which ignores it and uses probes instead");

  if (!findings.some((f) => f.id === "untagged" || f.id === "latest")) passed.push("Base images are pinned to a tag");

  const order: Record<Severity, number> = { high: 0, medium: 1, low: 2 };
  findings.sort((a, b) => order[a.severity] - order[b.severity] || (a.line ?? 0) - (b.line ?? 0));
  return { instructions, stages, findings, passed };
}
