import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: false,
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
          // Content Security Policy — controls what resources can load
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "frame-src 'self' blob: data:",
              "object-src 'self' blob: data:",
              "connect-src 'self' https://api.web3forms.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self' https://api.web3forms.com",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // Prevents cross-origin attacks
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
        ],
      },
    ];
  },
};

export default nextConfig;
