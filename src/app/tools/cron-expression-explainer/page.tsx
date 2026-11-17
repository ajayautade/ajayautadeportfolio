import type { Metadata } from "next";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";
import CronExplainer from "@/components/tools/CronExplainer";
import { site } from "@/lib/site";

const title = "Cron Expression Explainer, with Next Run Times";
const description =
  "Free cron explainer: paste a five-field cron expression to read it in plain English, field by field, and see the next five run times in UTC and your own time zone.";
const path = "/tools/cron-expression-explainer";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | ${site.name}`, description, url: path },
};

export default function CronPage() {
  return (
    <ToolShell
      slug="cron-expression-explainer"
      lead="Paste a cron expression to read it in plain English and see when it will next run."
      description={description}
      notesHeading="Cron syntax, briefly"
      notes={[
        {
          title: "The five fields",
          body: (
            <>
              In order: minute (0–59), hour (0–23), day of month (1–31), month (1–12 or <code>jan</code>–
              <code>dec</code>), and day of week (0–7 or <code>sun</code>–<code>sat</code>, where both 0 and 7 mean
              Sunday).
            </>
          ),
        },
        {
          title: "The four operators",
          body: (
            <>
              <code>*</code> matches every value. <code>,</code> makes a list (<code>1,15</code>). <code>-</code>{" "}
              makes a range (<code>9-17</code>). <code>/</code> sets a step (<code>*/15</code> is every 15th value
              starting from the lowest).
            </>
          ),
        },
        {
          title: "The day-of-month and day-of-week trap",
          body: (
            <>
              When both day fields are restricted, standard cron runs the job if <em>either</em> matches.{" "}
              <code>0 0 13 * 5</code> is not &ldquo;Friday the 13th&rdquo;; it is every 13th <em>and</em> every
              Friday.
            </>
          ),
        },
        {
          title: "What this tool does not cover",
          body: (
            <>
              Six- and seven-field formats with seconds or years, and extensions such as <code>L</code>,{" "}
              <code>W</code>, <code>#</code> and <code>?</code> used by Quartz and some cloud schedulers. GitHub
              Actions and Kubernetes CronJobs use the five-field form shown here.
            </>
          ),
        },
        {
          title: "A cron job worth having",
          body: (
            <>
              <code>0 2 * * *</code> is the schedule in my{" "}
              <Link href="/blog/mysql-backup-to-s3-bash-cron">MySQL backup to S3 article</Link>, including the two
              things cron gets wrong by default: the PATH and where the output goes.
            </>
          ),
        },
      ]}
    >
      <CronExplainer />
    </ToolShell>
  );
}
