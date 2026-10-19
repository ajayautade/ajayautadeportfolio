import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hire Ajay Autade - Cloud, DevOps, Web & Automation Services";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          padding: "60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            padding: "8px 24px",
            backgroundColor: "rgba(79, 70, 229, 0.15)",
            borderRadius: "50px",
            border: "1px solid rgba(79, 70, 229, 0.3)",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              marginRight: "10px",
            }}
          />
          <span
            style={{
              fontSize: 22,
              color: "#818cf8",
              fontWeight: 600,
              fontFamily: "sans-serif",
            }}
          >
            Global Technical Partner • Production Engineering &amp; Sprints
          </span>
        </div>
        <h1
          style={{
            fontSize: 68,
            color: "white",
            lineHeight: 1.15,
            fontWeight: 800,
            marginBottom: "16px",
            fontFamily: "sans-serif",
          }}
        >
          Cloud Architecture, DevOps &amp;{" "}
          <span style={{ color: "#38bdf8" }}>Systems Engineering</span>
        </h1>
        <p
          style={{
            fontSize: 30,
            color: "#d4d4d8",
            maxWidth: "960px",
            lineHeight: 1.4,
            fontFamily: "sans-serif",
            marginTop: "10px",
          }}
        >
          AWS Cloud • Automated CI/CD • Workflow Automation • Next.js Websites &amp; SaaS Apps
        </p>
        <div style={{ display: "flex", marginTop: "40px", gap: "20px" }}>
          <div
            style={{
              padding: "12px 28px",
              backgroundColor: "#18181b",
              borderRadius: "12px",
              border: "1px solid #27272a",
              color: "#a1a1aa",
              fontSize: 22,
              fontFamily: "sans-serif",
            }}
          >
            Cloud &amp; DevOps CI/CD
          </div>
          <div
            style={{
              padding: "12px 28px",
              backgroundColor: "#4f46e5",
              borderRadius: "12px",
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            Workflow &amp; API Automation
          </div>
          <div
            style={{
              padding: "12px 28px",
              backgroundColor: "#18181b",
              borderRadius: "12px",
              border: "1px solid #f59e0b",
              color: "#f59e0b",
              fontSize: 22,
              fontFamily: "sans-serif",
            }}
          >
            High-Performance Web &amp; SaaS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
