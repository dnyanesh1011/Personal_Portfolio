import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { WritingDetailPage } from "@/components/article/writing-detail-page"
import { HomepageDock } from "@/components/dock/homepage-dock"
import { HomepageFooter } from "@/components/homepage/homepage-footer"
import { PageContent, PageShell } from "@/components/homepage/homepage-layout"
import { StructuredData } from "@/components/metadata/structured-data"
import { createPageMarkdown } from "@/lib/content/page-markdown"
import { homepageContent } from "@/lib/content/content-discovery"
import {
  getWritingPageBySlug,
  getWritingPages,
} from "@/lib/content/writing-pages"
import { getWritingRouteMetadata } from "@/lib/metadata/site-metadata"
import {
  createBreadcrumbJsonLd,
  createWritingJsonLd,
} from "@/lib/metadata/structured-data"

type WritingPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams(): { slug: string }[] {
  return getWritingPages().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: WritingPageProps): Promise<Metadata> {
  const { slug } = await params
  return getWritingRouteMetadata(slug)
}

export default async function WritingPage({
  params,
}: WritingPageProps): Promise<React.ReactElement> {
  const { slug } = await params
  const post = getWritingPageBySlug(slug)

  if (!post) {
    notFound()
  }

  const { socialLinks } = homepageContent
  const markdown = createPageMarkdown({
    description: post.description,
    rawMdx: await post.getText("raw"),
    title: post.title,
  })

  return (
    <PageShell>
      <StructuredData
        data={[
          createWritingJsonLd(post),
          createBreadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Writing", href: "/writing" },
            { name: post.title, href: `/writing/${post.slug}` },
          ]),
        ]}
      />
      <PageContent>
        <WritingDetailPage markdown={markdown} post={post} />
      </PageContent>
      <HomepageDock socialLinks={socialLinks} />
      <HomepageFooter />
    </PageShell>
  )
}
