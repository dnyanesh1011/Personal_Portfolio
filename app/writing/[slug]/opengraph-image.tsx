import { notFound } from "next/navigation"

import { getWritingPageBySlug, getWritingPages } from "@/lib/content/writing-pages"
import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/lib/metadata/og-image"

export function generateStaticParams(): { slug: string }[] {
  return getWritingPages().map((post) => ({
    slug: post.slug,
  }))
}

export const alt = "Writing"
export const size = ogImageSize
export const contentType = ogImageContentType

type WritingOgImageProps = {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: WritingOgImageProps) {
  const { slug } = await params
  const post = getWritingPageBySlug(slug)

  if (!post) {
    notFound()
  }

  return renderOgImage({ kicker: "Writing", title: post.title })
}
