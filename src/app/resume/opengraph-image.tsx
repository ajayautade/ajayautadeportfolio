import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ajay Autade — Official Resume & Executive Cover Letter";
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
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            borderRadius: "50px",
            border: "1px solid rgba(59, 130, 246, 0.3)",
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
              color: "#60a5fa",
              fontWeight: 600,
              fontFamily: "sans-serif",
            }}
          >
            Verified Candidate Credentials • Available for Junior Roles
          </span>
        </div>

        <h1
          style={{
            fontSize: 72,
            color: "white",
            lineHeight: 1.1,
            fontWeight: 800,
            marginBottom: "16px",
            fontFamily: "sans-serif",
          }}
        >
          Ajay Autade
        </h1>

        <h2
          style={{
            fontSize: 42,
            color: "#3b82f6",
            fontWeight: 700,
            marginBottom: "24px",
            fontFamily: "sans-serif",
          }}
        >
          DevOps, Cloud Architecture &amp; Platform Engineering
        </h2>

        <p
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            maxWidth: "900px",
            lineHeight: 1.4,
            fontFamily: "sans-serif",
            marginBottom: "36px",
          }}
        >
          Official Resume Document (PDF) &amp; Executive Cover Letter. Proven production expertise across AWS, Kubernetes, Terraform, Docker, and CI/CD.
        </p>

        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              padding: "10px 24px",
              backgroundColor: "#1e293b",
              borderRadius: "10px",
              border: "1px solid #334155",
              color: "#e2e8f0",
              fontSize: 20,
              fontFamily: "sans-serif",
            }}
          >
            📄 PDF Resume
          </div>
          <div
            style={{
              padding: "10px 24px",
              backgroundColor: "#1e293b",
              borderRadius: "10px",
              border: "1px solid #334155",
              color: "#e2e8f0",
              fontSize: 20,
              fontFamily: "sans-serif",
            }}
          >
            ✉️ Cover Letter
          </div>
          <div
            style={{
              padding: "10px 24px",
              backgroundColor: "#2563eb",
              borderRadius: "10px",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            AWS • Kubernetes • Terraform
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
