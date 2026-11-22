// DRAFT: written from the public repo; review before publishing.
import type { PostMeta } from "@/lib/posts";
import CodeBlock from "@/components/site/CodeBlock";
import { A, Callout, H2, Prose, type Heading } from "@/components/blog/Prose";

export const meta: PostMeta = {
  slug: "predictive-autoscaling-kubernetes-control-loop",
  title: "Predictive autoscaling on Kubernetes: the control loop behind the forecast",
  description:
    "A forecast is only half of a predictive autoscaler. This is the other half from K8s PredictScale: turning a prediction into replicas, the guard rails around it, the RBAC it needs, and two bugs I'd fix.",
  date: "2026-11-22",
  tags: ["Kubernetes", "Autoscaling", "Python", "MLOps"],
  readingMinutes: 7,
  service: "docker-kubernetes",
  project: "k8s-predictscale",
  cta: "Pods that scale too late, or replicas set high just in case? I can tune requests, probes and autoscaling for your workloads.",
};

export const headings: Heading[] = [
  { id: "why-not-just-hpa", title: "Why not just the HPA" },
  { id: "the-loop", title: "The loop: collect, predict, decide, scale" },
  { id: "prediction-to-replicas", title: "From a prediction to a replica count" },
  { id: "safety-guard", title: "The safety guard" },
  { id: "dry-run-and-rbac", title: "Dry run and the permissions it needs" },
  { id: "two-bugs", title: "Two bugs I'd fix" },
  { id: "living-with-hpa", title: "Living alongside the HPA" },
  { id: "what-id-do-next", title: "What I'd do next" },
];

const loop = `
# src/controller/controller_service.py (shortened)
def tick(self):
    snapshot = self._collector.collect_once()                 # 1. PromQL -> metrics buffer
    recent = self._collector.get_latest_metrics(n=self._config.prediction.lookback_steps)
    prediction = self._predictor.predict(recent)              # 2. LSTM + Prophet ensemble

    current = self._scaler.get_current_replicas()
    peak = float(np.max(prediction.predicted_values))
    decision = self._decision_engine.decide(                  # 3. how many pods?
        predicted_peak=peak,
        confidence=prediction.confidence,
        current_replicas=current,
    )
    decision = self._safety.check(decision)                   # 4. cooldown + step limits
    if decision.approved and decision.target_replicas != current:
        if self._scaler.scale(decision.target_replicas):      # 5. patch deployments/scale
            self._safety.record_event(decision)
`;

const decide = `
# src/controller/decision_engine.py (shortened)
if confidence < self._confidence_thr:            # default 0.7
    return no_change("confidence below threshold")

raw_target = math.ceil(predicted_peak / self._target_util)   # target_util = 0.7
clamped = max(self._min, min(self._max, raw_target))         # 2 .. 50 by default

if abs(clamped - current_replicas) <= self._dead_band:       # dead band = 1
    return no_change("within dead band")

return ScalingDecision(target_replicas=clamped, ...)
`;

const guard = `
# src/controller/safety_guard.py (shortened)
if time.time() - self._last_scale_time < self._cooldown:   # 120 s
    decision.approved = False                               # too soon after the last change
    return decision

diff = decision.target_replicas - decision.current_replicas
if diff > self._max_up:                                     # at most +5 pods per step
    decision.target_replicas = decision.current_replicas + self._max_up
elif -diff > self._max_down:                                # at most -2 pods per step
    decision.target_replicas = decision.current_replicas - self._max_down
`;

const rbac = `
# config/helm/predictscale/templates/rbac.yaml
kind: ClusterRole
rules:
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments/scale"]
    verbs: ["get", "update", "patch"]
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
`;

const role = `
# Scoped to the one namespace and the one deployment it manages
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: predictscale-scaler
  namespace: shop                     # the target namespace
rules:
  - apiGroups: ["apps"]
    resources: ["deployments", "deployments/scale"]
    resourceNames: ["sample-app"]     # the target deployment
    verbs: ["get", "patch", "update"]
`;

const readyBug = `
# src/controller/k8s_scaler.py
ready = deploy.status.ready_replicas or 0   # what is running and ready now
return int(ready)
`;

const readyFix = `
# Compare against what Kubernetes has been asked for, not what is ready
desired = deploy.spec.replicas or 0
ready = deploy.status.ready_replicas or 0
if ready < desired:
    return None   # a rollout or scale-up is in progress: skip this tick
return desired
`;

const hpaPatch = `
# Raise the HPA's floor instead of fighting it over spec.replicas
autoscaling = client.AutoscalingV2Api()
autoscaling.patch_namespaced_horizontal_pod_autoscaler(
    name="sample-app",
    namespace="shop",
    body={"spec": {"minReplicas": target_replicas}},
)
`;

export default function Post() {
  return (
    <Prose>
      <p>
        Most write-ups about predictive autoscaling are about the model: LSTMs, Prophet, seasonality. The model is
        the interesting part to build, but it is not the part that touches production. Something has to take a
        forecast, decide how many pods that means, and change a live deployment without making things worse. In{" "}
        <A href="/projects/k8s-predictscale">K8s PredictScale</A> that is the controller, and this article is about
        it.
      </p>
      <p>
        Everything below is from the{" "}
        <A href="https://github.com/ajayautade/k8s-predictscale">public repository</A>, with code shortened for
        reading. The project is a work in progress and the controller ships in dry-run mode, so this is about the
        design, not about results.
      </p>

      <H2 id="why-not-just-hpa">Why not just the HPA</H2>
      <p>
        The Horizontal Pod Autoscaler is reactive. It compares current CPU (or another metric) with a target and
        adds pods once the target is exceeded. Those pods then have to be scheduled, pull an image, start and pass
        their readiness probe before they take traffic. For a service whose load ramps up at the same time every
        morning, that delay happens every morning.
      </p>
      <p>
        A predictive autoscaler tries to add the pods before the load arrives, using the shape of past traffic. The
        HPA stays in place as the safety net for anything the forecast did not see coming.
      </p>

      <H2 id="the-loop">The loop: collect, predict, decide, scale</H2>
      <p>
        The controller runs one cycle every 60 seconds by default (<code>PREDICTION_INTERVAL</code>). Each cycle is
        five steps:
      </p>
      <CodeBlock lang="python" title="controller_service.py" code={loop} />
      <p>
        The useful property of this shape is that each step can fail on its own without the next one running. If
        Prometheus is unreachable, collection fails and the tick returns early; nothing gets scaled on stale data.
        If the buffer is empty, prediction is skipped. Scaling is the last step and only runs on an approved
        decision.
      </p>

      <H2 id="prediction-to-replicas">From a prediction to a replica count</H2>
      <p>
        The decision engine is short, and it is where most of the judgement lives:
      </p>
      <CodeBlock lang="python" title="decision_engine.py" code={decide} />
      <p>Four rules, in order:</p>
      <ul>
        <li>
          <strong>Ignore unsure forecasts.</strong> The ensemble returns a confidence between 0 and 1. Below 0.7 the
          controller does nothing and leaves the HPA in charge. A wrong prediction acted on confidently is worse
          than no prediction.
        </li>
        <li>
          <strong>Size for headroom.</strong> The target is the predicted peak divided by 0.7, so pods run at about
          70% at the peak instead of 100%.
        </li>
        <li>
          <strong>Clamp to bounds.</strong> Never fewer than 2 replicas, never more than 50, whatever the model says.
        </li>
        <li>
          <strong>Use a dead band.</strong> A difference of one replica is not worth acting on. Without this, small
          wobbles in the forecast turn into a deployment that changes size every minute.
        </li>
      </ul>
      <Callout title="Check the units">
        <p>
          <code>ceil(predicted_peak / 0.7)</code> only gives a pod count if the forecast is measured in &ldquo;pods
          worth&rdquo; of load: for example total CPU cores used, with each pod allowed one core. If pods request
          250 millicores, the forecast has to be divided by 0.25 cores per pod as well. I would make the per-pod
          capacity an explicit setting rather than an assumption in the formula.
        </p>
      </Callout>

      <H2 id="safety-guard">The safety guard</H2>
      <p>
        A decision that passes the engine still goes through a second layer before anything changes:
      </p>
      <CodeBlock lang="python" title="safety_guard.py" code={guard} />
      <ul>
        <li>
          <strong>Cooldown.</strong> After a scaling event, nothing else happens for 120 seconds. That gives new
          pods time to become ready and the metrics time to reflect them.
        </li>
        <li>
          <strong>Asymmetric steps.</strong> Up to five pods can be added at once, but only two removed. Scaling up
          too much costs money for a few minutes; scaling down too much drops requests. The asymmetry encodes that.
        </li>
        <li>
          <strong>An event log.</strong> Every applied decision, with its reason string, is kept and exposed through
          the API, so you can see why the controller did what it did.
        </li>
      </ul>
      <p>
        These are the same ideas the HPA uses in its <code>behavior</code> field (stabilisation windows and scaling
        policies). Writing them out by hand in a custom controller makes it obvious how much of autoscaling is
        damping rather than prediction.
      </p>

      <H2 id="dry-run-and-rbac">Dry run and the permissions it needs</H2>
      <p>
        <code>DRY_RUN</code> defaults to <code>true</code>. In dry-run mode the scaler logs the replica count it
        would have set and returns. That is the right default for anything that changes production on its own: run
        it next to the HPA for a while, compare what it would have done with what happened, and only then let it
        act.
      </p>
      <p>To act, the controller patches the deployment&rsquo;s scale subresource. The Helm chart grants this:</p>
      <CodeBlock lang="yaml" title="rbac.yaml" code={rbac} />
      <p>
        Using <code>deployments/scale</code> rather than full <code>update</code> on deployments is the right call:
        the controller can change the replica count and nothing else, not the image or the environment. The
        weakness is that it is a <code>ClusterRole</code>, so it can resize every deployment in every namespace. The
        controller only ever manages one, so a namespaced <code>Role</code> limited to that deployment is enough:
      </p>
      <CodeBlock lang="yaml" title="role.yaml" code={role} />

      <H2 id="two-bugs">Two bugs I&rsquo;d fix</H2>
      <p>Reading the code again for this article, two things stand out.</p>
      <p>
        <strong>It compares against ready replicas, not desired ones.</strong> The current replica count comes from{" "}
        <code>status.ready_replicas</code>:
      </p>
      <CodeBlock lang="python" title="k8s_scaler.py" code={readyBug} />
      <p>
        During a rollout or a scale-up, ready is lower than desired. Say the deployment is at 10 replicas and 4 are
        still starting. The controller sees 6, predicts a need for 8, decides that is a scale-up of 2 and sets
        replicas to 8, which is actually a scale-down from 10 in the middle of a rollout. The fix is to compare
        against <code>spec.replicas</code> and skip the tick while the two disagree:
      </p>
      <CodeBlock lang="python" title="k8s_scaler.py" code={readyFix} />
      <p>
        <strong>An unreachable API looks like zero replicas.</strong> If reading the deployment fails,{" "}
        <code>get_current_replicas()</code> returns 0. The decision engine then sees a deployment with no pods and
        asks for a large scale-up. The patch would most likely fail too, since the API is unreachable, but the
        decision and the event log would be wrong. An error should stop the tick, the same way a collection error
        does.
      </p>

      <H2 id="living-with-hpa">Living alongside the HPA</H2>
      <p>
        The README describes the controller as working with the HPA rather than replacing it. As written, it does
        not quite. Both the controller and an HPA would set <code>spec.replicas</code> on the same deployment, and
        the HPA re-evaluates every 15 seconds by default. Whatever the controller sets, the HPA overwrites on its
        next pass if current CPU does not justify it, which before a predicted spike it will not.
      </p>
      <p>
        The cleaner split is for the controller to move the HPA&rsquo;s floor instead of the replica count. It sets{" "}
        <code>minReplicas</code> to the predicted need; the HPA keeps the deployment at or above that floor and still
        scales further on real load:
      </p>
      <CodeBlock lang="python" title="Patch the HPA instead" code={hpaPatch} />
      <p>
        The prediction then can only ever add capacity early, never take it away during real load, which is the
        failure you care about. It needs <code>patch</code> on{" "}
        <code>horizontalpodautoscalers</code> in the <code>autoscaling</code> API group instead of on{" "}
        <code>deployments/scale</code>.
      </p>

      <H2 id="what-id-do-next">What I&rsquo;d do next</H2>
      <ul>
        <li>Fix the two bugs above and add tests that simulate a rollout in progress.</li>
        <li>Switch from patching replicas to patching the HPA&rsquo;s <code>minReplicas</code>.</li>
        <li>Make per-pod capacity an explicit setting, read from the deployment&rsquo;s CPU request.</li>
        <li>
          Before any of the ML, try a scheduled floor: if the pattern is &ldquo;busy from 9 to 6 on weekdays&rdquo;,
          a CronJob that raises <code>minReplicas</code> at 8:45 gets most of the benefit with none of the model.
          The <A href="/tools/cron-expression-explainer">cron explainer</A> helps with the schedule, and the{" "}
          <A href="/tools/kubernetes-resource-calculator">resource calculator</A> with how many pods fit per node.
        </li>
      </ul>
    </Prose>
  );
}
