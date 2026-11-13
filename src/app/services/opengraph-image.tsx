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
          backgroundColor: "#000000",
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
            backgroundColor: "#111111",
            borderRadius: "50px",
            border: "1px solid #2c2a2d",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#b7c400",
              marginRight: "10px",
            }}
          />
          <span
            style={{
              fontSize: 22,
              color: "#c99aab",
              fontWeight: 700,
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
            fontWeight: 700,
            marginBottom: "16px",
            fontFamily: "sans-serif",
          }}
        >
          Cloud Architecture, DevOps &amp;{" "}
          <span style={{ color: "#c99aab" }}>Systems Engineering</span>
        </h1>
        <p
          style={{
            fontSize: 30,
            color: "#ffffff",
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
              backgroundColor: "#111111",
              borderRadius: "12px",
              border: "1px solid #2c2a2d",
              color: "#89868a",
              fontSize: 22,
              fontFamily: "sans-serif",
            }}
          >
            Cloud &amp; DevOps CI/CD
          </div>
          <div
            style={{
              padding: "12px 28px",
              backgroundColor: "#c99aab",
              borderRadius: "12px",
              color: "white",
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "sans-serif",
            }}
          >
            Workflow &amp; API Automation
          </div>
          <div
            style={{
              padding: "12px 28px",
              backgroundColor: "#111111",
              borderRadius: "12px",
              border: "1px solid #c99aab",
              color: "#c99aab",
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
