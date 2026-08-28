import type * as React from "react"

import { SkeletonImage } from "@/components/ui/skeleton-image"
import { writingImageRatio } from "@/lib/content/writing-media"
import { cn } from "@/lib/utils"

type ArticleImageProps = {
  alt?: string
  className?: string
  src?: string
}

export function ArticleImage({
  alt = "",
  className,
  src,
}: ArticleImageProps): React.ReactElement | null {
  if (!src) {
    return null
  }

  return (
    <div
      className={cn(
        writingImageRatio.tailwindClass,
        "relative overflow-hidden rounded-lg outline outline-1 -outline-offset-1 outline-[rgba(0,0,0,0.10)] dark:outline-[rgba(255,255,255,0.10)]",
        className,
      )}
    >
      <SkeletonImage
        alt={alt}
        className="object-cover"
        fill
        sizes="(max-width: 768px) 100vw, 640px"
        src={src}
      />
    </div>
  )
}
