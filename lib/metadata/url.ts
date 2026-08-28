import { siteConfig } from "@/lib/metadata/site-config"

function normalizePath(path = "/"): string {
  if (!path || path === "/") {
    return "/"
  }

  const pathWithoutOrigin = path.startsWith("http")
    ? new URL(path).pathname
    : path

  return `/${pathWithoutOrigin.replace(/^\/+/, "").replace(/\/+$/, "")}`
}

export function getCanonicalUrl(path = "/"): string {
  const normalizedPath = normalizePath(path)

  return normalizedPath === "/"
    ? siteConfig.siteUrl
    : `${siteConfig.siteUrl}${normalizedPath}`
}

function getCanonicalUrlObject(path = "/"): URL {
  return new URL(getCanonicalUrl(path))
}
