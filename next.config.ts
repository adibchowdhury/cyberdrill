import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/pathways", destination: "/jobs", permanent: false },
      { source: "/pathways/:path*", destination: "/jobs", permanent: false },
      { source: "/labs", destination: "/jobs", permanent: false },
      { source: "/labs/:path*", destination: "/jobs", permanent: false },
      { source: "/progress", destination: "/jobs", permanent: false },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
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
