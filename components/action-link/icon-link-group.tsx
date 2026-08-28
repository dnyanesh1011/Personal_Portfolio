"use client"

import type * as React from "react"

import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function IconLinkGroup({
  "aria-label": ariaLabel,
  as: Component = "nav",
  children,
  className,
}: {
  "aria-label"?: string
  as?: "div" | "nav"
  children: React.ReactNode
  className?: string
}): React.ReactElement {
  return (
    <TooltipProvider closeDelay={180} delay={80} timeout={900}>
      <Component
        aria-label={ariaLabel}
        className={cn("flex flex-wrap items-center gap-1", className)}
      >
        {children}
      </Component>
    </TooltipProvider>
  )
}
