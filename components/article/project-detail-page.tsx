import type * as React from "react"

import { ArticleDetailChrome } from "@/components/article/article-detail-chrome"
import { PageActions } from "@/components/article/page-actions"
import { ProjectMediaPlaceholder } from "@/components/editorial-entity/project-media-placeholder"
import { ProjectStack } from "@/components/editorial-entity/project-stack"
import { getMDXComponents } from "@/mdx-components"
import type { ProjectMdxDocument } from "@/lib/content/project-pages"
import { navigationIntentKeys } from "@/lib/navigation/navigation-intent"

type ProjectDetailPageProps = {
  markdown?: string
  project: ProjectMdxDocument
}

export function ProjectDetailPage({
  markdown,
  project,
}: ProjectDetailPageProps): React.ReactElement {
  const MDXContent = project.body
  const coverSrc = `/assets/projects/${project.slug}/${project.slug}-cover.webp`
  const projectDetailMDXComponents = getMDXComponents({
    ProjectMediaPlaceholder: (
      props: React.ComponentPropsWithoutRef<typeof ProjectMediaPlaceholder>
    ) => <ProjectMediaPlaceholder src={coverSrc} {...props} />,
    ProjectStack: () => <ProjectStack stack={project.stack} />,
  })
  return (
    <ArticleDetailChrome
      backLink={{
        defaultHref: "/projects",
        intentKey: navigationIntentKeys.projectDetailBackHref,
      }}
      bodyClassName="[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
      description={project.description}
      title={project.title}
      titleActions={
        <PageActions
          links={[
            {
              href: project.liveHref,
              kind: "projectLive",
              labelContext: project.title,
            },
            ...(project.sourceHref
              ? [
                  {
                    href: project.sourceHref,
                    kind: "projectSource" as const,
                    labelContext: project.title,
                  },
                ]
              : []),
          ]}
          markdown={markdown}
        />
      }
      toc={project.toc}
      tocLabel="Project sections"
    >
      <MDXContent components={projectDetailMDXComponents} />
    </ArticleDetailChrome>
  )
}
