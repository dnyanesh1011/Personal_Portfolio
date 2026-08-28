import { Suspense } from "react"
import type * as React from "react"
import type { TOCItemType } from "fumadocs-core/toc"

import { ArticleToc } from "@/components/article/article-toc"
import { StoredBackLink } from "@/components/navigation/stored-back-link"
import { textStyles } from "@/lib/design/text-styles"
import type { NavigationIntentKey } from "@/lib/navigation/navigation-intent"
import { cn } from "@/lib/utils"

type ArticleDetailChromeProps = {
  backLink: {
    defaultHref: string
    intentKey: NavigationIntentKey
  }
  bodyClassName?: string
  children: React.ReactNode
  description: string
  title: string
  titleActions?: React.ReactNode
  titleMeta?: React.ReactNode
  toc: readonly TOCItemType[]
  tocLabel: string
}

export function ArticleDetailChrome({
  backLink,
  bodyClassName,
  children,
  description,
  title,
  titleActions,
  titleMeta,
  toc,
  tocLabel,
}: ArticleDetailChromeProps): React.ReactElement {
  return (
    <>
      <ArticleToc aria-label={tocLabel} toc={toc} />
      <article className="space-y-14 pt-4 sm:pt-8">
        <header className="space-y-6">
          <div className="flex items-center gap-4">
            <Suspense fallback={null}>
              <StoredBackLink
                defaultHref={backLink.defaultHref}
                intentKey={backLink.intentKey}
              />
            </Suspense>
            {titleActions ? (
              <div className="ml-auto">{titleActions}</div>
            ) : null}
          </div>

          <div className="space-y-3">
            {titleMeta ? (
              <p className={textStyles.metadata}>{titleMeta}</p>
            ) : null}
            <h1 className={cn(textStyles.detailTitle, "min-w-0")}>{title}</h1>
            <p className={textStyles.pageDescription}>{description}</p>
          </div>
        </header>

        <div className={cn(textStyles.articleBody, bodyClassName)}>
          {children}
        </div>
      </article>
    </>
  )
}
