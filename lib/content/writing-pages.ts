import type { WritingContent } from "@/lib/content/content-types"
import { getWritingMdxDocuments } from "@/lib/content/mdx-source"

export type WritingMdxDocument = ReturnType<
  typeof getWritingMdxDocuments
>[number]

const writingPages = getWritingMdxDocuments().toSorted(
  (a, b) => a.order - b.order
)

const writingPagesBySlug = new Map(
  writingPages.map((post) => [post.slug, post])
)

export function getWritingPages(): readonly WritingMdxDocument[] {
  return writingPages
}

export function getWritingPageBySlug(
  slug: string
): WritingMdxDocument | undefined {
  return writingPagesBySlug.get(slug)
}

export function getWritingSummaries(): readonly WritingContent[] {
  return getWritingPages().map((post) => ({
    category: post.category,
    excerpt: post.excerpt,
    featured: post.featured,
    href: `/writing/${post.slug}`,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    slug: post.slug,
    title: post.title,
    updatedAt: post.updatedAt,
  }))
}

export function getFeaturedWritingSummaries(
  limit = 3
): readonly WritingContent[] {
  return getWritingSummaries()
    .filter((post) => post.featured)
    .slice(0, limit)
}
