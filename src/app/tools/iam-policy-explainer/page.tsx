import type { Metadata } from "next";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";
import IamPolicyExplainer from "@/components/tools/IamPolicyExplainer";
import { site } from "@/lib/site";

const title = "IAM and S3 Bucket Policy Explainer, in Plain English";
const description =
  "Free IAM policy explainer: paste an IAM, S3 bucket or trust policy and read each statement in plain English, with warnings for public access, wildcards and ARNs that match nothing.";
const path = "/tools/iam-policy-explainer";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | ${site.name}`, description, url: path },
};

export default function IamPolicyPage() {
  return (
    <ToolShell
      slug="iam-policy-explainer"
      lead="Paste an IAM, S3 bucket or trust policy to read what each statement allows or denies, and what looks risky."
      description={description}
      notesHeading="Reading a policy, briefly"
      notes={[
        {
          title: "Effect, Action, Resource, Condition",
          body: (
            <>
              Each statement says whether it <code>Allow</code>s or <code>Deny</code>s some actions on some resources,
              optionally only under conditions. Resource policies, such as bucket policies, also name a{" "}
              <code>Principal</code>: who the statement applies to.
            </>
          ),
        },
        {
          title: "Deny always wins",
          body: (
            <>
              AWS starts from an implicit deny. An <code>Allow</code> anywhere opens access, but an explicit{" "}
              <code>Deny</code> in any policy that applies closes it again, whatever else says.
            </>
          ),
        },
        {
          title: "Bucket ARN or object ARN",
          body: (
            <>
              <code>arn:aws:s3:::my-bucket</code> is the bucket; <code>arn:aws:s3:::my-bucket/*</code> is every object
              in it. <code>s3:ListBucket</code> needs the first, <code>s3:GetObject</code> and <code>s3:PutObject</code>{" "}
              need the second. Mixing them up is the most common reason a bucket policy &ldquo;does nothing&rdquo;.
            </>
          ),
        },
        {
          title: "What this tool does not do",
          body: (
            <>
              It explains one document. It does not evaluate it against your other policies, permission boundaries,
              session policies, SCPs or block public access settings, which can all change the outcome. For that, use
              the IAM policy simulator or IAM Access Analyzer.
            </>
          ),
        },
        {
          title: "Writing a trust policy instead?",
          body: (
            <>
              The <Link href="/tools/github-oidc-trust-policy">GitHub OIDC trust policy generator</Link> builds one for
              GitHub Actions, locked to a repository and branch or environment.
            </>
          ),
        },
      ]}
    >
      <IamPolicyExplainer />
    </ToolShell>
  );
}
