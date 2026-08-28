import { notFound } from "next/navigation"

import { getProjectPageBySlug, getProjectPages } from "@/lib/content/project-pages"
import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/lib/metadata/og-image"

export function generateStaticParams(): { slug: string }[] {
  return getProjectPages().map((project) => ({
    slug: project.slug,
  }))
}

export const alt = "Project"
export const size = ogImageSize
export const contentType = ogImageContentType

type ProjectOgImageProps = {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: ProjectOgImageProps) {
  const { slug } = await params
  const project = getProjectPageBySlug(slug)

  if (!project) {
    notFound()
  }

  return renderOgImage({ kicker: "Project", title: project.title })
}
