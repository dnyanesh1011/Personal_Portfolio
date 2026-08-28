import type { NextConfig } from "next"
import { createMDX } from "fumadocs-mdx/next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    localPatterns: [
      { pathname: "/assets/projects/**" },
      { pathname: "/assets/writing/**" },
    ],
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
