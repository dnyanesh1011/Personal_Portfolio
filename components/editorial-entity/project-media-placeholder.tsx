import { SkeletonImage } from "@/components/ui/skeleton-image"
import type * as React from "react"

import { textStyles } from "@/lib/design/text-styles"
import { cn } from "@/lib/utils"

export function ProjectMediaPlaceholder({
  caption,
  className,
  label = "Project screenshot placeholder",
  priority,
  src,
}: {
  caption?: string
  className?: string
  label?: string
  priority?: boolean
  src?: string
}): React.ReactElement {
  return (
    <figure className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative aspect-[3/2] overflow-hidden rounded-lg shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
          !src &&
            cn("grid place-items-center bg-muted", textStyles.smallDescription)
        )}
      >
        {src ? (
          <SkeletonImage
            alt={label}
            className="object-cover"
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 65ch"
            src={src}
          />
        ) : (
          label
        )}
      </div>
      {caption ? (
        <figcaption className={textStyles.smallDescription}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
