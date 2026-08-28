import type * as React from "react"

import { cn } from "@/lib/utils"

export function EntityList({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): React.ReactElement {
  return <div className={cn("space-y-4", className)}>{children}</div>
}
