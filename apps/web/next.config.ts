import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/** Supabase's address (pictures, narration and family voices come from its Storage links). */
const supabase = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "").origin;
  } catch {
    return "";
  }
})();

/*
  A basic Content Security Policy (see docs/SECURITY_REVIEW.md). Next's own inline scripts and the
  pre-paint language script need 'unsafe-inline' (nonces would make every page dynamic). What it
  still stops: scripts, styles and fonts from other sites, plugins, <base> tricks, forms posting
  elsewhere, and other sites framing Lali (the app's web view loads pages directly, not in a frame).
  Frames may show YouTube (youtube-nocookie.com) and the HTTPS web games admins add.
*/
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  `media-src 'self' data: blob: ${supabase}`.trim(),
  `connect-src 'self' ${supabase}${isDev ? " ws:" : ""}`.trim(),
  "frame-src 'self' https:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.chapa.co",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), geolocation=(), payment=(), usb=(), microphone=(self)" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]),
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Native and WASM packages run on the server as-is instead of being bundled.
  serverExternalPackages: ["mupdf", "sharp"],
  partialPrefetching: true,
  poweredByHeader: false,
  // The end-to-end tests build with fake Supabase settings into their own folder (e2e/build.mjs).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // …with its own tsconfig, so that build doesn't add its folder to tsconfig.json.
  typescript: { tsconfigPath: process.env.NEXT_DIST_DIR ? "tsconfig.e2e.json" : "tsconfig.json" },
  experimental: {
    // Admins upload book PDFs, pictures and narration through server actions.
    serverActions: { bodySizeLimit: "110mb" },
    proxyClientMaxBodySize: "110mb",
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Games hosted on Lali (public/games/<name>/…) are shown in frames, also by the app's web
      // build on its own address, so any page may frame them. They hold no family data.
      { source: "/games/:name/:file+", headers: [{ key: "Content-Security-Policy", value: "frame-ancestors *; object-src 'none'; base-uri 'self'" }] },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
