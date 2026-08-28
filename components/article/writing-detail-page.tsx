import type * as React from "react"

import { articleMDXComponents } from "@/components/article/article-mdx-components"
import { ArticleDetailChrome } from "@/components/article/article-detail-chrome"
import { PageActions } from "@/components/article/page-actions"
import { getMDXComponents } from "@/mdx-components"
import type { WritingMdxDocument } from "@/lib/content/writing-pages"
import { navigationIntentKeys } from "@/lib/navigation/navigation-intent"

type WritingDetailPageProps = {
  markdown?: string
  post: WritingMdxDocument
}

const writingDetailMDXComponents = getMDXComponents(articleMDXComponents)

export function WritingDetailPage({
  markdown,
  post,
}: WritingDetailPageProps): React.ReactElement {
  const MDXContent = post.body

  return (
    <ArticleDetailChrome
      backLink={{
        defaultHref: "/writing",
        intentKey: navigationIntentKeys.writingDetailBackHref,
      }}
      description={post.description}
      title={post.title}
      titleActions={<PageActions markdown={markdown} />}
      titleMeta={post.readingTime}
      toc={post.toc}
      tocLabel="Writing sections"
    >
      <MDXContent components={writingDetailMDXComponents} />
    </ArticleDetailChrome>
  )
}
