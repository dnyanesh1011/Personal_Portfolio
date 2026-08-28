"use client"

import type * as React from "react"

import {
  type HomepageSceneKind,
  type HomepageSceneMode,
  useTimedHomepageSceneMotion,
  useViewportHomepageSceneMotion,
} from "@/components/homepage/homepage-scene-motion"
import { m } from "@/lib/motion/primitives"
import { cn } from "@/lib/utils"

type HomepageSceneSurfaceProps = {
  "data-active"?: "true" | "false"
  "data-checked"?: "true" | "false"
  "data-id": string
  children?: React.ReactNode
  className?: string
  delayMs?: number
  kind?: HomepageSceneKind
  mode?: HomepageSceneMode
  onBlur?: React.FocusEventHandler<HTMLDivElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onFocus?: React.FocusEventHandler<HTMLDivElement>
  onPointerEnter?: React.PointerEventHandler<HTMLDivElement>
  onPointerLeave?: React.PointerEventHandler<HTMLDivElement>
  style?: React.CSSProperties
}

export function HomepageSceneSurface({
  children,
  className,
  delayMs = 0,
  kind = "surface",
  mode = "viewport",
  ...props
}: HomepageSceneSurfaceProps): React.ReactElement {
  const [timedAnimate, timedInitial, timedTransition] =
    useTimedHomepageSceneMotion(delayMs, kind)
  const [viewportRef, viewportAnimate, viewportInitial, viewportTransition] =
    useViewportHomepageSceneMotion(delayMs, kind)

  if (mode === "timed") {
    return (
      <m.div
        animate={timedAnimate}
        initial={timedInitial}
        transition={timedTransition}
      >
        <div {...props} className={cn(className)}>
          {children}
        </div>
      </m.div>
    )
  }

  return (
    <m.div
      animate={viewportAnimate}
      initial={viewportInitial}
      ref={viewportRef}
      transition={viewportTransition}
    >
      <div {...props} className={cn(className)}>
        {children}
      </div>
    </m.div>
  )
}
