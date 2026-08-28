import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/metadata/site-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: siteConfig.themeColor,
    description: siteConfig.description,
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: "/web-app-manifest-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/web-app-manifest-512x512.png",
        type: "image/png",
      },
    ],
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    start_url: "/",
    theme_color: siteConfig.themeColor,
  }
}
