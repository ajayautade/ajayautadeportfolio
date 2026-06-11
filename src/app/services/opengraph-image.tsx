import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hire Ajay Autade - Freelance DevOps Services";
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
          padding: "80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
            padding: "10px 20px",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderRadius: "50px",
            border: "1px solid rgba(59, 130, 246, 0.2)",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              marginRight: "10px",
            }}
          />
          <span style={{ fontSize: 24, color: "#60a5fa", fontWeight: 600, fontFamily: "sans-serif" }}>
            Available for Freelance Projects
          </span>
        </div>
        <h1
          style={{
            fontSize: 90,
            color: "white",
            lineHeight: 1.1,
            fontWeight: 800,
            marginBottom: "20px",
            fontFamily: "sans-serif"
          }}
        >
          DevOps <span style={{ color: "#3b82f6" }}>Services</span>
        </h1>
        <p
          style={{
            fontSize: 36,
            color: "#d4d4d8",
            maxWidth: "900px",
            lineHeight: 1.4,
            fontFamily: "sans-serif",
            marginTop: "20px"
          }}
        >
          CI/CD Pipelines • Kubernetes • AWS • Infrastructure as Code
        </p>
        <div style={{ display: "flex", marginTop: "50px", gap: "20px" }}>
          <div style={{ padding: "15px 30px", backgroundColor: "#18181b", borderRadius: "10px", border: "1px solid #27272a", color: "#a1a1aa", fontSize: 24, fontFamily: "sans-serif" }}>Starter</div>
          <div style={{ padding: "15px 30px", backgroundColor: "#3b82f6", borderRadius: "10px", color: "white", fontSize: 24, fontWeight: "bold", fontFamily: "sans-serif" }}>Standard</div>
          <div style={{ padding: "15px 30px", backgroundColor: "#18181b", borderRadius: "10px", border: "1px solid #f59e0b", color: "#f59e0b", fontSize: 24, fontFamily: "sans-serif" }}>Premium</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
