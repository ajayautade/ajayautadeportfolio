// DRAFT: written from the public repo; review before publishing.
import type { PostMeta } from "@/lib/posts";
import CodeBlock from "@/components/site/CodeBlock";
import { A, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "aws-3-tier-architecture-terraform",
  title: "A 3-tier AWS architecture in Terraform, tier by tier",
  description:
    "How I laid out a 3-tier AWS network in Terraform: six subnets across two zones, security groups that reference each other, an Auto Scaling group and S3 remote state.",
  date: "2026-11-15",
  tags: ["AWS", "Terraform", "VPC", "Security Groups"],
  readingMinutes: 7,
};

export const headings: Heading[] = [
  { id: "the-layout", title: "The layout" },
  { id: "chained-security-groups", title: "Security groups that reference each other" },
  { id: "modules", title: "Five small modules" },
  { id: "remote-state", title: "Remote state with locking" },
  { id: "scaling", title: "Scaling on CPU" },
  { id: "running-it", title: "Running it" },
  { id: "what-id-change", title: "What I'd change before production" },
];

const securityGroups = `
resource "aws_security_group" "alb" {
  name   = "\${var.project_name}-alb-sg"
  vpc_id = var.vpc_id

  ingress {
    description = "HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # ...443 is the same
}

resource "aws_security_group" "app" {
  name   = "\${var.project_name}-app-sg"
  vpc_id = var.vpc_id

  ingress {
    description     = "HTTP from ALB"
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }
}

resource "aws_security_group" "db" {
  name   = "\${var.project_name}-db-sg"
  vpc_id = var.vpc_id

  ingress {
    description     = "MySQL from app servers"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }
}
`;

const structure = `
aws-3tier-architecture/
├── modules/
│   ├── vpc/               # VPC, subnets, internet gateway, NAT, routes
│   ├── security-groups/   # ALB, app and database groups
│   ├── alb/               # load balancer and target group
│   ├── asg/               # launch template and Auto Scaling group
│   └── rds/               # MySQL instance
├── environments/
│   └── dev/               # wires the modules together for one environment
├── scripts/
│   └── init-backend.sh    # creates the S3 bucket and DynamoDB table for state
└── Makefile
`;

const backend = `
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "aws-3tier/dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}
`;

const run = `
./scripts/init-backend.sh   # once: S3 bucket + DynamoDB lock table

make init
make plan
make apply                  # RDS takes the longest
make destroy                # when you are done, to stop the charges
`;

export default function Article() {
  return (
    <Prose>
      <p>
        &ldquo;Three-tier&rdquo; is one of the first architectures people draw on AWS, and one of the easiest to
        get subtly wrong: the database ends up in a public subnet, or a security group allows the whole VPC. My{" "}
        <A href="/projects/aws-3tier-architecture">3-tier project</A> builds it in Terraform, with a Flask
        application behind a load balancer and a MySQL database that only the application can reach.
      </p>
      <p>
        The code is in <A href="https://github.com/ajayautade/aws-3tier-architecture">the repository</A>. This
        article covers the decisions in it that I would make again, and a few I would not.
      </p>

      <H2 id="the-layout">The layout</H2>
      <p>
        One VPC, <code>10.0.0.0/16</code>, spread over two availability zones. Each tier gets a pair of subnets,
        one per zone:
      </p>
      <ul>
        <li>
          <strong>Public</strong>, <code>10.0.1.0/24</code> and <code>10.0.2.0/24</code>: the Application Load
          Balancer and the NAT gateway. These are the only subnets with a route to the internet gateway.
        </li>
        <li>
          <strong>Private, application</strong>, <code>10.0.3.0/24</code> and <code>10.0.4.0/24</code>: EC2
          instances in an Auto Scaling group. They reach the internet outbound through NAT, for package installs,
          and are not reachable from it.
        </li>
        <li>
          <strong>Private, data</strong>, <code>10.0.5.0/24</code> and <code>10.0.6.0/24</code>: RDS MySQL 8.0.
        </li>
      </ul>
      <p>
        The subnets decide what <em>can</em> be routed. The security groups decide what is <em>allowed</em>. You
        want both to say the same thing.
      </p>

      <H2 id="chained-security-groups">Security groups that reference each other</H2>
      <p>
        The part of this project I point people at is the security group module. Each tier accepts traffic only
        from the security group of the tier in front of it, not from an IP range:
      </p>
      <CodeBlock lang="hcl" title="modules/security-groups/main.tf (trimmed)" code={securityGroups} />
      <p>
        The application group&rsquo;s ingress rule names <code>aws_security_group.alb.id</code> as its source. The
        database group names the application group. The chain is ALB to application to database, and there is no
        rule that lets anything skip a step.
      </p>
      <p>Referencing a group instead of a CIDR block has two practical benefits:</p>
      <ul>
        <li>
          It keeps working when instances change. The Auto Scaling group replaces instances and their IPs all the
          time; membership of the group is what counts.
        </li>
        <li>
          It is narrower than a subnet range. Allowing <code>10.0.3.0/24</code> on port 3306 would let anything
          ever launched in that subnet talk to the database.
        </li>
      </ul>

      <H2 id="modules">Five small modules</H2>
      <CodeBlock lang="text" code={structure} />
      <p>
        Each module does one thing and passes IDs to the next through outputs: the VPC module outputs subnet IDs,
        the security group module takes the VPC ID and outputs group IDs, and so on. The{" "}
        <code>environments/dev</code> folder is the only place that knows how they fit together. Adding a staging
        environment is a second folder with different variables, not a copy of the modules.
      </p>
      <p>
        Instances are configured by a <code>userdata.sh</code> script in the launch template. Nobody logs in to
        install the application; a new instance sets itself up at boot, which is what lets the Auto Scaling group
        replace one without help.
      </p>

      <H2 id="remote-state">Remote state with locking</H2>
      <p>
        Terraform state lives in an S3 bucket, with a DynamoDB table for locking. A small script creates both
        before the first <code>terraform init</code>, because the backend has to exist before Terraform can use
        it.
      </p>
      <CodeBlock lang="hcl" title="environments/dev/backend.tf" code={backend} />
      <p>
        The lock is what stops two applies running at once and corrupting the state. <code>encrypt = true</code>{" "}
        matters because state files contain whatever Terraform knows, and that includes database passwords.
      </p>

      <H2 id="scaling">Scaling on CPU</H2>
      <p>
        The Auto Scaling group runs between 2 and 6 instances, with 2 as the starting point so there is one in
        each zone. Two CloudWatch alarms drive it:
      </p>
      <ul>
        <li>CPU above 70% for 2 evaluation periods adds an instance, with a 120-second cooldown.</li>
        <li>CPU below 30% for 5 evaluation periods removes one, with a 300-second cooldown.</li>
      </ul>
      <p>
        The asymmetry is deliberate: scale out quickly, scale in slowly. Removing capacity too eagerly causes the
        group to flap when load comes back.
      </p>

      <H2 id="running-it">Running it</H2>
      <CodeBlock lang="bash" code={run} />
      <p>
        The Makefile wraps the Terraform commands so they always run from the right environment folder. When the
        apply finishes, Terraform prints the load balancer&rsquo;s DNS name, and the Flask application answers
        there with data read from RDS.
      </p>

      <H2 id="what-id-change">What I&rsquo;d change before production</H2>
      <ul>
        <li>
          <strong>Remove the SSH rule.</strong> The application group allows port 22 from one admin IP. AWS Systems
          Manager Session Manager gives shell access with no open port and no key pair to manage.
        </li>
        <li>
          <strong>Terminate HTTPS at the load balancer.</strong> The ALB group already allows 443; it needs a
          certificate from ACM, an HTTPS listener, and a redirect from port 80.
        </li>
        <li>
          <strong>Keep the database password out of Terraform variables.</strong> Let RDS manage it in Secrets
          Manager and have the application read it at start-up.
        </li>
        <li>
          <strong>Tighten egress.</strong> Every group allows all outbound traffic. The database has no reason to
          open connections to the internet.
        </li>
        <li>
          <strong>Run <code>plan</code> in CI.</strong> A pull request should show what will change before anyone
          applies it. I wrote about the credentials side of that in{" "}
          <A href="/blog/github-actions-aws-oidc-terraform">GitHub Actions to AWS with OIDC</A>.
        </li>
      </ul>
    </Prose>
  );
}
