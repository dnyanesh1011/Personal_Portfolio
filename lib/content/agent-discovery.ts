import type { DiscoveryRoute } from "@/lib/content/content-types"
import { siteIdentity } from "@/lib/content/identity"
import {
  getDiscoveryRoutes,
  getProjectDiscoveryRoutes,
  getWritingDiscoveryRoutes,
} from "@/lib/content/content-discovery"
import { siteConfig } from "@/lib/metadata/site-config"
import { getCanonicalUrl } from "@/lib/metadata/url"

function formatRouteLink(route: DiscoveryRoute): string {
  return `- [${route.title}](${getCanonicalUrl(route.href)}) — ${route.description}`
}

function renderRouteSection(
  title: string,
  routes: readonly DiscoveryRoute[]
): string {
  return [`## ${title}`, ...routes.map(formatRouteLink)].join("\n")
}

export function renderLlmsTxt(): string {
  const routes = getDiscoveryRoutes().filter(
    (route) =>
      route.kind === "home" ||
      route.kind === "projects" ||
      route.kind === "writing"
  )

  return [
    `# ${siteConfig.name}`,
    siteConfig.description,
    "",
    renderRouteSection("Core Routes", routes),
    "",
    `Contact: ${siteIdentity.email}`,
  ].join("\n")
}

export function renderLlmsFullTxt(): string {
  return [
    `# ${siteConfig.name}`,
    siteConfig.description,
    "",
    `Author: ${siteIdentity.name}`,
    `Role: ${siteIdentity.title}`,
    `Canonical: ${siteConfig.siteUrl}`,
    `Contact: ${siteIdentity.email}`,
    "",
    renderRouteSection(
      "Core Routes",
      getDiscoveryRoutes().filter((route) =>
        ["home", "projects", "writing"].includes(route.kind)
      )
    ),
    "",
    renderRouteSection("Projects", getProjectDiscoveryRoutes()),
    "",
    renderRouteSection("Writing", getWritingDiscoveryRoutes()),
  ].join("\n")
}
