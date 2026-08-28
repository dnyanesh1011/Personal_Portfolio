export type ActionLinkKind =
  | "contact"
  | "cv"
  | "email"
  | "github"
  | "home"
  | "linkedin"
  | "projectLive"
  | "projectSource"
  | "projects"
  | "writing"
  | "x"

export type ActionLinkRecord = {
  href: string
  kind: ActionLinkKind
  label?: string
  labelContext?: string
}

export type SiteIdentity = {
  email: string
  name: string
  title: string
}

export type ProjectContent = {
  href: string
  liveHref: string
  name: string
  screenshotSrc?: string
  slug: string
  sourceHref: string | null
  summary: string
}

export type WritingContent = {
  category: string
  excerpt: string
  featured: boolean
  href: string
  publishedAt: string
  readingTime: string
  slug: string
  title: string
  updatedAt?: string
}

export type HomepageContent = {
  about: string
  approach: string
  identity: SiteIdentity
  projects: readonly ProjectContent[]
  socialLinks: readonly ActionLinkRecord[]
  writing: readonly WritingContent[]
}

export type DiscoveryRouteKind =
  | "home"
  | "projectDetail"
  | "projects"
  | "writing"
  | "writingDetail"

export type DiscoveryRoute = {
  description: string
  href: string
  kind: DiscoveryRouteKind
  publishedAt?: string
  slug?: string
  title: string
}
