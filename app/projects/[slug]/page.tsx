import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectDetailPage } from "@/components/article/project-detail-page"
import { HomepageDock } from "@/components/dock/homepage-dock"
import { HomepageFooter } from "@/components/homepage/homepage-footer"
import { PageContent, PageShell } from "@/components/homepage/homepage-layout"
import { StructuredData } from "@/components/metadata/structured-data"
import {
  getProjectPageBySlug,
  getProjectPages,
} from "@/lib/content/project-pages"
import { createPageMarkdown } from "@/lib/content/page-markdown"
import { homepageContent } from "@/lib/content/content-discovery"
import { getProjectRouteMetadata } from "@/lib/metadata/site-metadata"
import {
  createBreadcrumbJsonLd,
  createProjectJsonLd,
} from "@/lib/metadata/structured-data"

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams(): { slug: string }[] {
  return getProjectPages().map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  return getProjectRouteMetadata(slug)
}

export default async function ProjectPage({
  params,
}: ProjectPageProps): Promise<React.ReactElement> {
  const { slug } = await params
  const project = getProjectPageBySlug(slug)

  if (!project) {
    notFound()
  }

  const { socialLinks } = homepageContent
  const markdown = createPageMarkdown({
    description: project.description,
    rawMdx: await project.getText("raw"),
    title: project.title,
  })

  return (
    <PageShell>
      <StructuredData
        data={[
          createProjectJsonLd(project),
          createBreadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: project.title, href: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <PageContent>
        <ProjectDetailPage markdown={markdown} project={project} />
      </PageContent>
      <HomepageDock socialLinks={socialLinks} />
      <HomepageFooter />
    </PageShell>
  )
}
