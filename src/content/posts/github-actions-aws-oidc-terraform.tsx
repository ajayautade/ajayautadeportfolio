// DRAFT: written from the public repo; review before publishing.
import type { PostMeta } from "@/lib/posts";
import CodeBlock from "@/components/site/CodeBlock";
import { A, Callout, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "github-actions-aws-oidc-terraform",
  title: "GitHub Actions to AWS without long-lived keys: OIDC with Terraform",
  description:
    "Set up GitHub Actions OIDC for AWS with Terraform: the identity provider, a role locked to one repository and branch, a least-privilege policy, and the workflow.",
  date: "2026-11-06",
  tags: ["GitHub Actions", "AWS", "Terraform", "CI/CD", "IAM"],
  readingMinutes: 7,
  service: "ci-cd-automation",
  project: "end-to-end-cicd-pipeline",
  cta: "Still storing AWS access keys as CI secrets? I can move your pipelines to short-lived OIDC credentials.",
};

export const headings: Heading[] = [
  { id: "why-not-access-keys", title: "Why not access keys" },
  { id: "how-oidc-works", title: "How the OIDC exchange works" },
  { id: "terraform-provider", title: "Terraform: the identity provider" },
  { id: "terraform-role", title: "Terraform: a role locked to one repo and branch" },
  { id: "terraform-policy", title: "Terraform: only the permissions the job needs" },
  { id: "workflow", title: "The workflow" },
  { id: "errors", title: "Errors I ran into" },
  { id: "what-id-do-next", title: "What I'd do next" },
];

const provider = `
resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
}
`;

const role = `
data "aws_iam_policy_document" "assume_role" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    # Only this repository, and only the main branch
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:\${var.github_org}/\${var.github_repo}:ref:refs/heads/main"]
    }
  }
}

resource "aws_iam_role" "github_actions" {
  name               = "github-actions-ecr-push-\${var.github_org}-\${var.github_repo}"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

output "github_actions_role_arn" {
  value = aws_iam_role.github_actions.arn
}
`;

const policy = `
data "aws_iam_policy_document" "ecr_push" {
  # Logging in to ECR is account-wide and cannot be scoped to one repository
  statement {
    sid       = "EcrAuth"
    actions   = ["ecr:GetAuthorizationToken"]
    resources = ["*"]
  }

  statement {
    sid = "EcrPushToRepo"
    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
      "ecr:PutImage",
      "ecr:BatchGetImage",
      "ecr:GetDownloadUrlForLayer",
    ]
    resources = [aws_ecr_repository.this.arn]
  }
}

resource "aws_iam_role_policy" "ecr_push" {
  name   = "ecr-push"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.ecr_push.json
}
`;

const workflow = `
name: ci

on:
  push:
    branches: [main]

permissions:
  contents: read
  id-token: write   # lets the job request an OIDC token

jobs:
  push-image:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Assume the AWS role
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ vars.AWS_ROLE_ARN }}
          aws-region: \${{ vars.AWS_REGION }}

      - name: Log in to Amazon ECR
        id: ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: \${{ steps.ecr.outputs.registry }}/\${{ vars.ECR_REPOSITORY }}:\${{ github.sha }}
`;

const importCmd = `
terraform import aws_iam_openid_connect_provider.github \\
  arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com
`;

const dataSource = `
data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}
`;

export default function Article() {
  return (
    <Prose>
      <p>
        The usual way to let GitHub Actions push to AWS is to create an IAM user, generate an access key,
        and paste it into repository secrets. It works on day one and becomes a liability after that. In my{" "}
        <A href="/projects/end-to-end-cicd-pipeline">end-to-end CI/CD pipeline</A> project I used OpenID
        Connect (OIDC) instead, with all of the AWS side defined in Terraform. This is how it fits together.
      </p>

      <H2 id="why-not-access-keys">Why not access keys</H2>
      <ul>
        <li>
          <strong>They don&apos;t expire.</strong> A key leaked through a log line, a fork or a compromised
          action keeps working until someone notices and rotates it.
        </li>
        <li>
          <strong>They aren&apos;t tied to anything.</strong> The key works from any machine, for any
          branch, for whoever holds it.
        </li>
        <li>
          <strong>Rotation is manual.</strong> In practice that means it rarely happens.
        </li>
      </ul>
      <p>
        With OIDC there is no stored secret at all. Each workflow run gets temporary credentials that expire
        on their own, and AWS decides whether to issue them based on which repository and branch is asking.
      </p>

      <H2 id="how-oidc-works">How the OIDC exchange works</H2>
      <ol>
        <li>The job asks GitHub for a signed token that describes the run: repository, branch, workflow.</li>
        <li>
          The job sends that token to AWS STS with <code>AssumeRoleWithWebIdentity</code>, naming the role
          it wants.
        </li>
        <li>
          AWS verifies the signature against GitHub&apos;s OIDC provider, then checks the role&apos;s trust
          policy against the claims inside the token.
        </li>
        <li>If they match, STS returns credentials that last for the session, one hour by default.</li>
      </ol>
      <p>
        So there are three things to create in AWS: the identity provider, a role with a trust policy, and a
        permissions policy for that role.
      </p>

      <H2 id="terraform-provider">Terraform: the identity provider</H2>
      <CodeBlock lang="hcl" title="main.tf" code={provider} />
      <p>
        An AWS account can only have one provider per URL, so this resource is created once per account,
        not once per repository. If several projects share an account, keep it in a shared Terraform stack
        and reference it elsewhere.
      </p>
      <Callout title="About thumbprint_list">
        <p>
          Older examples, including the one in my repo, also set <code>thumbprint_list</code>. Recent
          versions of the AWS provider make that argument optional, and AWS documents that it validates
          GitHub&apos;s provider against its own trusted certificate authorities. If your provider version
          still requires the argument, check the current AWS and GitHub documentation for the values.
        </p>
      </Callout>

      <H2 id="terraform-role">Terraform: a role locked to one repo and branch</H2>
      <p>The trust policy is where the security actually lives.</p>
      <CodeBlock lang="hcl" title="main.tf" code={role} />
      <p>
        The <code>sub</code> condition is the important line. Without it, any repository on GitHub could
        assume your role, because every GitHub token is signed by the same provider. The format of{" "}
        <code>sub</code> depends on what triggered the run:
      </p>
      <ul>
        <li>
          A branch push: <code>repo:ORG/REPO:ref:refs/heads/main</code>
        </li>
        <li>
          A tag: <code>repo:ORG/REPO:ref:refs/tags/v1.2.0</code>
        </li>
        <li>
          A pull request: <code>repo:ORG/REPO:pull_request</code>
        </li>
        <li>
          A job that uses a GitHub environment: <code>repo:ORG/REPO:environment:production</code>
        </li>
      </ul>
      <p>
        Be careful with wildcards. <code>repo:ORG/REPO:*</code> lets pull request runs assume the role too,
        which is usually not what you want for a role that can push images.
      </p>

      <H2 id="terraform-policy">Terraform: only the permissions the job needs</H2>
      <p>For a job that builds an image and pushes it to one ECR repository, this is enough:</p>
      <CodeBlock lang="hcl" title="main.tf" code={policy} />
      <p>
        <code>ecr:GetAuthorizationToken</code> has to be allowed on <code>*</code>; AWS does not support
        scoping it to a repository. Everything else is limited to the single repository ARN. In the project,
        the same role also deploys to ECS, so its policy has extra statements for registering task
        definitions and updating the service, plus <code>iam:PassRole</code> limited to the two task roles.
      </p>

      <H2 id="workflow">The workflow</H2>
      <CodeBlock lang="yaml" title=".github/workflows/ci.yml" code={workflow} />
      <p>Three things to notice:</p>
      <ul>
        <li>
          <code>id-token: write</code> is required. Setting <code>permissions</code> at all switches every
          permission you don&apos;t list to none, so <code>contents: read</code> has to be there for the
          checkout to work.
        </li>
        <li>
          The role ARN is not a secret. I store it as a repository <strong>variable</strong>, together with
          the region and repository name, from the Terraform output.
        </li>
        <li>
          There is no <code>aws-access-key-id</code> anywhere. If you see one in a workflow that also sets{" "}
          <code>role-to-assume</code>, the keys are being used to assume the role and you are back to
          storing secrets.
        </li>
      </ul>

      <H2 id="errors">Errors I ran into</H2>
      <p>
        <strong>&quot;Not authorized to perform sts:AssumeRoleWithWebIdentity&quot;.</strong> Almost always
        the <code>sub</code> condition. Check for a typo in the organisation or repository name, a branch
        other than the one in the policy, or a job that uses an environment, which changes the claim format
        completely.
      </p>
      <p>
        <strong>The provider already exists.</strong> If <code>terraform apply</code> fails because the
        account already has a GitHub provider, import it instead of creating a second one:
      </p>
      <CodeBlock lang="bash" code={importCmd} />
      <p>Or, if another stack owns it, read it with a data source and use its ARN in the trust policy:</p>
      <CodeBlock lang="hcl" code={dataSource} />
      <p>
        <strong>The job cannot request a token.</strong> The <code>permissions</code> block is missing{" "}
        <code>id-token: write</code>, or it is set on a different job than the one assuming the role.
      </p>

      <H2 id="what-id-do-next">What I&apos;d do next</H2>
      <ul>
        <li>
          Use GitHub environments with required reviewers for production, and trust the{" "}
          <code>environment:production</code> subject instead of a branch.
        </li>
        <li>
          If you want the trust policy without writing it by hand, the{" "}
          <A href="/tools/github-oidc-trust-policy">OIDC trust policy generator</A> builds it for any mix of
          branches, tags and environments, as JSON, Terraform or CLI.
        </li>
        <li>
          Split the role in two: one that can only push images, one that can deploy. A build job should not
          be able to change a running service.
        </li>
        <li>
          Shorten the session with <code>role-duration-seconds</code> if the job finishes in a few minutes.
        </li>
        <li>
          Tighten the ECS statements in my own policy, which currently allow those actions on all resources.
        </li>
      </ul>
      <p>
        The Terraform and workflow files are in the{" "}
        <A href="https://github.com/ajayautade/End-To-End-CICD-Pipeline">repository</A>, and the{" "}
        <A href="/projects/end-to-end-cicd-pipeline">project page</A> covers the rest of the pipeline. The
        image this job pushes is worth a look as well:{" "}
        <A href="/blog/shrink-ml-docker-image-multi-stage-build">
          shrinking a PyTorch Docker image with a multi-stage build
        </A>
        .
      </p>
    </Prose>
  );
}
