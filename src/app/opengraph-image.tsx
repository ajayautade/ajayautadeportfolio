import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ajay Autade - DevOps Engineer";
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
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              marginRight: "20px",
            }}
          />
          <span style={{ fontSize: 40, color: "#a1a1aa", fontWeight: 600, fontFamily: "sans-serif" }}>
            ajayautade.dev
          </span>
        </div>
        <h1
          style={{
            fontSize: 80,
            color: "white",
            lineHeight: 1.1,
            fontWeight: 800,
            marginBottom: "20px",
            fontFamily: "sans-serif"
          }}
        >
          Ajay Autade
        </h1>
        <h2
          style={{
            fontSize: 50,
            color: "#3b82f6",
            fontWeight: 700,
            marginBottom: "40px",
            fontFamily: "sans-serif"
          }}
        >
          DevOps & Cloud Engineer
        </h2>
        <p
          style={{
            fontSize: 32,
            color: "#d4d4d8",
            maxWidth: "800px",
            lineHeight: 1.4,
            fontFamily: "sans-serif"
          }}
        >
          Designing scalable, secure, and automated cloud infrastructure for modern applications.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
