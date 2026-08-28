"use client"

import { useEffect, useRef, useState } from "react"
import type * as React from "react"

// Persists across client-side navigation. On return visits the stagger delays
// would feel like pure friction (no asset loading to mask them), so we skip.
let homepageSceneVisited = false

import { useInView } from "@/lib/motion/primitives"
import { useMediaQuery } from "@/hooks/use-media-query"

export type HomepageSceneKind = "body" | "header" | "surface" | "utility"
export type HomepageSceneMode = "timed" | "viewport"
export type HomepageSceneStyle = {
  filter?: string
  opacity: number
  transform?: string
}

const VIEWPORT_AMOUNT = 0.2
const VIEWPORT_MARGIN = "0px"
const HOMEPAGE_SCENE_EASE = [0.16, 1, 0.3, 1] as const
const HOMEPAGE_SCENE_BLUR = "4px"
const HOMEPAGE_SCENE_BLUR_NONE = "blur(0px)"

function getRevealDistance(kind: HomepageSceneKind): number {
  switch (kind) {
    case "header":
      return 6
    case "utility":
      return 4
    case "surface":
      return 8
    case "body":
    default:
      return 10
  }
}

function getRevealDuration(kind: HomepageSceneKind): number {
  switch (kind) {
    case "header":
      return 0.32
    case "utility":
      return 0.28
    case "surface":
      return 0.34
    case "body":
    default:
      return 0.38
  }
}

function getRevealTransform(kind: HomepageSceneKind): string {
  return `translateY(${getRevealDistance(kind)}px)`
}

function useSceneDelay(delayMs: number): boolean {
  const skipRef = useRef(homepageSceneVisited)
  const [sceneReady, setSceneReady] = useState(delayMs === 0 || skipRef.current)

  useEffect(() => {
    homepageSceneVisited = true
    if (delayMs === 0 || skipRef.current) return
    const timeout = window.setTimeout(() => setSceneReady(true), delayMs)
    return () => window.clearTimeout(timeout)
  }, [delayMs])

  return sceneReady
}

function getSceneStyles(
  kind: HomepageSceneKind,
  prefersReducedMotion: boolean,
  isPointerFine: boolean,
  isReady: boolean
): {
  animate: HomepageSceneStyle
  initial: HomepageSceneStyle
} {
  const withBlur = !prefersReducedMotion && kind !== "surface" && isPointerFine
  const hidden: HomepageSceneStyle = prefersReducedMotion
    ? { opacity: 0 }
    : {
        ...(withBlur ? { filter: `blur(${HOMEPAGE_SCENE_BLUR})` } : {}),
        opacity: 0,
        transform: getRevealTransform(kind),
      }

  return {
    animate: isReady
      ? prefersReducedMotion
        ? { opacity: 1 }
        : {
            ...(withBlur ? { filter: HOMEPAGE_SCENE_BLUR_NONE } : {}),
            opacity: 1,
            transform: "translateY(0px)",
          }
      : hidden,
    initial: hidden,
  }
}

function useHomepageSceneTransition(kind: HomepageSceneKind): {
  delay: number
  duration: number
  ease: typeof HOMEPAGE_SCENE_EASE
} {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return {
    delay: 0,
    duration: prefersReducedMotion ? 0.18 : getRevealDuration(kind),
    ease: HOMEPAGE_SCENE_EASE,
  }
}

export function useTimedHomepageSceneMotion(
  delayMs: number,
  kind: HomepageSceneKind
): readonly [
  HomepageSceneStyle,
  HomepageSceneStyle,
  { delay: number; duration: number; ease: typeof HOMEPAGE_SCENE_EASE },
] {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isPointerFine = useMediaQuery("(hover: hover) and (pointer: fine)")
  const sceneReady = useSceneDelay(delayMs)
  const transition = useHomepageSceneTransition(kind)
  const { animate, initial } = getSceneStyles(
    kind,
    prefersReducedMotion,
    isPointerFine,
    sceneReady
  )

  return [animate, initial, transition] as const
}

export function useViewportHomepageSceneMotion(
  delayMs: number,
  kind: HomepageSceneKind
): readonly [
  React.RefObject<HTMLDivElement | null>,
  HomepageSceneStyle,
  HomepageSceneStyle,
  { delay: number; duration: number; ease: typeof HOMEPAGE_SCENE_EASE },
] {
  const ref = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isPointerFine = useMediaQuery("(hover: hover) and (pointer: fine)")
  const sceneReady = useSceneDelay(delayMs)
  const isInView = useInView(ref, {
    amount: VIEWPORT_AMOUNT,
    margin: VIEWPORT_MARGIN,
    once: true,
  })
  const transition = useHomepageSceneTransition(kind)
  const { animate, initial } = getSceneStyles(
    kind,
    prefersReducedMotion,
    isPointerFine,
    sceneReady && isInView
  )

  return [ref, animate, initial, transition] as const
}
