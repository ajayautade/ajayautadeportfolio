import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ajay Autade — Interactive CI/CD Simulation & Technical Deep Dives";
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
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#09090b",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
            padding: "8px 20px",
            backgroundColor: "rgba(168, 85, 247, 0.15)",
            borderRadius: "50px",
            border: "1px solid rgba(168, 85, 247, 0.3)",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#a855f7",
              marginRight: "12px",
            }}
          />
          <span
            style={{
              fontSize: 20,
              color: "#c084fc",
              fontWeight: 600,
              fontFamily: "sans-serif",
            }}
          >
            Live GitOps Pipeline Simulator &amp; Engineering Labs
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
          Interactive CI/CD Deep Dives
        </h1>

        <h2
          style={{
            fontSize: 38,
            color: "#a855f7",
            fontWeight: 700,
            marginBottom: "24px",
            fontFamily: "sans-serif",
          }}
        >
          AWS EKS • ArgoCD GitOps • Senior Screening Solutions
        </h2>

        <p
          style={{
            fontSize: 26,
            color: "#a1a1aa",
            maxWidth: "920px",
            lineHeight: 1.4,
            fontFamily: "sans-serif",
            marginBottom: "36px",
          }}
        >
          Simulate a real-time GitOps deployment pipeline to AWS EKS and explore 15 production architectural case studies authored by Ajay Autade.
        </p>

        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              padding: "10px 22px",
              backgroundColor: "#1e293b",
              borderRadius: "10px",
              border: "1px solid #334155",
              color: "#e2e8f0",
              fontSize: 19,
              fontFamily: "sans-serif",
            }}
          >
            ⚡ Live Simulator
          </div>
          <div
            style={{
              padding: "10px 22px",
              backgroundColor: "#1e293b",
              borderRadius: "10px",
              border: "1px solid #334155",
              color: "#e2e8f0",
              fontSize: 19,
              fontFamily: "sans-serif",
            }}
          >
            🛡️ DevSecOps &amp; SRE
          </div>
          <div
            style={{
              padding: "10px 22px",
              backgroundColor: "#7e22ce",
              borderRadius: "10px",
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            15 Production Screening Solutions
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
