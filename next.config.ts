import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/invoices/add",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
