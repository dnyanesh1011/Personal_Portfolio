import type { MetadataRoute } from "next"

import type { DiscoveryRoute } from "@/lib/content/content-types"
import { getDiscoveryRoutes } from "@/lib/content/content-discovery"
import { getCanonicalUrl } from "@/lib/metadata/url"

const siteUpdatedAt = "2026-06-16"

function getRouteChangeFrequency(
  route: DiscoveryRoute
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (route.kind === "home") {
    return "monthly"
  }

  if (route.kind === "projects" || route.kind === "writing") {
    return "weekly"
  }

  return "monthly"
}

function getRoutePriority(route: DiscoveryRoute): number {
  if (route.kind === "home") {
    return 1
  }

  if (route.kind === "projects" || route.kind === "writing") {
    return 0.8
  }

  return 0.6
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getDiscoveryRoutes().map((route) => ({
    changeFrequency: getRouteChangeFrequency(route),
    lastModified: route.publishedAt ?? siteUpdatedAt,
    priority: getRoutePriority(route),
    url: getCanonicalUrl(route.href),
  }))
}
