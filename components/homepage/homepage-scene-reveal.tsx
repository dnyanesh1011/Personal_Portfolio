"use client"

import type * as React from "react"

import {
  type HomepageSceneKind,
  type HomepageSceneMode,
  useTimedHomepageSceneMotion,
  useViewportHomepageSceneMotion,
} from "@/components/homepage/homepage-scene-motion"
import { m } from "@/lib/motion/primitives"

type HomepageSceneRevealProps = {
  children: React.ReactNode
  className?: string
  delayMs?: number
  kind?: HomepageSceneKind
  mode?: HomepageSceneMode
}

export function HomepageSceneReveal({
  children,
  className,
  delayMs = 0,
  kind = "body",
  mode = "viewport",
}: HomepageSceneRevealProps): React.ReactElement {
  const [timedAnimate, timedInitial, timedTransition] =
    useTimedHomepageSceneMotion(delayMs, kind)
  const [viewportRef, viewportAnimate, viewportInitial, viewportTransition] =
    useViewportHomepageSceneMotion(delayMs, kind)

  if (mode === "timed") {
    return (
      <m.div
        animate={timedAnimate}
        className={className}
        initial={timedInitial}
        transition={timedTransition}
      >
        {children}
      </m.div>
    )
  }

  return (
    <m.div
      animate={viewportAnimate}
      className={className}
      initial={viewportInitial}
      ref={viewportRef}
      transition={viewportTransition}
    >
      {children}
    </m.div>
  )
}
