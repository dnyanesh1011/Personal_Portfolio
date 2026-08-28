import type { ProjectContent } from "@/lib/content/content-types"
import { getProjectMdxDocuments } from "@/lib/content/mdx-source"

export type ProjectMdxDocument = ReturnType<
  typeof getProjectMdxDocuments
>[number]

const projectPages = getProjectMdxDocuments().toSorted(
  (a, b) => a.order - b.order
)

const projectPagesBySlug = new Map(
  projectPages.map((project) => [project.slug, project])
)

export function getProjectPages(): readonly ProjectMdxDocument[] {
  return projectPages
}

export function getProjectPageBySlug(
  slug: string
): ProjectMdxDocument | undefined {
  return projectPagesBySlug.get(slug)
}

export function getProjectSummaries(): readonly ProjectContent[] {
  return getProjectPages().map((project) => ({
    name: project.title,
    slug: project.slug,
    summary: project.summary,
    href: `/projects/${project.slug}`,
    liveHref: project.liveHref,
    sourceHref: project.sourceHref ?? null,
    screenshotSrc: `/assets/projects/${project.slug}/${project.slug}-cover.webp`,
  }))
}
