// DRAFT: written from the public repo; review before publishing.
import type { PostMeta } from "@/lib/posts";
import CodeBlock from "@/components/site/CodeBlock";
import { A, Callout, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "shrink-ml-docker-image-multi-stage-build",
  title: "Shrinking a PyTorch Docker image with a multi-stage build",
  description:
    "How I cut a FastAPI + Transformers image from roughly 3 GB to about 800 MB: CPU-only PyTorch wheels, a multi-stage Dockerfile, and a model baked in at build time.",
  date: "2026-11-13",
  tags: ["Docker", "PyTorch", "MLOps", "Kubernetes"],
  readingMinutes: 6,
};

export const headings: Heading[] = [
  { id: "where-the-size-comes-from", title: "Where the size comes from" },
  { id: "cpu-only-pytorch", title: "Step 1: install CPU-only PyTorch" },
  { id: "multi-stage-build", title: "Step 2: split the build into two stages" },
  { id: "bake-the-model-in", title: "Step 3: bake the model in at build time" },
  { id: "measure-it", title: "Measure it instead of guessing" },
  { id: "what-id-do-next", title: "What I'd do next" },
];

const naive = `
FROM python:3.12
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
`;

const cpuTorch = `
# Installs torch 2.6.0+cpu: no CUDA libraries, no nvidia-* packages
pip install torch==2.6.0 --index-url https://download.pytorch.org/whl/cpu

# torch==2.6.0 in requirements.txt is now already satisfied
pip install -r requirements.txt
`;

const dockerfile = `
# ---------- Stage 1: build ----------
FROM python:3.12-slim AS builder

ENV PIP_NO_CACHE_DIR=1 \\
    HF_HOME=/opt/hf

# A virtualenv gives us one directory to copy into the final image
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /build
COPY requirements.txt download_model.py ./

RUN pip install torch==2.6.0 --index-url https://download.pytorch.org/whl/cpu \\
 && pip install -r requirements.txt

# Download the model once, at build time
RUN python download_model.py

# ---------- Stage 2: runtime ----------
FROM python:3.12-slim AS production

RUN groupadd -r appuser && useradd -r -g appuser -d /app appuser

ENV PATH="/opt/venv/bin:$PATH" \\
    HF_HOME=/opt/hf \\
    HF_HUB_OFFLINE=1 \\
    PYTHONUNBUFFERED=1

WORKDIR /app
COPY --from=builder /opt/venv /opt/venv
COPY --from=builder --chown=appuser:appuser /opt/hf /opt/hf
COPY --chown=appuser:appuser app/ ./app/

USER appuser
EXPOSE 8080
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
`;

const downloadModel = `
# download_model.py: runs during "docker build", never at container start
from transformers import pipeline

# Loading the pipeline once writes the weights and tokenizer into $HF_HOME
pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english",
)
`;

const measure = `
# Total size
docker image ls sentiment-api

# Size of every layer, largest problems first
docker history --no-trunc --format "{{.Size}}\\t{{.CreatedBy}}" sentiment-api | sort -rh | head

# What is actually taking the space inside the virtualenv
docker run --rm sentiment-api sh -c "du -sh /opt/venv/lib/python3.12/site-packages/* | sort -rh | head"
`;

export default function Article() {
  return (
    <Prose>
      <p>
        My <A href="/projects/mlops-sentiment-analyzer">MLOps sentiment analyzer</A> serves a DistilBERT model
        behind FastAPI on Kubernetes. The first image I built for it was around 3 GB. The one in the repo
        today is about 800 MB. Both numbers are from the{" "}
        <A href="https://github.com/ajayautade/mlops-sentiment-analyzer">project README</A>, measured on
        that project, so treat them as one data point and not a benchmark.
      </p>
      <p>
        Image size matters more for ML services than for most web apps. Every new node has to pull the
        image before a pod can start, so a 3 GB image makes autoscaling slow exactly when you need it to be
        fast. Big layers also made my builds time out while downloading wheels. Three changes fixed most of
        it.
      </p>

      <H2 id="where-the-size-comes-from">Where the size comes from</H2>
      <p>This is roughly what a first attempt looks like:</p>
      <CodeBlock lang="dockerfile" title="Dockerfile (naive)" code={naive} />
      <p>It works, and it carries a lot of weight that the running service never uses:</p>
      <ul>
        <li>
          <strong>The CUDA build of PyTorch.</strong> On Linux, <code>pip install torch</code> from PyPI
          gives you the GPU build and pulls in a set of <code>nvidia-*</code> packages with it. If your
          nodes have no GPU, all of that is dead weight.
        </li>
        <li>
          <strong>A full base image.</strong> <code>python:3.12</code> includes compilers and development
          headers. <code>python:3.12-slim</code> leaves them out.
        </li>
        <li>
          <strong>Build leftovers.</strong> pip&apos;s download cache, the <code>.git</code> directory,
          tests and docs all end up in the image when you <code>COPY . .</code> without a{" "}
          <code>.dockerignore</code>.
        </li>
      </ul>

      <H2 id="cpu-only-pytorch">Step 1: install CPU-only PyTorch</H2>
      <p>
        This was the biggest single saving. PyTorch publishes CPU-only wheels on its own package index.
        Install <code>torch</code> from there first, then install everything else as usual:
      </p>
      <CodeBlock lang="bash" code={cpuTorch} />
      <p>
        The wheel you get is versioned <code>2.6.0+cpu</code>. The <code>+cpu</code> part is a local version
        label, and pip ignores local labels when it checks a plain <code>==2.6.0</code> pin. So the second
        command sees <code>torch</code> as already installed and does not replace it with the GPU build.
      </p>
      <Callout title="Check which build you got">
        <p>
          Run <code>python -c &quot;import torch; print(torch.__version__)&quot;</code> inside the image. You
          want <code>2.6.0+cpu</code>. If you see <code>+cu</code> followed by a number, the GPU build won.
        </p>
      </Callout>
      <p>
        The order matters, and so does where pip looks. Both installs have to target the same environment,
        otherwise the second one cannot see the first. That is one reason I use a virtualenv in the
        Dockerfile below.
      </p>

      <H2 id="multi-stage-build">Step 2: split the build into two stages</H2>
      <p>
        A multi-stage build uses one image to build things and a second, clean image to run them. Only what
        you explicitly copy across ends up in the final image. Everything else, such as compilers, caches
        and temporary files, is thrown away with the builder stage.
      </p>
      <CodeBlock lang="dockerfile" title="Dockerfile" code={dockerfile} />
      <p>A few details that are easy to miss:</p>
      <ul>
        <li>
          <strong>Copy the virtualenv, not the whole filesystem.</strong> Both stages use the same base
          image, so <code>/opt/venv</code> works unchanged after the copy.
        </li>
        <li>
          <strong>Set ownership during the copy.</strong> <code>COPY --chown</code> writes the files once
          with the right owner. If you copy as root and then run <code>chown -R</code> or <code>cp</code>{" "}
          in a later <code>RUN</code>, Docker stores those files a second time in a new layer. Deleting the
          originals afterwards does not shrink the image, because earlier layers are never rewritten.
        </li>
        <li>
          <strong>Run as a non-root user.</strong> It costs one line and removes a whole class of
          container-escape problems.
        </li>
        <li>
          <strong>Add a .dockerignore.</strong> Exclude <code>.git</code>, <code>terraform/</code>,{" "}
          <code>k8s/</code>, tests and docs. They never belong in a runtime image and they slow down every
          build by bloating the build context.
        </li>
      </ul>
      <p>
        The Dockerfile in the repo follows the same two-stage shape. It installs into a directory with{" "}
        <code>pip --prefix</code> instead of a virtualenv, and it copies the model cache in two steps.
        The version above is how I would write it now.
      </p>

      <H2 id="bake-the-model-in">Step 3: bake the model in at build time</H2>
      <p>
        By default, Transformers downloads model weights the first time the code asks for them. In a
        container that means every new pod downloads the model on startup. That slows down scaling, depends
        on an external service being reachable, and can hit rate limits when many pods start together.
      </p>
      <p>Downloading during the build avoids all three. The script can be this small:</p>
      <CodeBlock lang="python" title="download_model.py" code={downloadModel} />
      <p>
        <code>HF_HOME</code> tells the Hugging Face libraries where to keep their cache. Setting it to the
        same path in both stages means the runtime finds the files the builder downloaded.{" "}
        <code>HF_HUB_OFFLINE=1</code> then stops the runtime from calling out to the Hub at all, so a
        missing file fails loudly at startup instead of triggering a silent download.
      </p>
      <p>
        This does make the image bigger by the size of the model. I think that trade is right for a small
        model like DistilBERT. For multi-gigabyte models I would mount the weights from a volume or pull
        them from object storage in an init container instead.
      </p>

      <H2 id="measure-it">Measure it instead of guessing</H2>
      <p>
        I got more out of ten minutes with <code>docker history</code> than from any list of tips. It shows
        the size of each layer next to the instruction that created it, so the expensive lines are obvious:
      </p>
      <CodeBlock lang="bash" code={measure} />
      <p>
        If one <code>RUN</code> line accounts for most of the image, that is the line to work on. In my
        case it was the pip install, and inside it, PyTorch.
      </p>

      <H2 id="what-id-do-next">What I&apos;d do next</H2>
      <ul>
        <li>
          Pin the base image by digest, so a rebuild next month produces the same image as today.
        </li>
        <li>
          Use BuildKit cache mounts (<code>RUN --mount=type=cache,target=/root/.cache/pip</code>) to speed
          up rebuilds without leaving the cache in a layer.
        </li>
        <li>
          Try exporting the model to ONNX and serving it with ONNX Runtime, which would remove PyTorch from
          the runtime image entirely. I have not measured this yet.
        </li>
        <li>
          Scan the final image in CI. The project pipeline already runs Trivy before pushing.
        </li>
      </ul>
      <p>
        The full pipeline around this image, including the EKS cluster, Argo CD and the Prometheus metrics,
        is written up on the <A href="/projects/mlops-sentiment-analyzer">project page</A>. If you push
        images to AWS from CI, the next thing worth fixing is the credentials:{" "}
        <A href="/blog/github-actions-aws-oidc-terraform">
          GitHub Actions to AWS without long-lived keys
        </A>
        .
      </p>
    </Prose>
  );
}
