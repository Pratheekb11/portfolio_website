import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo>, so the app needs to know
// its prefix at build time. Empty locally and on any root-domain host.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // do not generate assistant instruction files in the repo
  agentRules: false,

  // fully static build: no server, deployable to any file host
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
