import type { DiscoveryRoute } from "@/lib/content/content-types"
import { siteIdentity, socialLinks } from "@/lib/content/identity"
import type { ProjectMdxDocument } from "@/lib/content/project-pages"
import type { WritingMdxDocument } from "@/lib/content/writing-pages"
import { siteConfig } from "@/lib/metadata/site-config"
import { getCanonicalUrl } from "@/lib/metadata/url"

type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }
export type JsonLd = { [key: string]: JsonValue }

const personId = `${siteConfig.siteUrl}/#person`
const websiteId = `${siteConfig.siteUrl}/#website`

function getSameAs(): string[] {
  return socialLinks.reduce<string[]>((acc, link) => {
    if (link.href.startsWith("http")) acc.push(link.href)
    return acc
  }, [])
}

export function createPersonJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@id": personId,
    "@type": "Person",
    email: siteIdentity.email,
    jobTitle: siteIdentity.title,
    name: siteIdentity.name,
    sameAs: getSameAs(),
    url: siteConfig.siteUrl,
  }
}

export function createWebsiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@id": websiteId,
    "@type": "WebSite",
    description: siteConfig.description,
    name: siteConfig.name,
    publisher: {
      "@id": personId,
    },
    url: siteConfig.siteUrl,
  }
}

export function createCollectionPageJsonLd(route: DiscoveryRoute): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    description: route.description,
    name: route.title,
    url: getCanonicalUrl(route.href),
  }
}

export function createProjectJsonLd(project: ProjectMdxDocument): JsonLd {
  const url = getCanonicalUrl(`/projects/${project.slug}`)

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    author: {
      "@id": personId,
    },
    datePublished: project.publishedAt,
    description: project.description,
    name: project.title,
    programmingLanguage: project.stack,
    url,
  }
}

export function createBreadcrumbJsonLd(
  items: { name: string; href: string }[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.href),
    })),
  }
}

export function createWritingJsonLd(post: WritingMdxDocument): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    author: {
      "@id": personId,
    },
    dateModified: post.updatedAt ?? post.publishedAt,
    datePublished: post.publishedAt,
    description: post.description,
    headline: post.title,
    mainEntityOfPage: getCanonicalUrl(`/writing/${post.slug}`),
    publisher: {
      "@id": personId,
    },
    url: getCanonicalUrl(`/writing/${post.slug}`),
  }
}
