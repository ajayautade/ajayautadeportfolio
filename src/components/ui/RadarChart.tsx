"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RadarDataPoint {
  label: string;
  value: number; // 0–100
  skills: string[];
}

const radarData: RadarDataPoint[] = [
  { label: "Cloud", value: 90, skills: ["AWS", "GCP", "Terraform", "Ansible"] },
  { label: "Containers", value: 85, skills: ["Docker", "Kubernetes", "EKS"] },
  { label: "CI/CD", value: 88, skills: ["Jenkins", "GitHub Actions", "ArgoCD"] },
  { label: "Monitoring", value: 80, skills: ["Grafana", "Prometheus", "CloudWatch"] },
  { label: "Scripting", value: 75, skills: ["Python", "Shell Scripting"] },
  { label: "OS & Net", value: 78, skills: ["Linux", "Networking", "Git"] },
];

const SIZE = 320;
const CENTER = SIZE / 2;
const LEVELS = 4;

function polarToCartesian(
  angle: number,
  radius: number
): { x: number; y: number } {
  // Rotate -90deg so first axis points up
  const radian = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(radian),
    y: CENTER + radius * Math.sin(radian),
  };
}

export default function RadarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animProgress, setAnimProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const duration = 1200;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimProgress(eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [isInView]);

  const numPoints = radarData.length;
  const angleStep = 360 / numPoints;
  const maxRadius = CENTER - 55; // More padding for labels

  // Build grid rings
  const gridRings = Array.from({ length: LEVELS }, (_, i) => {
    const radius = (maxRadius / LEVELS) * (i + 1);
    const points = radarData
      .map((_, j) => {
        const { x, y } = polarToCartesian(j * angleStep, radius);
        return `${x},${y}`;
      })
      .join(" ");
    return points;
  });

  // Build axis lines
  const axisLines = radarData.map((_, i) => {
    const { x, y } = polarToCartesian(i * angleStep, maxRadius);
    return { x1: CENTER, y1: CENTER, x2: x, y2: y };
  });

  // Build data polygon
  const dataPoints = radarData.map((d, i) => {
    const radius = (d.value / 100) * maxRadius * animProgress;
    return polarToCartesian(i * angleStep, radius);
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Label positions (slightly outside the chart)
  const labelPositions = radarData.map((_, i) => {
    const labelRadius = maxRadius + 35;
    return polarToCartesian(i * angleStep, labelRadius);
  });

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[340px] sm:max-w-[380px]"
      >
        {/* Grid rings */}
        {gridRings.map((points, i) => (
          <polygon
            key={`ring-${i}`}
            points={points}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="0.5"
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((line, i) => (
          <line
            key={`axis-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--color-border)"
            strokeWidth="0.5"
            opacity={0.3}
          />
        ))}

        {/* Data area fill */}
        <motion.polygon
          points={dataPolygon}
          fill="url(#radarGradient)"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Data points (dots) */}
        {dataPoints.map((point, i) => (
          <g key={`dot-${i}`}>
            {/* Invisible larger hit target */}
            <circle
              cx={point.x}
              cy={point.y}
              r={16}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === i ? 6 : 4}
              fill="var(--color-primary)"
              stroke="var(--color-bg)"
              strokeWidth="2"
              className="transition-all duration-200 pointer-events-none"
            />
            {/* Glow effect on hover */}
            {hoveredIndex === i && (
              <circle
                cx={point.x}
                cy={point.y}
                r={12}
                fill="var(--color-primary)"
                opacity={0.15}
              />
            )}
          </g>
        ))}

        {/* Labels */}
        {labelPositions.map((pos, i) => {
          const isTop = pos.y < CENTER;
          const isLeft = pos.x < CENTER - 10;
          const isRight = pos.x > CENTER + 10;
          let textAnchor: "start" | "middle" | "end" = "middle";
          if (isLeft) textAnchor = "end";
          if (isRight) textAnchor = "start";

          return (
            <text
              key={`label-${i}`}
              x={pos.x}
              y={pos.y}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className={`text-[10px] sm:text-[11px] font-medium transition-colors duration-200 cursor-pointer ${
                hoveredIndex === i
                  ? "fill-[var(--color-primary)]"
                  : "fill-[var(--color-text-secondary)]"
              }`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {radarData[i].label}
            </text>
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.08" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hover tooltip / info */}
      <div className="h-10 mt-2 flex items-center justify-center">
        {hoveredIndex !== null ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-sm font-semibold text-primary">
              {radarData[hoveredIndex].label}
            </span>
            <span className="text-text-tertiary text-xs ml-2">
              {radarData[hoveredIndex].skills.join(" · ")}
            </span>
          </motion.div>
        ) : (
          <p className="text-xs text-text-tertiary">
            Hover on a point to see details
          </p>
        )}
      </div>
    </div>
  );
}
