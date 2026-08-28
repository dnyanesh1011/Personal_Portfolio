"use client"

import { ActionLinkSet } from "@/components/action-link/action-link-set"
import type { ActionLinkRecord } from "@/lib/content/content-types"

type SocialLink = Pick<ActionLinkRecord, "href" | "kind" | "label">

export function SocialLinks({
  className,
  links,
}: {
  className?: string
  links: readonly SocialLink[]
}): React.ReactElement {
  return (
    <ActionLinkSet
      aria-label="Social links"
      className={className}
      items={links}
      variant="social"
    />
  )
}
