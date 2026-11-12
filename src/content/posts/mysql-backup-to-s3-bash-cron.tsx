// DRAFT: written from the public repo; review before publishing.
import type { PostMeta } from "@/lib/posts";
import CodeBlock from "@/components/site/CodeBlock";
import { A, Callout, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "mysql-backup-to-s3-bash-cron",
  title: "Automated MySQL backups to S3 with Bash and cron",
  description:
    "A Bash script that dumps MySQL or MariaDB and uploads it to Amazon S3 on a cron schedule, plus the hardening it needs: an IAM role, lifecycle rules and alerts.",
  date: "2026-10-30",
  tags: ["Bash", "MySQL", "AWS S3", "Linux", "Backups"],
  readingMinutes: 7,
};

export const headings: Heading[] = [
  { id: "what-the-script-does", title: "What the script has to do" },
  { id: "credentials", title: "Keep credentials out of the script" },
  { id: "the-script", title: "The script" },
  { id: "iam-role", title: "Use an IAM role, not access keys" },
  { id: "retention", title: "Let S3 handle retention" },
  { id: "cron", title: "Schedule it with cron" },
  { id: "test-the-restore", title: "Test the restore" },
  { id: "what-id-do-next", title: "What I'd do next" },
];

const mysqlCnf = `
# /etc/mysql/backup.cnf  (chmod 600, owned by the user that runs the backup)
[mysqldump]
user=backup
password=use-a-long-random-password
`;

const grant = `
CREATE USER 'backup'@'localhost' IDENTIFIED BY 'use-a-long-random-password';
GRANT SELECT, SHOW VIEW, TRIGGER, EVENT, LOCK TABLES ON production_db.* TO 'backup'@'localhost';
`;

const envFile = `
# /etc/db-backup.env  (chmod 600)
DB_NAME="production_db"
S3_BUCKET="my-company-db-backups"
S3_PREFIX="mysql"
SLACK_WEBHOOK_URL=""   # optional
`;

const script = `
#!/usr/bin/env bash
# Dump one MySQL/MariaDB database, compress it and upload it to S3.
set -euo pipefail

# cron starts with a minimal PATH, so set it explicitly
export PATH="/usr/local/bin:/usr/bin:/bin"

source /etc/db-backup.env

STAMP=$(date +%Y-%m-%d-%H%M%S)
FILE="\${DB_NAME}-\${STAMP}.sql.gz"
WORKDIR=$(mktemp -d)

notify() {
  [[ -n "\${SLACK_WEBHOOK_URL:-}" ]] || return 0
  curl -fsS -X POST -H 'Content-type: application/json' \\
    --data "{\\"text\\":\\"$1\\"}" "$SLACK_WEBHOOK_URL" >/dev/null || true
}

trap 'rm -rf "$WORKDIR"' EXIT
trap 'notify "DB backup FAILED for \${DB_NAME} on $(hostname)"' ERR

echo "[$(date)] Dumping \${DB_NAME}"
mysqldump --defaults-extra-file=/etc/mysql/backup.cnf \\
  --single-transaction --routines --triggers --no-tablespaces \\
  "$DB_NAME" | gzip > "\${WORKDIR}/\${FILE}"

echo "[$(date)] Uploading \${FILE}"
aws s3 cp "\${WORKDIR}/\${FILE}" "s3://\${S3_BUCKET}/\${S3_PREFIX}/\${FILE}" --only-show-errors

echo "[$(date)] Done"
notify "DB backup OK: \${FILE}"
`;

const iamPolicy = `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "WriteBackupsOnly",
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::my-company-db-backups/mysql/*"
    }
  ]
}
`;

const lifecycle = `
cat > lifecycle.json <<'JSON'
{
  "Rules": [
    {
      "ID": "expire-mysql-backups",
      "Status": "Enabled",
      "Filter": { "Prefix": "mysql/" },
      "Expiration": { "Days": 7 }
    }
  ]
}
JSON

aws s3api put-bucket-lifecycle-configuration \\
  --bucket my-company-db-backups \\
  --lifecycle-configuration file://lifecycle.json
`;

const cron = `
# Every day at 02:00, with output appended to a log file
0 2 * * * /usr/local/bin/db-backup-s3.sh >> /var/log/db-backup.log 2>&1
`;

const restore = `
# Download one backup and load it into a scratch database
aws s3 cp s3://my-company-db-backups/mysql/production_db-2026-10-30-020000.sql.gz .

mysql -e "CREATE DATABASE restore_test"
gunzip < production_db-2026-10-30-020000.sql.gz | mysql restore_test

# Spot-check: do the tables and row counts look right?
mysql -e "SELECT table_name, table_rows FROM information_schema.tables WHERE table_schema = 'restore_test'"
`;

export default function Article() {
  return (
    <Prose>
      <p>
        A backup that depends on someone remembering to run it is not a backup. Neither is one stored on the
        same server as the database. My{" "}
        <A href="/projects/s3-database-backup-automation">S3 database backup project</A> is a Bash script
        that fixes both: it dumps a MySQL or MariaDB database every night and sends the result to Amazon S3.
      </p>
      <p>
        The <A href="https://github.com/ajayautade/s3-db-backup-automation">version in the repository</A> is
        deliberately simple, and its README lists three things to improve before using it on a real server:
        move the credentials out of the script, use an IAM role instead of access keys, and add
        notifications. This article is the script with those changes made.
      </p>

      <H2 id="what-the-script-does">What the script has to do</H2>
      <ol>
        <li>Export the database to a file without blocking the application.</li>
        <li>Compress it.</li>
        <li>Upload it somewhere that survives the server being lost.</li>
        <li>Remove the local copy.</li>
        <li>Delete old backups so storage does not grow forever.</li>
        <li>Tell someone when any of this fails.</li>
      </ol>

      <H2 id="credentials">Keep credentials out of the script</H2>
      <p>
        The original script takes the password as a variable and passes it to{" "}
        <code>mysqldump -p&quot;$DB_PASS&quot;</code>. That has two problems: the password sits in a file
        that tends to get committed, and while the dump runs, it can show up in the process list for other
        users on the machine.
      </p>
      <p>
        MySQL has a built-in answer: an option file that only the backup user can read.
      </p>
      <CodeBlock lang="ini" code={mysqlCnf} />
      <p>Give that database user only what a dump needs, and nothing that can change data:</p>
      <CodeBlock lang="sql" code={grant} />
      <p>Everything else that varies between servers goes into a small environment file:</p>
      <CodeBlock lang="bash" code={envFile} />

      <H2 id="the-script">The script</H2>
      <CodeBlock lang="bash" title="/usr/local/bin/db-backup-s3.sh" code={script} />
      <p>What changed from the first version, and why:</p>
      <ul>
        <li>
          <strong>
            <code>set -euo pipefail</code>
          </strong>{" "}
          instead of <code>set -e</code>. Without <code>pipefail</code>, a failed <code>mysqldump</code>{" "}
          piped into <code>gzip</code> still counts as success, and you upload an empty archive every night
          without knowing.
        </li>
        <li>
          <strong>
            <code>--single-transaction</code>
          </strong>{" "}
          takes a consistent snapshot of InnoDB tables without locking them, so the application keeps
          working during the dump. It does not help with MyISAM tables.
        </li>
        <li>
          <strong>
            <code>--routines --triggers</code>
          </strong>{" "}
          include stored procedures and triggers, which a default dump can leave out.
        </li>
        <li>
          <strong>
            <code>--no-tablespaces</code>
          </strong>{" "}
          avoids needing the global <code>PROCESS</code> privilege on newer MySQL 8 versions.
        </li>
        <li>
          <strong>gzip directly</strong>, not <code>tar</code>. There is only one file, so an archive adds
          nothing.
        </li>
        <li>
          <strong>
            <code>mktemp -d</code> and an <code>EXIT</code> trap
          </strong>{" "}
          mean the temporary files are removed even when the script fails halfway.
        </li>
        <li>
          <strong>An <code>ERR</code> trap</strong> sends a message when any step fails. The webhook is
          optional; leave the variable empty and the function does nothing.
        </li>
      </ul>
      <Callout title="Check free disk space">
        <p>
          The dump is written to the server before it is uploaded. Make sure the temporary directory has
          room for a compressed copy of the database, or point <code>TMPDIR</code> at a volume that does.
        </p>
      </Callout>

      <H2 id="iam-role">Use an IAM role, not access keys</H2>
      <p>
        Running <code>aws configure</code> on the server stores a permanent access key in a file. On EC2
        there is a better option: attach an IAM role to the instance. The AWS CLI picks up temporary
        credentials from the instance automatically, and nothing is stored on disk.
      </p>
      <p>The role only needs to write objects under one prefix:</p>
      <CodeBlock lang="json" title="backup-write-policy.json" code={iamPolicy} />
      <p>
        Notice what is missing: no read, no list, no delete. If the server is compromised, the attacker
        cannot download or destroy earlier backups with these credentials. Turn on bucket versioning as
        well, so an overwrite cannot silently replace a good backup.
      </p>

      <H2 id="retention">Let S3 handle retention</H2>
      <p>
        The original script lists the bucket and deletes anything older than seven days. It works, with
        two catches: it needs list and delete permissions, and it uses <code>date -d</code>, which only
        exists in GNU date, so it breaks on macOS and BSD.
      </p>
      <p>An S3 lifecycle rule does the same job with no code and no extra permissions on the server:</p>
      <CodeBlock lang="bash" code={lifecycle} />
      <p>
        Set this up once, from your own machine or from Terraform, with an identity that is allowed to
        manage the bucket. With versioning on, add a rule to expire noncurrent versions as well.
      </p>

      <H2 id="cron">Schedule it with cron</H2>
      <p>
        Make the script executable, then run <code>crontab -e</code> as the backup user and add one line:
      </p>
      <CodeBlock lang="cron" code={cron} />
      <p>
        cron runs jobs with a very small environment, which is why the script sets <code>PATH</code>{" "}
        itself. Run the script by hand once before trusting the schedule, and check the log the morning
        after the first scheduled run.
      </p>

      <H2 id="test-the-restore">Test the restore</H2>
      <p>
        An upload succeeding tells you a file exists. It does not tell you the file can rebuild your
        database. The only way to know is to restore one:
      </p>
      <CodeBlock lang="bash" code={restore} />
      <p>
        Do this on a different machine from the database server, with credentials that can read the bucket.
        It also tells you how long a restore takes, which is the number people ask for during an outage.
      </p>

      <H2 id="what-id-do-next">What I&apos;d do next</H2>
      <ul>
        <li>Encrypt the bucket with SSE-KMS and block all public access at the bucket level.</li>
        <li>
          Alert on a <em>missing</em> backup, not only a failed one. If the server is down, the script never
          runs and never complains.
        </li>
        <li>Automate the restore test on a schedule, so it happens without anyone remembering.</li>
        <li>
          For large databases, look at physical backups or managed snapshots. A logical dump gets slow to
          take and slower to restore as data grows.
        </li>
      </ul>
      <p>
        The original script and README are on the{" "}
        <A href="/projects/s3-database-backup-automation">project page</A>. The same idea, replacing stored
        AWS keys with short-lived credentials, applies to pipelines too:{" "}
        <A href="/blog/github-actions-aws-oidc-terraform">GitHub Actions to AWS without long-lived keys</A>.
      </p>
    </Prose>
  );
}
