import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Native and WASM packages run on the server as-is instead of being bundled.
  serverExternalPackages: ["mupdf", "sharp"],
  partialPrefetching: true,
  experimental: {
    // Admins upload book PDFs, pictures and narration through server actions.
    serverActions: { bodySizeLimit: "110mb" },
    proxyClientMaxBodySize: "110mb",
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
