// DRAFT: figures checked against the linked official pages on 2026-11-15; review before publishing.
import type { PostMeta } from "@/lib/posts";
import { A, Callout, DataTable, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "github-actions-vs-jenkins-small-team",
  title: "GitHub Actions vs Jenkins for a small team: cost, upkeep and when each fits",
  description:
    "A practical comparison for teams without a dedicated DevOps person: what each costs with current prices, what you have to maintain, and how credentials work.",
  date: "2026-11-15",
  tags: ["CI/CD", "GitHub Actions", "Jenkins", "Comparison"],
  readingMinutes: 8,
  service: "ci-cd-automation",
  project: "end-to-end-cicd-pipeline",
  cta: "Choosing a CI system, or moving off one? I can set up the pipeline and document how releases work.",
};

export const headings: Heading[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "github-actions-cost", title: "What GitHub Actions costs" },
  { id: "jenkins-cost", title: "What Jenkins costs" },
  { id: "upkeep", title: "What you have to maintain" },
  { id: "credentials", title: "Credentials for the cloud" },
  { id: "limits", title: "Limits worth knowing" },
  { id: "when-jenkins", title: "When Jenkins is the right choice" },
  { id: "how-to-decide", title: "How to decide" },
];

export default function Article() {
  return (
    <Prose>
      <p>
        I have built pipelines with both: Jenkins with SonarQube in my{" "}
        <A href="/projects/chat-app">chat app project</A>, and GitHub Actions in most of the others, including the{" "}
        <A href="/projects/end-to-end-cicd-pipeline">end-to-end CI/CD pipeline</A>. For a small team the question is rarely which tool is more capable. It is which one you can
        afford to look after. This article compares them on the things that decide that.
      </p>
      <p>
        Prices change, so every figure below links to the official page it came from. I checked them on 15 November
        2026.
      </p>

      <H2 id="short-answer">The short answer</H2>
      <p>
        If your code is on GitHub and you have no one whose job is to run CI, use GitHub Actions. There is no
        server to patch, and the included usage covers a lot of small-team work. Choose Jenkins when you have a
        specific reason: the code or the build has to stay on your own network, you already run Jenkins well, or
        your builds need hardware that hosted runners do not offer.
      </p>

      <H2 id="github-actions-cost">What GitHub Actions costs</H2>
      <p>
        For public repositories, standard GitHub-hosted runners are free. For private repositories, each plan
        includes a monthly allowance, and GitHub&rsquo;s{" "}
        <A href="https://docs.github.com/en/billing/concepts/product-billing/github-actions">billing documentation</A>{" "}
        now states it as a dollar amount, not as minutes:
      </p>
      <DataTable
        caption="GitHub Actions included usage for private repositories, by plan"
        head={["Plan", "Included compute / month", "Artifact storage"]}
        rows={[
          ["GitHub Free", "$12", "500 MB"],
          ["GitHub Pro", "$18", "1 GB"],
          ["GitHub Team", "$18", "2 GB"],
        ]}
      />
      <p>
        What that buys depends on the runner. The{" "}
        <A href="https://docs.github.com/en/billing/reference/actions-runner-pricing">runner pricing reference</A>{" "}
        lists these per-minute rates:
      </p>
      <DataTable
        caption="GitHub-hosted runner prices per minute"
        head={["Runner", "Per minute"]}
        rows={[
          ["Linux, 2-core x64", "$0.006"],
          ["Linux, 2-core arm64", "$0.005"],
          ["Windows, 2-core x64", "$0.010"],
          ["macOS, 3 or 4-core", "$0.062"],
        ]}
      />
      <p>
        On the standard Linux runner, $12 is 2,000 minutes and $18 is 3,000. A team whose pipeline takes 8 minutes
        can run it 250 times a month on the Free plan before paying anything. macOS is about ten times the Linux
        rate, so the same $12 covers under 200 minutes; if you build iOS apps, that is the number to plan around.
      </p>
      <p>
        Self-hosted runners are free to use with GitHub Actions; you pay for the machines. GitHub announced a
        $0.002 per minute charge for self-hosted usage, due in March 2026, then{" "}
        <A href="https://github.blog/changelog/2025-12-16-coming-soon-simpler-pricing-and-a-better-experience-for-github-actions/">
          postponed it
        </A>{" "}
        with no new date. As of this writing there is no such charge, but it is worth checking before you plan
        around self-hosting.
      </p>

      <H2 id="jenkins-cost">What Jenkins costs</H2>
      <p>
        The software costs nothing. Jenkins is open source under the{" "}
        <A href="https://www.jenkins.io/license/">MIT licence</A>. What you pay for is somewhere to run it and the
        time to keep it running.
      </p>
      <p>
        The <A href="https://www.jenkins.io/doc/book/installing/linux/">installation guide</A> gives a minimum of
        256 MB of RAM and 1 GB of disk, and recommends 4 GB or more of RAM and 50 GB or more of disk for a small
        team. In practice that is one small cloud instance running all month, plus build agents if you do not want
        builds competing with the controller. Current Jenkins releases need{" "}
        <A href="https://www.jenkins.io/doc/book/platform-information/support-policy-java/">Java 21 or 25</A>.
      </p>
      <p>
        The server is the smaller cost. The larger one does not appear on an invoice, and it is the subject of the
        next section.
      </p>

      <H2 id="upkeep">What you have to maintain</H2>
      <DataTable
        caption="Maintenance responsibilities: GitHub Actions on hosted runners compared with Jenkins"
        head={["Job", "GitHub Actions (hosted)", "Jenkins"]}
        rows={[
          ["Operating system patches", "GitHub", "You"],
          ["CI software upgrades", "GitHub", "You"],
          ["Plugin updates and conflicts", "n/a", "You"],
          ["Backups of CI configuration", "In the repository", "You"],
          ["Scaling build capacity", "Automatic", "You"],
          ["Access control", "GitHub permissions", "You"],
        ]}
      />
      <p>
        Jenkins gets most of its features from plugins. The{" "}
        <A href="https://plugins.jenkins.io/">plugin index</A> lists more than 2,300 of them, which is both the
        reason Jenkins can do almost anything and the reason upgrades need care: plugins depend on each other and
        on the Jenkins version. A Jenkins server that nobody owns tends to fall behind on updates, and it holds
        credentials for everything it deploys to.
      </p>
      <p>
        With GitHub Actions the pipeline is a YAML file in the repository. There is nothing else to back up, and a
        new repository gets CI by copying a file.
      </p>

      <H2 id="credentials">Credentials for the cloud</H2>
      <p>
        This is where I think the gap is widest. GitHub Actions has{" "}
        <A href="https://docs.github.com/en/actions/concepts/security/openid-connect">OpenID Connect</A> built in:
        a workflow can exchange a short-lived token with AWS, Azure or Google Cloud, so no long-lived access key
        is stored anywhere. I walk through the AWS setup in{" "}
        <A href="/blog/github-actions-aws-oidc-terraform">GitHub Actions to AWS without long-lived keys</A>.
      </p>
      <p>
        Jenkins can do the same with the{" "}
        <A href="https://plugins.jenkins.io/oidc-provider/">OpenID Connect Provider plugin</A>, or by running on an
        instance with an IAM role. Both work. Both are things you set up and maintain, and the common shortcut,
        pasting an access key into the Jenkins credentials store, is the thing to avoid.
      </p>

      <H2 id="limits">Limits worth knowing</H2>
      <ul>
        <li>
          A job on a GitHub-hosted runner can run for{" "}
          <A href="https://docs.github.com/en/actions/reference/limits">up to 6 hours</A>. On a self-hosted runner
          the limit is 5 days.
        </li>
        <li>
          The standard Linux runner has{" "}
          <A href="https://docs.github.com/en/actions/reference/runners/github-hosted-runners">
            2 CPUs and 8 GB of RAM for private repositories
          </A>
          , and 4 CPUs and 16 GB for public ones. Builds that need more have to use larger paid runners or your own
          machines.
        </li>
        <li>
          Hosted runners start clean every time. That is good for reproducibility and bad for build speed unless
          you set up caching.
        </li>
        <li>Jenkins has none of these limits, because the machine is yours. Its limits are whatever you provision.</li>
      </ul>

      <H2 id="when-jenkins">When Jenkins is the right choice</H2>
      <ul>
        <li>
          <strong>The code is not on GitHub</strong>, or policy says builds must run inside your own network.
        </li>
        <li>
          <strong>Builds need special hardware:</strong> GPUs, a lot of memory, or devices attached to the build
          machine.
        </li>
        <li>
          <strong>Build volume is high and steady.</strong> At some point a machine you already pay for is cheaper
          than per-minute billing. Work it out from your own minutes and the rates above.
        </li>
        <li>
          <strong>You already run Jenkins well.</strong> A maintained Jenkins with working pipelines is not a
          problem that needs solving.
        </li>
      </ul>
      <Callout title="A middle path">
        <p>
          GitHub Actions with a self-hosted runner gives you your own hardware and network position while keeping
          the pipeline definition, permissions and UI on GitHub. You still patch the runner machine, but there is
          no CI server to upgrade.
        </p>
      </Callout>

      <H2 id="how-to-decide">How to decide</H2>
      <ol>
        <li>Count your build minutes for a normal month, by operating system.</li>
        <li>Multiply by the rates above and subtract the included amount for your plan.</li>
        <li>
          Compare that with a server for Jenkins <em>plus</em> a realistic number of hours a month to maintain it.
        </li>
        <li>If nobody on the team would own the Jenkins server, that settles it.</li>
      </ol>
      <p>
        For most small teams the first number is zero or close to it, and the decision is easy. If yours is not,
        the <A href="/services/ci-cd-automation">CI/CD service page</A> describes how I approach building either
        one.
      </p>
    </Prose>
  );
}
