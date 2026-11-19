import type { Metadata } from "next";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";
import DockerfileChecker from "@/components/tools/DockerfileChecker";
import { site } from "@/lib/site";

const title = "Dockerfile Checker: Size, Security and Caching";
const description =
  "Free Dockerfile checker: paste a Dockerfile to find unpinned base images, root users, single-stage builds, leaked secrets, cache-busting COPY order and shell-form CMD, with how to fix each one.";
const path = "/tools/dockerfile-checker";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | ${site.name}`, description, url: path },
};

export default function DockerfilePage() {
  return (
    <ToolShell
      slug="dockerfile-checker"
      lead="Paste a Dockerfile to find what makes the image bigger, slower to build or less safe than it needs to be."
      description={description}
      notesHeading="What the checks look for"
      notes={[
        {
          title: "Pin the base image",
          body: (
            <>
              <code>python:latest</code> and an untagged <code>python</code> both move. Pin a version such as{" "}
              <code>python:3.12-slim</code>, and add a digest (<code>@sha256:...</code>) if you need the same bytes on
              every build.
            </>
          ),
        },
        {
          title: "Build in one stage, ship another",
          body: (
            <>
              A multi-stage build compiles and installs in a builder stage, then copies only the result into a clean
              runtime image. Compilers, caches and dev dependencies never reach production.
            </>
          ),
        },
        {
          title: "Order for the cache",
          body: (
            <>
              Docker reuses a layer only if everything before it is unchanged. Copy the lockfile, install dependencies,
              then copy the source, so a code change does not reinstall every package.
            </>
          ),
        },
        {
          title: "Exec form, so signals arrive",
          body: (
            <>
              <code>CMD python app.py</code> runs under <code>/bin/sh -c</code>, which does not pass on{" "}
              <code>SIGTERM</code>. Kubernetes then waits out the grace period and kills the pod. Write{" "}
              <code>CMD [&quot;python&quot;, &quot;app.py&quot;]</code> instead.
            </>
          ),
        },
        {
          title: "What this tool does not cover",
          body: (
            <>
              It reads the text; it does not build the image, scan packages for CVEs or follow <code>ARG</code>{" "}
              substitution. Pair it with <code>docker scout</code>, Trivy or hadolint in CI.
            </>
          ),
        },
        {
          title: "A worked example",
          body: (
            <>
              My <Link href="/blog/shrink-ml-docker-image-multi-stage-build">article on shrinking an ML Docker image</Link>{" "}
              applies these fixes to a PyTorch service, one step at a time, and measures the result.
            </>
          ),
        },
      ]}
    >
      <DockerfileChecker />
    </ToolShell>
  );
}
