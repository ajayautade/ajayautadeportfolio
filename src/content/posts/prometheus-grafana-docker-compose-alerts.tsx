// DRAFT: written from the public repo; review before publishing.
import type { PostMeta } from "@/lib/posts";
import CodeBlock from "@/components/site/CodeBlock";
import { A, Callout, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "prometheus-grafana-docker-compose-alerts",
  title: "Prometheus and Grafana with Docker Compose, and the alerts that could never fire",
  description:
    "A five-container monitoring stack for an nginx app: Prometheus, Grafana, Alertmanager and two exporters. Plus how to check that an alert rule can actually fire.",
  date: "2026-11-15",
  tags: ["Prometheus", "Grafana", "Monitoring", "Docker"],
  readingMinutes: 8,
  service: "monitoring-observability",
  project: "moviesmonkey",
  cta: "Want alerts you can trust to fire? I can set up Prometheus, Grafana and alert rules for what you run.",
};

export const headings: Heading[] = [
  { id: "the-stack", title: "The stack" },
  { id: "scrape-config", title: "Telling Prometheus what to scrape" },
  { id: "the-alerts", title: "Four alert rules" },
  { id: "the-problem", title: "Two of them could never fire" },
  { id: "stub-status", title: "The exporter also needs nginx to cooperate" },
  { id: "check-your-rules", title: "How to check a rule" },
  { id: "alertmanager", title: "An alert nobody receives" },
  { id: "what-id-change", title: "What I'd change" },
];

const compose = `
services:
  prometheus:
    image: prom/prometheus:v2.48.0
    ports: ["9090:9090"]
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - ./monitoring/alert_rules.yml:/etc/prometheus/alert_rules.yml:ro
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=15d'

  grafana:
    image: grafana/grafana:10.2.0
    ports: ["3001:3000"]
    volumes:
      - grafana_data:/var/lib/grafana

  nginx-exporter:
    image: nginx/nginx-prometheus-exporter:0.11.0
    command:
      - '-nginx.scrape-uri=http://moviemonkey-app:80/stub_status'

  node-exporter:
    image: prom/node-exporter:v1.7.0
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro

  alertmanager:
    image: prom/alertmanager:v0.26.0
    ports: ["9093:9093"]
`;

const scrape = `
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]

  - job_name: "moviemonkey-nginx"
    static_configs:
      - targets: ["nginx-exporter:9113"]

  - job_name: "node-exporter"
    static_configs:
      - targets: ["node-exporter:9100"]

alerting:
  alertmanagers:
    - static_configs:
        - targets: ["alertmanager:9093"]
`;

const rules = `
- alert: HighErrorRate
  expr: rate(nginx_http_requests_total{status=~"5.."}[5m]) / rate(nginx_http_requests_total[5m]) > 0.05
  for: 5m

- alert: HighResponseTime
  expr: histogram_quantile(0.95, rate(nginx_http_request_duration_seconds_bucket[5m])) > 2
  for: 5m

- alert: ContainerDown
  expr: up{job="moviemonkey-nginx"} == 0
  for: 1m

- alert: HighMemoryUsage
  expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes > 0.9
  for: 5m
`;

const stub = `
$ curl http://moviemonkey-app/stub_status
Active connections: 2
server accepts handled requests
 1024 1024 3187
Reading: 0 Writing: 1 Waiting: 1
`;

const stubLocation = `
location = /stub_status {
  stub_status;
  allow 172.16.0.0/12;   # Docker networks; narrow this to your own
  deny all;
}
`;

const check = `
# 1. Does the metric exist at all? Ask the exporter directly.
curl -s http://localhost:9113/metrics | grep nginx_http_requests_total

# 2. Does it have the label the rule filters on?
#    In the Prometheus UI, run the selector on its own:
#    nginx_http_requests_total{status=~"5.."}
#    "Empty query result" means the alert can never fire.

# 3. Validate the rule file's syntax
docker run --rm --entrypoint promtool \\
  -v "$PWD/monitoring:/rules:ro" prom/prometheus:v2.48.0 \\
  check rules /rules/alert_rules.yml
`;

export default function Article() {
  return (
    <Prose>
      <p>
        <A href="/projects/moviesmonkey">MoviesMonkey</A> is a web application served by nginx, and its{" "}
        <A href="https://github.com/ajayautade/MoviesMonkey">repository</A> includes a monitoring stack you can
        start with one command. Writing this article, I went back through the alert rules and found that two of
        the four could never fire. The stack is worth walking through, and so is the mistake, because it is an
        easy one to make and nothing warns you about it.
      </p>

      <H2 id="the-stack">The stack</H2>
      <p>Five containers on one Docker network, in a separate Compose file from the application:</p>
      <CodeBlock lang="yaml" title="docker-compose.monitoring.yml (trimmed)" code={compose} />
      <ul>
        <li>
          <strong>Prometheus</strong> collects and stores the metrics, and evaluates alert rules. Retention is set
          to 15 days.
        </li>
        <li>
          <strong>nginx exporter</strong> reads nginx&rsquo;s <code>stub_status</code> page and republishes it in
          Prometheus format.
        </li>
        <li>
          <strong>Node exporter</strong> reports CPU, memory, disk and network for the host. It needs{" "}
          <code>/proc</code> and <code>/sys</code> mounted read-only to see them.
        </li>
        <li>
          <strong>Alertmanager</strong> receives firing alerts from Prometheus and routes them.
        </li>
        <li>
          <strong>Grafana</strong> draws the dashboards.
        </li>
      </ul>
      <p>
        Every image is pinned to a version. Monitoring is the last thing you want changing underneath you during
        an incident.
      </p>

      <H2 id="scrape-config">Telling Prometheus what to scrape</H2>
      <CodeBlock lang="yaml" title="monitoring/prometheus.yml" code={scrape} />
      <p>
        Targets are container names, resolved by Docker&rsquo;s network DNS. Prometheus pulls from each one every
        15 seconds. Nothing pushes; if a target is down, Prometheus knows because the scrape fails, and records{" "}
        <code>up = 0</code> for it.
      </p>

      <H2 id="the-alerts">Four alert rules</H2>
      <CodeBlock lang="yaml" title="monitoring/alert_rules.yml (trimmed)" code={rules} />
      <p>
        On paper this is a sensible set: error rate, latency, availability and memory. Each has a <code>for</code>{" "}
        clause, so a brief spike does not page anyone.
      </p>

      <H2 id="the-problem">Two of them could never fire</H2>
      <p>
        The nginx exporter gets its data from nginx&rsquo;s <code>stub_status</code> page, and this is everything such a page contains:
      </p>
      <CodeBlock lang="text" code={stub} />
      <p>
        Connection counts and one total request counter. No status codes, no timings. So the exporter publishes{" "}
        <code>nginx_http_requests_total</code> with no <code>status</code> label, and no request-duration histogram
        at all.
      </p>
      <ul>
        <li>
          <strong>HighErrorRate</strong> filters on <code>status=~&quot;5..&quot;</code>. That label does not
          exist, so the selector matches nothing.
        </li>
        <li>
          <strong>HighResponseTime</strong> queries <code>nginx_http_request_duration_seconds_bucket</code>. That
          metric does not exist.
        </li>
      </ul>
      <p>
        Prometheus does not treat this as an error. An expression that returns no series is simply &ldquo;not
        firing&rdquo;. The rules load, the Alerts page shows them green, and they stay green through any number
        of 500s.
      </p>
      <Callout title="The lesson">
        <p>
          A green alert means either &ldquo;everything is fine&rdquo; or &ldquo;this rule is looking at
          nothing&rdquo;. The dashboard cannot tell you which.
        </p>
      </Callout>
      <p>
        <code>HighMemoryUsage</code> is fine: the <code>node_memory_*</code> metrics come from the node exporter.{" "}
        <code>ContainerDown</code> works, but not quite as named. <code>up</code> is generated by Prometheus for
        every scrape target, and the target here is the exporter. The rule fires when the exporter is unreachable.
        If nginx itself stops while the exporter keeps running, <code>up</code> stays at 1. The metric that
        reports nginx is <code>nginx_up</code>, so the rule should be <code>nginx_up == 0</code>.
      </p>

      <H2 id="stub-status">The exporter also needs nginx to cooperate</H2>
      <p>
        One more thing turned up while checking. The exporter is pointed at <code>/stub_status</code>, but the
        application&rsquo;s <code>nginx.conf</code> has a single <code>location /</code> block that falls back to{" "}
        <code>index.html</code>. There is no status endpoint, so the exporter is handed the home page, cannot
        parse it, and reports <code>nginx_up 0</code>. The fix is four lines:
      </p>
      <CodeBlock lang="nginx" title="nginx.conf" code={stubLocation} />
      <p>
        Restrict it, as above, so the status page is not public. The exporter also has to be on a Docker network
        that can reach the application container.
      </p>

      <H2 id="check-your-rules">How to check a rule</H2>
      <CodeBlock lang="bash" code={check} />
      <p>
        <code>promtool check rules</code> catches syntax errors but not this problem, because the expression is
        valid. The real test is the second step: run each selector by hand and confirm it returns data. Better
        still, make the alert fire once on purpose. Stop the exporter container and watch{" "}
        <code>ContainerDown</code> go from pending to firing after a minute. Then stop nginx instead, and see
        whether anything fires at all.
      </p>

      <H2 id="alertmanager">An alert nobody receives</H2>
      <p>
        There is a second gap. The Alertmanager container starts with its default configuration, and no
        configuration file is mounted. Alerts arrive and appear in its UI, but there is no Slack, email or pager
        receiver, so nobody is told. Until a receiver is configured, the alerting half of the stack is a
        dashboard you have to remember to open.
      </p>

      <H2 id="what-id-change">What I&rsquo;d change</H2>
      <ul>
        <li>
          <strong>Add the <code>stub_status</code> location and alert on <code>nginx_up</code>.</strong> That makes
          the availability alert mean what its name says.
        </li>
        <li>
          <strong>Get status codes and timings from nginx.</strong> Either add a log-based exporter that parses
          the access log, or expose metrics from the application itself. Then the error-rate and latency rules
          have something to read.
        </li>
        <li>
          <strong>Mount an Alertmanager config</strong> with at least one receiver, and send a test alert through
          it.
        </li>
        <li>
          <strong>Take the Grafana admin password out of the Compose file</strong> and pass it from an environment
          file that is not committed.
        </li>
        <li>
          <strong>Do not publish the exporter ports.</strong> Prometheus reaches the exporters over the Docker
          network. Mapping 9100 and 9113 to the host exposes system details for no benefit.
        </li>
        <li>
          <strong>Provision the Grafana data source and dashboard from files</strong>, so a fresh container comes
          up with the dashboard already wired to Prometheus.
        </li>
      </ul>
      <p>
        On Kubernetes, the same project uses the kube-prometheus-stack chart, which ships with dashboards and
        rules that match the metrics it collects. The check still applies to any rule you add yourself.
      </p>
    </Prose>
  );
}
