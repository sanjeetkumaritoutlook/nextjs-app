import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const repoName = "nextjs-app"; // Replace with your actual repository name

const nextConfig: NextConfig = {
  /* config options here */
   // Configure basePath and assetPrefix for GitHub Pages
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  
  // Optional: Output as static files for GitHub Pages
  output: "export",

  // Other Next.js configurations (optional)
  reactStrictMode: true,
};

export default nextConfig;
