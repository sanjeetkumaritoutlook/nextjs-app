import type { NextConfig } from "next";
// const isProd = process.env.NODE_ENV === "production";
// const repoName = "nextjs-app"; // Replace with your actual repository name

const nextConfig: NextConfig = {
  basePath: '/nextjs-app',
  assetPrefix: '/nextjs-app',
};

export default nextConfig;
