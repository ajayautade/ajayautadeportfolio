import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ajay Autade — Verified Certifications & Credentials";
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
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            borderRadius: "50px",
            border: "1px solid rgba(16, 185, 129, 0.3)",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              marginRight: "12px",
            }}
          />
          <span
            style={{
              fontSize: 20,
              color: "#34d399",
              fontWeight: 600,
              fontFamily: "sans-serif",
            }}
          >
            Verified Industry Credentials &amp; Certifications
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
          Certifications &amp; Credentials
        </h1>

        <h2
          style={{
            fontSize: 38,
            color: "#3b82f6",
            fontWeight: 700,
            marginBottom: "24px",
            fontFamily: "sans-serif",
          }}
        >
          Ajay Autade • DevOps &amp; Cloud Engineer
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
          Industry credentials in progress (AWS Solutions Architect, CKA, Terraform Associate) and verified certificates from IBM, DeepLearning.AI, and Coursera.
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
            AWS Solutions Architect
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
            Kubernetes (CKA)
          </div>
          <div
            style={{
              padding: "10px 22px",
              backgroundColor: "#059669",
              borderRadius: "10px",
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            IBM AI &amp; DeepLearning.AI
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
