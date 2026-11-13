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
          backgroundColor: "#000000",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
            padding: "8px 20px",
            backgroundColor: "#111111",
            borderRadius: "50px",
            border: "1px solid #2c2a2d",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#b7c400",
              marginRight: "12px",
            }}
          />
          <span
            style={{
              fontSize: 20,
              color: "#b7c400",
              fontWeight: 700,
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
            fontWeight: 700,
            marginBottom: "16px",
            fontFamily: "sans-serif",
          }}
        >
          Certifications &amp; Credentials
        </h1>

        <h2
          style={{
            fontSize: 38,
            color: "#c99aab",
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
            color: "#89868a",
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
              backgroundColor: "#111111",
              borderRadius: "10px",
              border: "1px solid #2c2a2d",
              color: "#ffffff",
              fontSize: 19,
              fontFamily: "sans-serif",
            }}
          >
            AWS Solutions Architect
          </div>
          <div
            style={{
              padding: "10px 22px",
              backgroundColor: "#111111",
              borderRadius: "10px",
              border: "1px solid #2c2a2d",
              color: "#ffffff",
              fontSize: 19,
              fontFamily: "sans-serif",
            }}
          >
            Kubernetes (CKA)
          </div>
          <div
            style={{
              padding: "10px 22px",
              backgroundColor: "#c99aab",
              borderRadius: "10px",
              color: "white",
              fontSize: 19,
              fontWeight: 700,
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
