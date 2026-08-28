import type {
  DiscoveryRoute,
  HomepageContent,
} from "@/lib/content/content-types"
import { siteIdentity, socialLinks } from "@/lib/content/identity"
import { getProjectPages } from "@/lib/content/project-pages"
import { projects } from "@/lib/content/projects"
import {
  getFeaturedWritingSummaries,
  getWritingPages,
} from "@/lib/content/writing-pages"

const homepageCopy = {
  about:
    "I build frontend systems with React and Next.js, with a focus on structure, interface quality, and careful execution.\n\nI like taking products from raw ideas to polished interfaces, keeping the design process and code quality close together.\n\nBased in Cairo, Egypt.",
  approach:
    "I spend most of my time building with React and Next.js. For smaller client-side products, I’ll often use Vite. When a product needs stronger routing, content, SEO, or backend work, I usually reach for Next.js with Supabase and Postgres.\n\nOn the interface side, I work with shadcn/ui, coss UI, Base UI, and Radix. The choice depends on how much control the project needs, and how close I need to stay to the primitives.",
}

const rootDiscoveryRoutes = [
  {
    kind: "home",
    href: "/",
    title: `${siteIdentity.name} | Frontend Developer`,
    description:
      "Frontend developer based in Cairo, Egypt. I build React and Next.js products with close attention to interface quality, architecture, and performance.",
  },
  {
    kind: "projects",
    href: "/projects",
    title: "Projects",
    description:
      "Selected frontend projects by Dnyanesh Fulsundar: React and Next.js products built with Supabase, TypeScript, and Tailwind CSS, focused on interface craft and scalable systems.",
  },
  {
    kind: "writing",
    href: "/writing",
    title: "Writing",
    description:
      "Frontend engineering notes by Dnyanesh Fulsundar on React patterns, Next.js architecture, interface design decisions, and the implementation details that change how a product feels.",
  },
] satisfies readonly DiscoveryRoute[]

const projectDetailDiscoveryRoutes = getProjectPages().map((project) => ({
  kind: "projectDetail",
  href: `/projects/${project.slug}`,
  title: project.title,
  description: project.description,
  publishedAt: project.publishedAt,
  slug: project.slug,
})) satisfies readonly DiscoveryRoute[]

const writingDetailDiscoveryRoutes = getWritingPages().map((post) => ({
  kind: "writingDetail",
  href: `/writing/${post.slug}`,
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  slug: post.slug,
})) satisfies readonly DiscoveryRoute[]

const discoveryRoutes = [
  ...rootDiscoveryRoutes,
  ...projectDetailDiscoveryRoutes,
  ...writingDetailDiscoveryRoutes,
] satisfies readonly DiscoveryRoute[]

function getHomepageContent(): HomepageContent {
  return {
    ...homepageCopy,
    identity: siteIdentity,
    projects: projects.slice(0, 4),
    socialLinks,
    writing: getFeaturedWritingSummaries(2),
  }
}

export function getDiscoveryRoutes(): readonly DiscoveryRoute[] {
  return discoveryRoutes
}

export function getProjectDiscoveryRoutes(): readonly DiscoveryRoute[] {
  return projectDetailDiscoveryRoutes
}

export function getWritingDiscoveryRoutes(): readonly DiscoveryRoute[] {
  return writingDetailDiscoveryRoutes
}

export function getDiscoveryRouteByHref(
  href: string
): DiscoveryRoute | undefined {
  return discoveryRoutes.find((route) => route.href === href)
}

export function getProjectDiscoveryRouteBySlug(
  slug: string
): DiscoveryRoute | undefined {
  return projectDetailDiscoveryRoutes.find((route) => route.slug === slug)
}

export function getWritingDiscoveryRouteBySlug(
  slug: string
): DiscoveryRoute | undefined {
  return writingDetailDiscoveryRoutes.find((route) => route.slug === slug)
}

export const homepageContent = getHomepageContent()
