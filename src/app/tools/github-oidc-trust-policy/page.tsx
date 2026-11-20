import type { Metadata } from "next";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";
import OidcTrustGenerator from "@/components/tools/OidcTrustGenerator";
import { site } from "@/lib/site";

const title = "GitHub Actions OIDC Trust Policy Generator for AWS";
const description =
  "Free generator for the IAM trust policy that lets GitHub Actions assume an AWS role with OIDC, locked to a repository, branch, tag or environment. Outputs JSON, Terraform, AWS CLI and the workflow.";
const path = "/tools/github-oidc-trust-policy";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | ${site.name}`, description, url: path },
};

export default function OidcTrustPage() {
  return (
    <ToolShell
      slug="github-oidc-trust-policy"
      lead="Pick the repository and the runs that may deploy. Get a trust policy locked to exactly those, in JSON, Terraform or CLI form."
      description={description}
      notesHeading="OIDC trust policies, briefly"
      notes={[
        {
          title: "Why OIDC instead of access keys",
          body: (
            <>
              GitHub gives each workflow run a short-lived token signed by <code>token.actions.githubusercontent.com</code>.
              AWS checks the signature and hands back credentials that expire within the hour. There is no long-lived
              secret in your repository to leak or rotate.
            </>
          ),
        },
        {
          title: "The sub condition is the security",
          body: (
            <>
              Every GitHub token is signed by the same provider, so without a <code>sub</code> condition any repository
              on GitHub could assume your role. The subject names the repository and what triggered the run: a branch
              (<code>ref:refs/heads/main</code>), a tag, an environment or a pull request.
            </>
          ),
        },
        {
          title: "Environments make the best subjects",
          body: (
            <>
              When a job sets <code>environment: production</code>, its subject becomes{" "}
              <code>repo:ORG/REPO:environment:production</code> instead of the branch. Add required reviewers to that
              environment in GitHub and nobody can deploy without approval, whatever branch they push to.
            </>
          ),
        },
        {
          title: "StringEquals or StringLike",
          body: (
            <>
              With exact subjects the generator uses <code>StringEquals</code>. As soon as one contains <code>*</code>,
              the subject check switches to <code>StringLike</code>, which is the only operator that treats{" "}
              <code>*</code> as a wildcard.
            </>
          ),
        },
        {
          title: "The full walkthrough",
          body: (
            <>
              My <Link href="/blog/github-actions-aws-oidc-terraform">GitHub Actions to AWS with OIDC article</Link>{" "}
              builds this with Terraform end to end, with a least-privilege ECR policy and the errors you are likely to
              hit on the way.
            </>
          ),
        },
      ]}
    >
      <OidcTrustGenerator />
    </ToolShell>
  );
}
