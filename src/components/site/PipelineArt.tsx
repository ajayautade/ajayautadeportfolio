/**
 * Hero illustration: a commit travelling through CI into a cluster that reports metrics.
 * Line work is white on the black stage; the four DESIGN.md art accents appear
 * only here, inside the diagram.
 */
const VIOLET = "#8f3fe0";
const MAGENTA = "#cb009e";
const OLIVE = "#b7c400";
const AMBER = "#e07a2c";

const label = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.06em",
  fill: "#89868a",
} as const;

export default function PipelineArt({ className = "" }: { className?: string }) {
  const pods = [
    [0, 0, VIOLET], [1, 0, null], [2, 0, MAGENTA], [3, 0, null],
    [0, 1, null], [1, 1, OLIVE], [2, 1, null], [3, 1, VIOLET],
    [0, 2, AMBER], [1, 2, null], [2, 2, null], [3, 2, MAGENTA],
  ] as const;

  return (
    <svg
      viewBox="0 0 560 520"
      className={className}
      role="img"
      aria-label="Diagram of a delivery pipeline: a git commit passes test, lint and scan checks, is built into a container image, pushed to a registry, deployed to a Kubernetes cluster of pods, and monitored with metrics."
    >
      <g fill="none" stroke="#ffffff" strokeWidth="1.25" strokeLinejoin="round">
        {/* commit line */}
        <path d="M24 60 H536" stroke="#3a383b" />
        {[70, 150, 230].map((x) => (
          <circle key={x} cx={x} cy="60" r="5" fill="#000" stroke="#57545a" />
        ))}
        <circle cx="310" cy="60" r="8" fill="#fff" />
        <path d="M310 68 V112" />

        {/* CI checks */}
        <rect x="40" y="112" width="480" height="76" rx="4" />
        <path d="M200 112 V188 M360 112 V188" stroke="#57545a" />
        <path d="M66 152 l8 8 l16 -18" stroke={OLIVE} strokeWidth="2" />
        <path d="M226 152 l8 8 l16 -18" stroke={OLIVE} strokeWidth="2" />
        <path d="M386 152 l8 8 l16 -18" stroke={OLIVE} strokeWidth="2" />
        <path d="M280 188 V224" />

        {/* image layers */}
        <path d="M200 262 l80 -30 l80 30 l-80 30 z" fill="#000" />
        <path d="M200 280 l80 30 l80 -30" stroke="#89868a" />
        <path d="M200 298 l80 30 l80 -30" stroke="#57545a" />
        <path d="M360 262 H452 V352" strokeDasharray="4 5" />

        {/* cluster */}
        <rect x="40" y="352" width="336" height="144" rx="4" />
        <path d="M40 380 H376" stroke="#57545a" />

        {/* metrics */}
        <rect x="400" y="352" width="120" height="144" rx="4" />
        <path d="M400 380 H520" stroke="#57545a" />
        <path d="M414 470 l16 -22 l14 12 l18 -38 l14 20 l16 -30 l14 14" stroke={MAGENTA} strokeWidth="2" />
      </g>

      {/* pods */}
      {pods.map(([col, row, colour]) => (
        <rect
          key={`${col}-${row}`}
          x={60 + col * 78}
          y={394 + row * 32}
          width="62"
          height="20"
          rx="2"
          fill={colour ?? "#000"}
          stroke={colour ?? "#57545a"}
          strokeWidth="1.25"
        />
      ))}

      <g style={label}>
        <text x="24" y="40">main</text>
        <text x="326" y="48" fill="#ffffff">git push</text>
        <text x="100" y="156">test</text>
        <text x="260" y="156">lint</text>
        <text x="420" y="156">scan</text>
        <text x="60" y="270">image</text>
        <text x="60" y="286">build</text>
        <text x="464" y="300">registry</text>
        <text x="54" y="371">cluster</text>
        <text x="300" y="371">hpa 2–10</text>
        <text x="412" y="371">metrics</text>
      </g>
    </svg>
  );
}
