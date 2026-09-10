import type { NextConfig } from "next"
import { createMDX } from "fumadocs-mdx/next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.30.225.204", "192.168.1.2"],

  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    localPatterns: [
      { pathname: "/assets/projects/**" },
      { pathname: "/assets/writing/**" },
      { pathname: "/assets/avatar/**" },
    ],
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)