import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/pathways/linux-administration/intermediate/redirect-output-and-errors",
        destination: "/pathways/linux-administration/beginner/redirect-output-and-errors",
        permanent: true,
      },
      {
        source: "/pathways/linux-administration/intermediate/edit-a-file-in-the-shell",
        destination: "/pathways/linux-administration/beginner/edit-a-file-in-the-shell",
        permanent: true,
      },
      {
        source: "/pathways/linux-administration/advanced/write-a-simple-shell-script",
        destination: "/pathways/linux-administration/beginner/write-a-simple-shell-script",
        permanent: true,
      },
      {
        source: "/pathways/linux-administration/advanced/configure-ssh-key-login",
        destination: "/pathways/linux-administration/intermediate/configure-ssh-key-login",
        permanent: true,
      },
      {
        source: "/pathways/linux-administration/advanced/read-a-systemd-unit",
        destination: "/pathways/linux-administration/intermediate/read-a-systemd-unit",
        permanent: true,
      },
      {
        source: "/pathways/linux-administration/advanced/inspect-listening-ports",
        destination: "/pathways/linux-administration/intermediate/inspect-listening-ports",
        permanent: true,
      },
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
