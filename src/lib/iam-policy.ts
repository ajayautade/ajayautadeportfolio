/**
 * Reads an IAM identity policy, resource policy (such as an S3 bucket policy) or trust policy
 * and describes each statement in plain English. It explains what the JSON says; it does not
 * evaluate it against other policies, SCPs or permission boundaries.
 */

export interface ExplainedStatement {
  index: number;
  sid?: string;
  effect: "Allow" | "Deny";
  sentence: string;
  who?: string;
  actions: string;
  resources: string;
  conditions: string[];
  warnings: string[];
}

export interface Explanation {
  kind: "identity" | "resource" | "trust";
  statements: ExplainedStatement[];
  warnings: string[];
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const asList = (value: Json | undefined): string[] =>
  value === undefined || value === null ? [] : Array.isArray(value) ? value.map(String) : [String(value)];

const joinWords = (items: string[], word = "and"): string =>
  items.length <= 1 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} ${word} ${items[items.length - 1]}`;

/** A few well-known service prefixes, so "s3:GetObject" can read as "Amazon S3: GetObject". */
const SERVICES: Record<string, string> = {
  s3: "S3",
  ec2: "EC2",
  iam: "IAM",
  sts: "STS",
  ecr: "ECR",
  eks: "EKS",
  ecs: "ECS",
  lambda: "Lambda",
  dynamodb: "DynamoDB",
  rds: "RDS",
  kms: "KMS",
  logs: "CloudWatch Logs",
  cloudwatch: "CloudWatch",
  sqs: "SQS",
  sns: "SNS",
  secretsmanager: "Secrets Manager",
  ssm: "Systems Manager",
  cloudformation: "CloudFormation",
  route53: "Route 53",
  elasticloadbalancing: "Elastic Load Balancing",
  autoscaling: "Auto Scaling",
  cloudfront: "CloudFront",
};

export function describeAction(action: string): string {
  if (action === "*") return "every action in every service";
  const [prefix, name = ""] = action.split(":");
  const service = SERVICES[prefix.toLowerCase()] ?? prefix;
  if (name === "*") return `every ${service} action`;
  if (name.endsWith("*")) return `${service} actions starting with ${name.slice(0, -1)}`;
  return `${service} ${name}`;
}

export function describeResource(resource: string): string {
  if (resource === "*") return "every resource";
  const s3 = resource.match(/^arn:aws[\w-]*:s3:::([^/]+)(?:\/(.*))?$/);
  if (s3) {
    const [, bucket, key] = s3;
    if (key === undefined) return `the bucket ${bucket} itself`;
    if (key === "*") return `every object in ${bucket}`;
    if (key.endsWith("/*")) return `objects under ${key.slice(0, -1)} in ${bucket}`;
    return `the object ${key} in ${bucket}`;
  }
  return resource;
}

function describePrincipal(principal: Json | undefined, notPrincipal: boolean): string | undefined {
  if (principal === undefined) return undefined;
  if (principal === "*") return notPrincipal ? "nobody (NotPrincipal \"*\" excludes everyone)" : "anyone, including anonymous users,";
  if (typeof principal !== "object" || principal === null || Array.isArray(principal)) return String(principal);
  const parts: string[] = [];
  for (const [type, value] of Object.entries(principal)) {
    for (const id of asList(value)) {
      if (id === "*") parts.push(type === "AWS" ? "any AWS account or user" : `any ${type} principal`);
      else if (type === "AWS" && /^\d{12}$/.test(id)) parts.push(`account ${id}`);
      else if (type === "AWS") {
        const root = id.match(/^arn:aws[\w-]*:iam::(\d{12}):root$/);
        parts.push(root ? `account ${root[1]}` : id);
      } else if (type === "Service") parts.push(`the ${id} service`);
      else if (type === "Federated") parts.push(id.includes("oidc-provider/") ? `users of the identity provider ${id.split("oidc-provider/")[1]}` : id);
      else parts.push(`${type} ${id}`);
    }
  }
  const list = joinWords(parts);
  return notPrincipal ? `everyone except ${list}` : list;
}

/** Known condition keys get a short reading; everything else is shown as key, operator and value. */
function describeCondition(operator: string, key: string, values: string[]): string {
  const v = joinWords(values.map((x) => `"${x}"`), "or");
  const k = key.toLowerCase();
  if (k === "aws:securetransport") return values[0] === "false" ? "the request does not use HTTPS" : "the request uses HTTPS";
  if (k === "aws:sourceip") return operator.startsWith("Not") ? `the caller's IP is not in ${v}` : `the caller's IP is in ${v}`;
  if (k === "aws:multifactorauthpresent") return values[0] === "true" ? "the caller signed in with MFA" : "the caller did not sign in with MFA";
  if (k === "aws:principalorgid") return `the caller belongs to the organisation ${v}`;
  if (k === "aws:sourcevpce") return operator.startsWith("Not") ? `the request does not come through VPC endpoint ${v}` : `the request comes through VPC endpoint ${v}`;
  if (k === "aws:sourcevpc") return operator.startsWith("Not") ? `the request does not come from VPC ${v}` : `the request comes from VPC ${v}`;
  if (k === "aws:sourcearn") return `the calling resource is ${v}`;
  if (k === "aws:sourceaccount") return `the calling resource belongs to account ${v}`;
  if (k.endsWith(":sub") && k.includes("token.actions")) return `the GitHub token subject matches ${v}`;
  if (k.endsWith(":aud")) return `the token audience is ${v}`;
  if (k === "s3:x-amz-server-side-encryption") return `the upload asks for ${v} encryption`;
  if (k === "s3:x-amz-acl") return `the upload sets the ACL ${v}`;
  return `${key} ${operator} ${v}`;
}

function conditionsOf(condition: Json | undefined): string[] {
  if (!condition || typeof condition !== "object" || Array.isArray(condition)) return [];
  const out: string[] = [];
  for (const [operator, block] of Object.entries(condition)) {
    if (!block || typeof block !== "object" || Array.isArray(block)) continue;
    for (const [key, value] of Object.entries(block)) out.push(describeCondition(operator, key, asList(value)));
  }
  return out;
}

export function explainPolicy(text: string): { error: string } | Explanation {
  if (text.trim() === "") return { error: "Paste a policy document." };
  let doc: Json;
  try {
    doc = JSON.parse(text);
  } catch (err) {
    return { error: `This is not valid JSON: ${(err as Error).message}` };
  }
  if (!doc || typeof doc !== "object" || Array.isArray(doc)) return { error: "A policy is a JSON object with a Statement." };

  // Accept a whole policy, or a bare statement / array of statements.
  const raw = "Statement" in doc ? doc.Statement : "Effect" in doc ? doc : undefined;
  if (raw === undefined) return { error: "No Statement found. A policy looks like { \"Version\": \"2012-10-17\", \"Statement\": [...] }." };
  const list = (Array.isArray(raw) ? raw : [raw]) as Json[];
  if (list.length === 0) return { error: "The Statement list is empty." };

  const warnings: string[] = [];
  if ("Version" in doc && doc.Version !== "2012-10-17")
    warnings.push(`Version is "${String(doc.Version)}". Use "2012-10-17"; older versions do not support policy variables.`);
  if ("Statement" in doc && !("Version" in doc))
    warnings.push('No Version. Without "Version": "2012-10-17", policy variables such as ${aws:username} are treated as plain text.');

  const statements: ExplainedStatement[] = [];
  let hasPrincipal = false;
  let isTrust = false;

  for (const [i, item] of list.entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return { error: `Statement ${i + 1} is not an object.` };
    const s = item as Record<string, Json>;
    const effect = s.Effect;
    if (effect !== "Allow" && effect !== "Deny") return { error: `Statement ${i + 1}: Effect must be "Allow" or "Deny".` };

    const notAction = "NotAction" in s;
    const notResource = "NotResource" in s;
    const notPrincipal = "NotPrincipal" in s;
    const actions = asList(notAction ? s.NotAction : s.Action);
    const resources = asList(notResource ? s.NotResource : s.Resource);
    if (actions.length === 0) return { error: `Statement ${i + 1} has no Action or NotAction.` };

    const principalJson = notPrincipal ? s.NotPrincipal : s.Principal;
    if (principalJson !== undefined) hasPrincipal = true;
    if (actions.some((a) => a.toLowerCase().startsWith("sts:assumerole"))) isTrust = true;
    const who = describePrincipal(principalJson, notPrincipal);

    const actionText = notAction
      ? `every action except ${joinWords(actions.map(describeAction))}`
      : joinWords(actions.map(describeAction));
    const resourceText =
      resources.length === 0
        ? isTrust
          ? "this role"
          : "the resource this policy is attached to"
        : notResource
          ? `every resource except ${joinWords(resources.map(describeResource))}`
          : joinWords(resources.map(describeResource));
    const conditions = conditionsOf(s.Condition);

    let sentence = who
      ? effect === "Allow"
        ? `Lets ${who} use ${actionText} on ${resourceText}`
        : `Stops ${who} from using ${actionText} on ${resourceText}`
      : `${effect === "Allow" ? "Allows" : "Denies"} ${actionText} on ${resourceText}`;
    if (conditions.length > 0) sentence += `, only when ${joinWords(conditions)}`;
    sentence += ".";

    const own: string[] = [];
    const publicPrincipal = principalJson === "*" || asList((principalJson as Record<string, Json> | undefined)?.AWS).includes("*");
    if (effect === "Allow" && publicPrincipal && conditions.length === 0 && !notPrincipal)
      own.push("Anyone on the internet can do this. If that is not intended, name the principal or add a condition.");
    if (effect === "Allow" && actions.includes("*") && !notAction)
      own.push('Action "*" grants every permission in AWS, including IAM changes. That is administrator access.');
    else if (effect === "Allow" && !notAction && actions.some((a) => /^[\w-]+:\*$/.test(a)))
      own.push("A service-wide wildcard such as s3:* includes delete and permission-changing actions. List the actions the job needs.");
    if (effect === "Allow" && resources.includes("*") && !actions.includes("*") && !notResource)
      own.push('Resource "*" applies to every matching resource in the account. Narrow it to ARNs where the service supports it.');
    if (effect === "Allow" && (notAction || notResource))
      own.push("Allow with NotAction or NotResource grants everything not listed, including services added later.");
    if (effect === "Allow" && notPrincipal) own.push("Allow with NotPrincipal is almost never what you want; AWS recommends against it.");
    if (actions.some((a) => a.toLowerCase().startsWith("iam:passrole")) && resources.includes("*"))
      own.push("iam:PassRole on every role lets the caller hand any role to a service, which can escalate privileges.");
    const s3Object = actions.some((a) => /^s3:(Get|Put|Delete)Object/i.test(a));
    const s3BucketOnly = resources.some((r) => /^arn:aws[\w-]*:s3:::[^/]+$/.test(r));
    const s3HasObjects = resources.some((r) => /^arn:aws[\w-]*:s3:::[^/]+\/.+$/.test(r));
    if (s3Object && s3BucketOnly && !s3HasObjects)
      own.push("Object actions such as s3:GetObject apply to object ARNs (bucket/*), not the bucket ARN. As written, this matches nothing.");
    if (actions.some((a) => /^s3:ListBucket$/i.test(a)) && s3HasObjects && !s3BucketOnly)
      own.push("s3:ListBucket applies to the bucket ARN (no /*). As written, listing will be denied.");
    if (isTrust && actions.some((a) => a === "sts:AssumeRoleWithWebIdentity") && !conditions.some((c) => c.includes("subject")))
      own.push("A web identity trust with no sub condition lets every repository or user of that provider assume the role.");

    statements.push({
      index: i + 1,
      sid: typeof s.Sid === "string" ? s.Sid : undefined,
      effect,
      sentence,
      who,
      actions: actionText,
      resources: resourceText,
      conditions,
      warnings: own,
    });
  }

  const kind: Explanation["kind"] = isTrust ? "trust" : hasPrincipal ? "resource" : "identity";
  if (statements.some((s) => s.effect === "Deny"))
    warnings.push("An explicit Deny always wins over any Allow, in this policy or any other that applies.");
  return { kind, statements, warnings };
}

