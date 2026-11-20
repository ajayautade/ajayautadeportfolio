/**
 * Builds the IAM trust policy that lets GitHub Actions assume an AWS role through OIDC.
 * The subject formats follow GitHub's documentation for the `sub` claim.
 */

export type SubjectKind = "branch" | "tag" | "environment" | "pull_request" | "any";

export interface TrustSubject {
  kind: SubjectKind;
  /** Branch name, tag pattern or environment name. Ignored for pull_request and any. */
  value: string;
}

export interface TrustInput {
  accountId: string;
  owner: string;
  repo: string;
  subjects: TrustSubject[];
  roleName: string;
}

export interface TrustResult {
  policyJson: string;
  terraform: string;
  cli: string;
  workflow: string;
  subjects: string[];
  warnings: string[];
}

export const PROVIDER_HOST = "token.actions.githubusercontent.com";

const ACCOUNT_RE = /^\d{12}$/;
const OWNER_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const REPO_RE = /^[A-Za-z0-9._-]{1,100}$|^\*$/;
const ROLE_RE = /^[\w+=,.@-]{1,64}$/;

/** The `sub` claim GitHub puts in the token for one kind of run. */
export function subjectFor(owner: string, repo: string, subject: TrustSubject): string {
  const base = `repo:${owner}/${repo}`;
  switch (subject.kind) {
    case "branch":
      return `${base}:ref:refs/heads/${subject.value}`;
    case "tag":
      return `${base}:ref:refs/tags/${subject.value}`;
    case "environment":
      return `${base}:environment:${subject.value}`;
    case "pull_request":
      return `${base}:pull_request`;
    case "any":
      return `${base}:*`;
  }
}

export function buildTrust(input: TrustInput): { error: string } | TrustResult {
  const accountId = input.accountId.trim();
  const owner = input.owner.trim();
  const repo = input.repo.trim();
  const roleName = input.roleName.trim();

  if (!ACCOUNT_RE.test(accountId)) return { error: "The AWS account ID is 12 digits." };
  if (!OWNER_RE.test(owner)) return { error: "Enter the GitHub user or organisation name, for example acme." };
  if (!REPO_RE.test(repo)) return { error: "Enter the repository name, or * for every repository the owner has." };
  if (!ROLE_RE.test(roleName)) return { error: "Role names use letters, numbers and +=,.@_- and are at most 64 characters." };

  const needsValue = input.subjects.filter((s) => s.kind === "branch" || s.kind === "tag" || s.kind === "environment");
  if (needsValue.some((s) => s.value.trim() === "")) return { error: "Fill in every branch, tag or environment name." };
  if (input.subjects.length === 0) return { error: "Add at least one kind of run that may assume the role." };

  const subjects = [
    ...new Set(input.subjects.map((s) => subjectFor(owner, repo, { kind: s.kind, value: s.value.trim() }))),
  ];
  const wildcard = subjects.some((s) => s.includes("*"));
  const subOperator = wildcard ? "StringLike" : "StringEquals";
  const providerArn = `arn:aws:iam::${accountId}:oidc-provider/${PROVIDER_HOST}`;

  const subValue = subjects.length === 1 ? subjects[0] : subjects;
  // aud and sub share one StringEquals block when no wildcard is needed; a duplicate key would drop one.
  const condition: Record<string, Record<string, string | string[]>> = wildcard
    ? { StringEquals: { [`${PROVIDER_HOST}:aud`]: "sts.amazonaws.com" }, StringLike: { [`${PROVIDER_HOST}:sub`]: subValue } }
    : { StringEquals: { [`${PROVIDER_HOST}:aud`]: "sts.amazonaws.com", [`${PROVIDER_HOST}:sub`]: subValue } };

  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { Federated: providerArn },
        Action: "sts:AssumeRoleWithWebIdentity",
        Condition: condition,
      },
    ],
  };
  const policyJson = JSON.stringify(policy, null, 2);

  const warnings: string[] = [];
  if (repo === "*")
    warnings.push("Every repository under this owner can assume the role, including ones created later.");
  if (input.subjects.some((s) => s.kind === "any"))
    warnings.push("A :* subject lets pull request runs assume the role too. For a role that can deploy, list branches or environments instead.");
  if (input.subjects.some((s) => s.kind === "pull_request"))
    warnings.push("Pull request runs can assume this role. Keep its permissions read-only, because anyone who can open a pull request controls that code.");
  if (input.subjects.some((s) => (s.kind === "branch" || s.kind === "tag") && s.value.includes("*")))
    warnings.push("A wildcard branch or tag matches names anyone with push access can create. Protect those branches or tags in GitHub.");

  const tfValues = subjects.map((s) => `"${s}"`).join(",\n        ");
  const terraform = `resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://${PROVIDER_HOST}"
  client_id_list = ["sts.amazonaws.com"]
}

data "aws_iam_policy_document" "github_assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "${PROVIDER_HOST}:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "${subOperator}"
      variable = "${PROVIDER_HOST}:sub"
      values = [
        ${tfValues}
      ]
    }
  }
}

resource "aws_iam_role" "github_actions" {
  name               = "${roleName}"
  assume_role_policy = data.aws_iam_policy_document.github_assume.json
}
`;

  const cli = `# Once per account: register GitHub as an identity provider
aws iam create-open-id-connect-provider \\
  --url https://${PROVIDER_HOST} \\
  --client-id-list sts.amazonaws.com

# Save the policy above as trust-policy.json, then:
aws iam create-role \\
  --role-name ${roleName} \\
  --assume-role-policy-document file://trust-policy.json
`;

  const environment = input.subjects.find((s) => s.kind === "environment")?.value.trim();
  const workflow = `permissions:
  id-token: write   # lets the job request the OIDC token
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest${environment ? `\n    environment: ${environment}` : ""}
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::${accountId}:role/${roleName}
          aws-region: us-east-1
      - run: aws sts get-caller-identity
`;

  return { policyJson, terraform, cli, workflow, subjects, warnings };
}
