import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

interface OgImageProps {
  /** Small upper-case label above the title, e.g. "Blog" or "Service". */
  eyebrow: string;
  title: string;
  /** Optional line under the title. Keep it short. */
  detail?: string;
}

/**
 * The one share-image layout, used by every opengraph-image route.
 * Follows DESIGN.md: black stage, bold white type, one small mauve mark.
 */
export function ogImage({ eyebrow, title, detail }: OgImageProps) {
  const titleSize = title.length > 70 ? 56 : title.length > 40 ? 68 : 84;
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 20, height: 20, backgroundColor: "#c99aab", marginRight: 18 }} />
          <span style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>{site.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: 3, color: "#89868a", textTransform: "uppercase" }}>
            {eyebrow}
          </span>
          <span
            style={{
              marginTop: 20,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: "#ffffff",
              maxWidth: 1040,
            }}
          >
            {title}
          </span>
          {detail && (
            <span style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, color: "#cfcdd0", maxWidth: 940 }}>{detail}</span>
          )}
        </div>

        <span style={{ fontSize: 24, color: "#89868a" }}>{site.url.replace("https://", "")}</span>
      </div>
    ),
    ogSize,
  );
}
