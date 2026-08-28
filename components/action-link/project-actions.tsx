"use client"

import { ActionLinkSet } from "@/components/action-link/action-link-set"

export function ProjectActions({
  liveHref,
  projectName,
  sourceHref,
}: {
  liveHref: string
  projectName: string
  sourceHref: string | null
}): React.ReactElement {
  return (
    <ActionLinkSet
      aria-label={`${projectName} links`}
      items={[
        {
          href: liveHref,
          kind: "projectLive",
          labelContext: projectName,
        },
        ...(sourceHref
          ? [
              {
                href: sourceHref,
                kind: "projectSource" as const,
                labelContext: projectName,
              },
            ]
          : []),
      ]}
      variant="projectActions"
    />
  )
}
