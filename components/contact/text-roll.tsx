"use client"

import type * as React from "react"
import { useState } from "react"

import { m, type Transition } from "@/lib/motion/primitives"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

type TextRollProps = {
  className?: string
  direction?: "backward" | "forward"
  duration?: number
  getEnterDelay?: (index: number) => number
  getExitDelay?: (index: number) => number
  reserveText?: string
  text: string
  transition?: Transition
}

const forwardEnter = {
  initial: { opacity: 0, transform: "translateY(14px)" },
  animate: { opacity: 1, transform: "translateY(0px)" },
} as const

const forwardExit = {
  initial: { opacity: 1, transform: "translateY(0px)" },
  animate: { opacity: 0, transform: "translateY(-8px)" },
} as const

const backwardEnter = {
  initial: { opacity: 0, transform: "translateY(-14px)" },
  animate: { opacity: 1, transform: "translateY(0px)" },
} as const

const backwardExit = {
  initial: { opacity: 1, transform: "translateY(0px)" },
  animate: { opacity: 0, transform: "translateY(8px)" },
} as const

export function TextRoll({
  className,
  direction = "forward",
  duration = 0.18,
  getEnterDelay = (index) => index * 0.03,
  getExitDelay = (index) => index * 0.002,
  reserveText,
  text,
  transition = { ease: [0.18, 1, 0.32, 1] },
}: TextRollProps): React.ReactElement {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const resolvedReserveText = reserveText ?? text
  const [rollState, setRollState] = useState({
    previousText: text,
    text,
  })

  let previousText = rollState.previousText
  let currentText = rollState.text

  if (currentText !== text) {
    previousText = currentText
    currentText = text

    setRollState({
      previousText,
      text: currentText,
    })
  }

  const letters = Array.from(currentText)
  const previousLetters = Array.from(previousText)
  const hasTextChanged = previousText !== currentText
  const enterStartDelay = hasTextChanged
    ? Math.min(0.095, previousLetters.length * 0.002 + 0.055)
    : 0
  const enterVariant = direction === "backward" ? backwardEnter : forwardEnter
  const exitVariant = direction === "backward" ? backwardExit : forwardExit

  if (prefersReducedMotion) {
    return (
      <span className={cn("relative inline-grid whitespace-pre", className)}>
        <span aria-hidden="true" className="invisible">
          {resolvedReserveText}
        </span>
        <span className="absolute inset-0">{currentText}</span>
      </span>
    )
  }

  return (
    <span className={cn("relative inline-grid whitespace-pre", className)}>
      <span aria-hidden="true" className="invisible">
        {resolvedReserveText}
      </span>
      <span className="absolute inset-0 overflow-hidden" key={currentText}>
        {hasTextChanged && (
          <span
            aria-hidden="true"
            className="absolute inset-0 whitespace-pre"
            key={`exit-${previousText}`}
          >
            {previousLetters.map((letter, index) => {
              const character = letter === " " ? "\u00A0" : letter

              return (
                <span
                  className="relative inline-block overflow-hidden"
                  key={`${letter}-${index}`}
                >
                  <m.span
                    animate={exitVariant.animate}
                    className="inline-block"
                    initial={exitVariant.initial}
                    transition={{
                      duration: 0.08,
                      ease: [0.18, 1, 0.32, 1],
                      delay: getExitDelay(index),
                    }}
                  >
                    {character}
                  </m.span>
                </span>
              )
            })}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 whitespace-pre"
          key={`enter-${currentText}`}
        >
          {letters.map((letter, index) => {
            const character = letter === " " ? "\u00A0" : letter

            return (
              <span
                className="relative inline-block overflow-hidden"
                key={`${letter}-${index}`}
              >
                <m.span
                  animate={
                    hasTextChanged
                      ? enterVariant.animate
                      : { opacity: 1, transform: "translateY(0px)" }
                  }
                  className="inline-block"
                  initial={
                    hasTextChanged
                      ? enterVariant.initial
                      : { opacity: 1, transform: "translateY(0px)" }
                  }
                  transition={{
                    ...transition,
                    duration,
                    delay: enterStartDelay + getEnterDelay(index),
                  }}
                >
                  {character}
                </m.span>
              </span>
            )
          })}
        </span>
      </span>
      <span className="sr-only">{currentText}</span>
    </span>
  )
}
