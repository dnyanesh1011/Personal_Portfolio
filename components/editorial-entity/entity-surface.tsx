import type { VariantProps } from "class-variance-authority"
import type * as React from "react"

import { entitySurfaceVariants } from "@/components/editorial-entity/entity-surface-variants"
import { cn } from "@/lib/utils"

type EntitySurfaceProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof entitySurfaceVariants> & {
    as?: "article" | "div"
  }

export function EntitySurface({
  as: Component = "div",
  className,
  inset,
  interaction,
  ...props
}: EntitySurfaceProps): React.ReactElement {
  return (
    <Component
      className={cn(entitySurfaceVariants({ inset, interaction }), className)}
      {...props}
    />
  )
}
