import path from "node:path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/*
 * Content Security Policy.
 * - No 'unsafe-eval' in production. Only the dev server needs eval, for React Fast Refresh.
 * - 'unsafe-inline' stays for scripts: the pages are prerendered as static HTML with Next's inline
 *   bootstrap scripts, and the alternative, a per-request nonce, would force every page to render
 *   on each request instead of being served from the CDN.
 * - Everything else is limited to what the site actually loads: its own files, self-hosted fonts
 *   (next/font), Web3Forms for the two forms, and Vercel Analytics.
 * If you add a third-party script, image host or API, add it to the matching directive here.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  // The resume page embeds its PDF with <object> and an <iframe> fallback, both same-origin.
  "object-src 'self'",
  "frame-src 'self'",
  `connect-src 'self' https://api.web3forms.com https://vitals.vercel-insights.com https://va.vercel-scripts.com${isDev ? " ws:" : ""}`,
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Serve AVIF first, then WebP, sized per device
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      {
        source: "/pipeline",
        destination: "/deep-dives",
        permanent: true,
      },
      {
        source: "/screening",
        destination: "/deep-dives",
        permanent: true,
      },
      {
        source: "/credentials",
        destination: "/certifications",
        permanent: true,
      },
      {
        source: "/certificates",
        destination: "/certifications",
        permanent: true,
      },
      {
        source: "/refunds",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/cancellation-policy",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/refund",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/delivery-policy",
        destination: "/shipping-policy",
        permanent: true,
      },
    ];
  },
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents clickjacking from external sites while allowing same-origin embedding for resume preview
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Prevents MIME-type sniffing attacks
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Controls how much referrer information is shared
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Blocks access to browser features you don't use
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // Force HTTPS for 1 year (Vercel already does this, but defense-in-depth)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Content Security Policy — controls what resources can load. Built in contentSecurityPolicy above.
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          // Keeps other sites' windows from getting a handle on this one (window.opener)
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          // Lets the browser resolve link targets' DNS ahead of a click
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        source: "/resume.pdf",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Content-Disposition",
            value: 'inline; filename="ajay_autade_devops_9545034120.pdf"',
          },
          // Keep the resume out of search results; it is shared by direct link only
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/ajay_autade_devops_9545034120.pdf",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Content-Disposition",
            value: 'inline; filename="ajay_autade_devops_9545034120.pdf"',
          },
          // Keep the resume out of search results; it is shared by direct link only
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
