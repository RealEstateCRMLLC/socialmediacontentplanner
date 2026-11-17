import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output enables clean tarball deploys to Hetzner
  output: 'standalone',
  // The app is mounted at /contentplanner/ behind nginx (which strips
  // the prefix). Without assetPrefix the HTML references /_next/static
  // at the DOMAIN ROOT, where the main CRM's chunks live — every CP
  // page 404'd its JS and never hydrated. Prefixing assets with the
  // mount makes nginx route them back to this app. Routes are NOT
  // prefixed (no basePath): nginx already strips the mount for pages.
  assetPrefix: '/contentplanner',
  eslint: {
    // Why: this app was never lint-clean and `next/typescript` +
    // `react/no-unescaped-entities` surface dozens of cosmetic findings
    // (shadcn `any` props, `"use client"` treated as an unused expression,
    // unescaped quotes in copy). Blocking `next build` on those prevents the
    // app from shipping at all. Lint still runs via `npm run lint` and its
    // findings are reported there; it just no longer gates the production
    // build. Turn this off once the codebase is clean.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
