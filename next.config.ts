import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      {
        source: "/our-work/staker-support",
        destination: "/initiatives/staker-support",
        permanent: true,
      },
      {
        source: "/pm-repo/breakouts",
        destination: "/breakouts",
        permanent: true,
      },
      {
        source: "/pm-repo",
        destination: "/initiatives/protocol-coordination",
        permanent: true,
      },
      {
        source: "/guides/breakout",
        destination: "/breakouts",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
