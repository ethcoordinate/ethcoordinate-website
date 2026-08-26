import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  async headers() {
    return [
      {
        // fork-history artwork: long cache + week-long revalidate window
        source: "/upgrades/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/our-work/staker-support",
        destination: "/ethstaker",
        permanent: true,
      },
      {
        source: "/initiatives/staker-support",
        destination: "/ethstaker",
        permanent: true,
      },
      {
        source: "/pm-repo/breakouts",
        destination: "/breakouts",
        permanent: true,
      },
      {
        source: "/pm-repo",
        destination: "/protocol-coordination",
        permanent: true,
      },
      {
        source: "/initiatives/protocol-coordination",
        destination: "/protocol-coordination",
        permanent: true,
      },
      {
        source: "/guides/breakout",
        destination: "/breakouts",
        permanent: true,
      },
      {
        source: "/guides/champion/:path*",
        destination: "/champion/:path*",
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
