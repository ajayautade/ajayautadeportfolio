import type { DiagramAccent, ProjectDiagram } from "@/lib/projects";

/**
 * Art accents from DESIGN.md. They are allowed inside diagrams only,
 * never as interface chrome. Each node also carries a text label, so
 * meaning never depends on the colour.
 */
const ACCENT: Record<DiagramAccent, string> = {
  violet: "#550098",
  magenta: "#CB009E",
  olive: "#727D00",
  amber: "#A1490F",
};

function Arrow({ direction }: { direction: "right" | "down" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 text-text-quaternary ${direction === "down" ? "rotate-90" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M3 12h17M14 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Architecture diagram as stacked lanes. Each lane reads left to right
 * and lanes read top to bottom. Nodes wrap on narrow screens, so the
 * diagram never needs horizontal scrolling.
 *
 * Exposed to assistive tech as one image, named by the full text
 * description printed underneath it. The boxes themselves are hidden
 * from the accessibility tree, so the description is read once.
 */
export default function FlowDiagram({ diagram, id }: { diagram: ProjectDiagram; id: string }) {
  return (
    <figure className="my-8">
      <div role="img" aria-labelledby={`${id}-description`} className="panel p-4 sm:p-6">
        <div aria-hidden="true">
          {diagram.lanes.map((lane, laneIndex) => (
            <div key={lane.title}>
              {laneIndex > 0 && (
                <div className="flex justify-start py-3 pl-3">
                  <Arrow direction="down" />
                </div>
              )}
              <div className="grid gap-3 border-l-2 border-text-primary pl-4 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
                <p className="type-eyebrow text-text-tertiary sm:pt-2.5">{lane.title}</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2.5">
                  {lane.nodes.map((node, nodeIndex) => (
                    <div key={node.label} className="flex items-center gap-2">
                      {nodeIndex > 0 && <Arrow direction="right" />}
                      <div className="flex min-h-10 items-center gap-2.5 rounded-sm border border-border-strong bg-bg px-3 py-1.5">
                        {node.accent && (
                          <span className="h-2 w-2 shrink-0" style={{ backgroundColor: ACCENT[node.accent] }} />
                        )}
                        <span className="leading-tight">
                          <span className="block text-sm font-medium text-text-primary">{node.label}</span>
                          {node.note && (
                            <span className="block font-mono text-[11px] text-text-tertiary">{node.note}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption id={`${id}-description`} className="mt-4 text-text-secondary">
        {diagram.description}
      </figcaption>
    </figure>
  );
}
