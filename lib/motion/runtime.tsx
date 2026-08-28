"use client"

import { LazyMotion } from "motion/react"
import type * as React from "react"

const loadDomAnimationFeatures = () =>
  import("@/lib/motion/features/dom-animation").then((module) => module.default)

const loadDomMaxFeatures = () =>
  import("@/lib/motion/features/dom-max").then((module) => module.default)

function MotionDomAnimationProvider({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <LazyMotion features={loadDomAnimationFeatures} strict>
      {children}
    </LazyMotion>
  )
}

export function MotionDomMaxProvider({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <LazyMotion features={loadDomMaxFeatures} strict>
      {children}
    </LazyMotion>
  )
}
