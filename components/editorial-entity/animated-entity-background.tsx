"use client"

import type * as React from "react"

import {
  AnimatedBackground,
  type AnimatedBackgroundProps,
} from "@/components/editorial-entity/animated-background"
import {
  activeSurfaceStyle,
  surfaceBackgroundTransition,
} from "@/lib/motion/surface-motion"
import type { Transition } from "@/lib/motion/primitives"
import { cn } from "@/lib/utils"

type AnimatedEntityBackgroundProps = Omit<
  AnimatedBackgroundProps,
  "backgroundStyle" | "className" | "enableHover" | "transition"
> & {
  className?: string
  enableHover?: boolean
  transition?: Transition
}

export function AnimatedEntityBackground({
  className,
  enableHover = true,
  transition = surfaceBackgroundTransition,
  ...props
}: AnimatedEntityBackgroundProps): React.ReactElement {
  return (
    <AnimatedBackground
      backgroundStyle={activeSurfaceStyle}
      className={cn("rounded-lg", className)}
      enableHover={enableHover}
      transition={transition}
      {...props}
    />
  )
}
