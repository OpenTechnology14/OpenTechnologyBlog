/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
