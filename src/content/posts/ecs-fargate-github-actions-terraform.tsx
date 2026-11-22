// DRAFT: written from the public repo; review before publishing.
import type { PostMeta } from "@/lib/posts";
import CodeBlock from "@/components/site/CodeBlock";
import { A, Callout, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "ecs-fargate-github-actions-terraform",
  title: "Deploying to ECS Fargate from GitHub Actions, and keeping Terraform out of the way",
  description:
    "A FastAPI service on ECS Fargate behind an ALB: Terraform builds the platform, GitHub Actions ships each commit. How the pieces fit, and the three settings that cause drift, downtime and stuck deploys.",
  date: "2026-11-22",
  tags: ["AWS", "ECS", "Terraform", "GitHub Actions", "CI/CD"],
  readingMinutes: 7,
  service: "ci-cd-automation",
  project: "end-to-end-cicd-pipeline",
  cta: "Deploys that need someone at a laptop? I can set up a pipeline that ships every commit to ECS or Kubernetes, with rollbacks.",
};

export const headings: Heading[] = [
  { id: "the-split", title: "Who owns what" },
  { id: "network", title: "The network: public subnets, no NAT gateway" },
  { id: "alb", title: "The load balancer and the security groups" },
  { id: "the-pipeline", title: "The pipeline: test in kind, then ship to AWS" },
  { id: "deploy-step", title: "The deploy step" },
  { id: "drift", title: "Problem 1: Terraform undoes the deploy" },
  { id: "downtime", title: "Problem 2: a deploy can take the service down" },
  { id: "stuck", title: "Problem 3: a bad image never gives up" },
  { id: "what-id-do-next", title: "What I'd do next" },
];

const subnets = `
resource "aws_subnet" "public" {
  count                   = var.public_subnet_count     # 2
  vpc_id                  = aws_vpc.this.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
}

resource "aws_ecs_service" "this" {
  # ...
  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.task.id]
    assign_public_ip = true      # so tasks can pull from ECR without a NAT gateway
  }
}
`;

const sg = `
resource "aws_security_group" "task" {
  name   = "\${local.app_name}-task"
  vpc_id = aws_vpc.this.id

  ingress {
    description     = "App traffic from ALB"
    from_port       = var.container_port            # 8000
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]   # only the load balancer, not 0.0.0.0/0
  }
  # ...
}

resource "aws_lb_target_group" "this" {
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = aws_vpc.this.id
  target_type = "ip"            # Fargate tasks register by IP, not instance ID

  health_check {
    path                = "/health"
    matcher             = "200"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    interval            = 10
  }
}
`;

const smoke = `
- name: Deploy to kind via Helm
  run: |
    helm upgrade --install myapp ./helm/myapp \\
      --set image.repository=myapp --set image.tag=local \\
      --wait --timeout 2m

- name: Smoke test (in-cluster)
  run: |
    kubectl run curl --rm -i --restart=Never \\
      --image=curlimages/curl:8.6.0 \\
      --command -- curl -sf --retry 20 --retry-delay 2 --retry-all-errors http://myapp:8000/health
`;

const deploy = `
- name: Deploy to ECS (Fargate)
  if: github.ref == 'refs/heads/main' && vars.AWS_ROLE_ARN != ''
  run: |
    set -euo pipefail
    IMAGE_URI="$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG"     # the commit SHA

    # Write a full task definition with the new image ...
    cat > task-def.json <<EOF
    { "family": "myapp", "cpu": "256", "memory": "512",
      "containerDefinitions": [ { "name": "myapp", "image": "\${IMAGE_URI}", ... } ] }
    EOF

    # ... register it as a new revision, point the service at it, and wait
    TASK_DEF_ARN=$(aws ecs register-task-definition --cli-input-json file://task-def.json \\
      --query 'taskDefinition.taskDefinitionArn' --output text)
    aws ecs update-service --cluster myapp --service myapp \\
      --task-definition "$TASK_DEF_ARN" --force-new-deployment
    aws ecs wait services-stable --cluster myapp --services myapp
`;

const ignoreChanges = `
resource "aws_ecs_service" "this" {
  name            = local.app_name
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.this.arn   # only used on first create
  desired_count   = var.desired_count
  # ...

  lifecycle {
    # CI owns the running revision; Terraform owns everything else
    ignore_changes = [task_definition]
  }
}
`;

const renderAction = `
# Start from the revision that is running, change only the image
- name: Download current task definition
  run: |
    aws ecs describe-task-definition --task-definition myapp \\
      --query taskDefinition > task-def.json

- name: Set the new image
  id: render
  uses: aws-actions/amazon-ecs-render-task-definition@v1
  with:
    task-definition: task-def.json
    container-name: myapp
    image: \${{ steps.ecr.outputs.registry }}/\${{ vars.ECR_REPOSITORY }}:\${{ github.sha }}

- name: Deploy
  uses: aws-actions/amazon-ecs-deploy-task-definition@v2
  with:
    task-definition: \${{ steps.render.outputs.task-definition }}
    cluster: myapp
    service: myapp
    wait-for-service-stability: true
`;

const healthy = `
resource "aws_ecs_service" "this" {
  # ...
  deployment_minimum_healthy_percent = 100   # keep the old task until the new one is healthy
  deployment_maximum_percent         = 200   # room to run both for a moment

  deployment_circuit_breaker {
    enable   = true
    rollback = true     # go back to the last working revision automatically
  }
}
`;

export default function Post() {
  return (
    <Prose>
      <p>
        The <A href="/projects/end-to-end-cicd-pipeline">End-to-End CI/CD Pipeline</A> project takes a small
        FastAPI service from a commit to a public URL on AWS. Terraform builds the platform once: a VPC, an
        Application Load Balancer, an ECS cluster on Fargate and an ECR repository. GitHub Actions then ships every
        push to <code>main</code> with no one at a laptop.
      </p>
      <p>
        The interesting part is the line between those two tools. Both describe the same ECS service, and unless
        you decide which of them owns what, they quietly undo each other. Everything below comes from the{" "}
        <A href="https://github.com/ajayautade/End-To-End-CICD-Pipeline">public repository</A>.
      </p>

      <H2 id="the-split">Who owns what</H2>
      <ul>
        <li>
          <strong>Terraform</strong> creates things that change rarely: the network, the load balancer, security
          groups, the ECS cluster and service, IAM roles, the log group, the ECR repository and the GitHub OIDC role.
        </li>
        <li>
          <strong>GitHub Actions</strong> changes one thing on every commit: which image the service runs. It builds
          the image, pushes it to ECR tagged with the commit SHA, registers a new task definition revision that uses
          it, and points the service at that revision.
        </li>
      </ul>
      <p>
        CI authenticates to AWS with OIDC, so there are no access keys in the repository. That part has{" "}
        <A href="/blog/github-actions-aws-oidc-terraform">its own article</A>. One detail worth repeating: the
        role&rsquo;s <code>iam:PassRole</code> permission is limited to the two ECS roles it needs to hand to a task,
        not every role in the account.
      </p>

      <H2 id="network">The network: public subnets, no NAT gateway</H2>
      <p>
        The VPC has two public subnets in different availability zones and no private ones. The Fargate tasks run
        in the public subnets with a public IP:
      </p>
      <CodeBlock lang="hcl" title="network.tf / ecs.tf" code={subnets} />
      <p>
        Usually tasks belong in private subnets. A task still needs a way out, though, to pull its image from ECR
        and to send logs to CloudWatch. In a private subnet that means a NAT gateway, which is billed for every hour
        it exists: $0.045 an hour in N. Virginia, about $32.85 a month before any data, as priced in my{" "}
        <A href="/blog/eks-cluster-cost-per-month">EKS cost article</A>. For a demo that costs more than the task.
      </p>
      <p>
        A public IP on the task avoids that, and it is safe here because the security group is what decides who can
        connect, not the subnet. Note that each public IPv4 address is also billed hourly, so this is cheaper than a
        NAT gateway, not free. For a production service I would use private subnets with VPC endpoints for ECR, S3
        and CloudWatch Logs, which removes the NAT gateway for those calls without exposing the tasks.
      </p>

      <H2 id="alb">The load balancer and the security groups</H2>
      <CodeBlock lang="hcl" title="alb.tf" code={sg} />
      <p>Three settings do the real work:</p>
      <ul>
        <li>
          <strong>The task only accepts traffic from the ALB&rsquo;s security group.</strong> Even with a public IP,
          nobody can reach port 8000 directly. Referencing a security group instead of a CIDR range keeps this true
          when the load balancer&rsquo;s addresses change.
        </li>
        <li>
          <strong><code>target_type = &quot;ip&quot;</code>.</strong> Fargate tasks have their own network interface
          (<code>awsvpc</code> mode), so they register in the target group by IP. The default,{" "}
          <code>instance</code>, does not work with Fargate.
        </li>
        <li>
          <strong>A real health check path.</strong> <code>/health</code> returns 200 from the app itself, checked
          every 10 seconds; two failures mark a task unhealthy. ECS uses the same result to decide whether a new
          deployment worked.
        </li>
      </ul>
      <p>
        The listener is HTTP on port 80 only. Adding HTTPS needs a domain and an ACM certificate, and a second
        listener that redirects 80 to 443.
      </p>

      <H2 id="the-pipeline">The pipeline: test in kind, then ship to AWS</H2>
      <p>
        One job in <code>ci.yml</code> runs on every pull request and push: unit tests, <code>helm lint</code>,{" "}
        <code>terraform fmt -check</code> and <code>terraform validate</code>. Then, before anything goes near AWS,
        it deploys the image into a throwaway kind cluster on the runner and calls it:
      </p>
      <CodeBlock lang="yaml" title=".github/workflows/ci.yml" code={smoke} />
      <p>
        That smoke test catches the failures unit tests miss: a container that does not start, a wrong port, a
        missing dependency in the image. If it fails, the AWS steps never run. Only on <code>main</code>, and only if
        the AWS variables are set, does the job push to ECR and deploy.
      </p>

      <H2 id="deploy-step">The deploy step</H2>
      <CodeBlock lang="yaml" title=".github/workflows/ci.yml (shortened)" code={deploy} />
      <p>
        Each deploy creates a new, numbered task definition revision that names an exact image by its commit SHA.
        That gives a clean history: revision 14 is commit <code>1a2b3c4</code>, and rolling back means pointing the
        service at revision 13. <code>aws ecs wait services-stable</code> makes the job fail if the new tasks never
        become healthy, so a red pipeline means a broken deploy, not just a broken build.
      </p>

      <H2 id="drift">Problem 1: Terraform undoes the deploy</H2>
      <p>
        Terraform also defines the task definition, with the image <code>:latest</code>, and the service points at
        Terraform&rsquo;s revision. After a few deploys from CI, the service runs revision 14 while Terraform&rsquo;s
        state still says revision 1. The next <code>terraform apply</code>, for any reason at all, such as changing a
        tag on the load balancer, sees the difference and &ldquo;fixes&rdquo; it, moving the service back to revision
        1 and whatever <code>:latest</code> happens to be.
      </p>
      <p>
        The fix is to say in code who owns the running revision. Terraform creates the service with an initial task
        definition and then ignores that field:
      </p>
      <CodeBlock lang="hcl" title="ecs.tf" code={ignoreChanges} />
      <p>
        The same split shows up a second time. The task definition is written out twice, in Terraform and in a
        heredoc in the workflow, so CPU, memory, ports and log settings have to be kept in sync by hand. Better to
        have CI start from the revision that is running and change only the image. AWS publishes actions for
        exactly that:
      </p>
      <CodeBlock lang="yaml" title="Change only the image" code={renderAction} />
      <p>
        Now a change to CPU or memory goes through Terraform, which registers a revision, and every deploy after
        that inherits it.
      </p>

      <H2 id="downtime">Problem 2: a deploy can take the service down</H2>
      <p>
        The service runs one task (<code>desired_count = 1</code>) with{" "}
        <code>deployment_minimum_healthy_percent = 0</code>. Zero percent of one task means ECS is allowed to stop
        the running task before the new one is healthy. When it does, the load balancer has no healthy targets and
        returns 503 until the new task passes its health checks.
      </p>
      <p>
        Setting the minimum to 100 forces ECS to start the new task first, wait for it to pass, then stop the old one.
        The maximum of 200 already allows the two to run side by side for that moment.
      </p>

      <H2 id="stuck">Problem 3: a bad image never gives up</H2>
      <p>
        If the new image crashes on start, ECS keeps replacing the failed tasks with new ones from the same broken
        revision. The workflow&rsquo;s <code>services-stable</code> wait gives up after about ten minutes and fails
        the job, but the service is left trying to run the broken revision. With the minimum-healthy fix above the
        old task keeps serving, but someone still has to roll back by hand.
      </p>
      <p>The deployment circuit breaker does that automatically:</p>
      <CodeBlock lang="hcl" title="ecs.tf" code={healthy} />
      <Callout title="Together">
        <p>
          With both settings, a bad commit produces a failed pipeline and a service still running the previous
          version. Nobody has to be awake for it.
        </p>
      </Callout>

      <H2 id="what-id-do-next">What I&rsquo;d do next</H2>
      <ul>
        <li>
          Apply the three fixes above: <code>ignore_changes</code> on the task definition, a minimum healthy percent
          of 100 and the circuit breaker.
        </li>
        <li>
          Make the ECR repository&rsquo;s tags immutable and stop pushing <code>:latest</code>, so a tag always means
          one image.
        </li>
        <li>Add HTTPS with an ACM certificate, and run two tasks across both zones for anything real.</li>
        <li>
          Narrow the deploy role&rsquo;s ECS permissions from <code>*</code> to the cluster and service ARNs. The{" "}
          <A href="/tools/iam-policy-explainer">IAM policy explainer</A> flags this kind of wildcard, and the{" "}
          <A href="/tools/github-oidc-trust-policy">OIDC trust policy generator</A> writes the trust side.
        </li>
      </ul>
    </Prose>
  );
}
