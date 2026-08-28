"use client"

import { useEffect, useRef, useState } from "react"
import { useSound } from "@web-kits/audio/react"

import { copy } from "@/lib/audio/minimal"
import { AnimatedEntityBackground } from "@/components/editorial-entity/animated-entity-background"
import { TextRoll } from "@/components/contact/text-roll"
import { useMediaQuery } from "@/hooks/use-media-query"
import { textStyles } from "@/lib/design/text-styles"
import { cn } from "@/lib/utils"

type CopyState = "copied" | "error" | "idle"
type CopyFeedback = {
  state: CopyState
  token: number
}

const DESKTOP_IDLE_LABEL = "Want to get in touch?"
const DESKTOP_HOVER_LABEL = "Click to copy"
const TOUCH_IDLE_LABEL = "Want to get in touch? Click to copy."
const COPIED_LABEL = "Copied"
const ERROR_LABEL = "Copy failed"
const LONGEST_LABEL = TOUCH_IDLE_LABEL
const SURFACE_ID = "email-copy-button"

export function EmailCopyButton({
  email,
}: {
  email: string
}): React.ReactElement {
  const copyRequestId = useRef(0)
  const [copyFeedback, setCopyFeedback] = useState<CopyFeedback>({
    state: "idle",
    token: 0,
  })
  const playClick = useSound(copy)
  const [isHintVisible, setIsHintVisible] = useState(false)
  const supportsHover = useMediaQuery("(hover: hover) and (pointer: fine)")
  const copyState = copyFeedback.state

  useEffect(() => {
    if (copyFeedback.state === "idle") {
      return
    }

    const timeout = window.setTimeout(() => {
      setIsHintVisible(false)
      setCopyFeedback((currentFeedback) => ({
        state: "idle",
        token: currentFeedback.token,
      }))
    }, 1600)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [copyFeedback])

  function copyEmail(): void {
    playClick()
    const requestId = copyRequestId.current + 1
    copyRequestId.current = requestId

    void navigator.clipboard
      .writeText(email)
      .then(() => {
        if (copyRequestId.current !== requestId) {
          return
        }

        setCopyFeedback((currentFeedback) => ({
          state: "copied",
          token: currentFeedback.token + 1,
        }))
      })
      .catch(() => {
        if (copyRequestId.current !== requestId) {
          return
        }

        setCopyFeedback((currentFeedback) => ({
          state: "error",
          token: currentFeedback.token + 1,
        }))
      })
  }

  const label =
    copyState === "copied"
      ? COPIED_LABEL
      : copyState === "error"
        ? ERROR_LABEL
        : supportsHover
          ? isHintVisible
            ? DESKTOP_HOVER_LABEL
            : DESKTOP_IDLE_LABEL
          : TOUCH_IDLE_LABEL
  const rollDirection =
    label === DESKTOP_HOVER_LABEL ||
    label === COPIED_LABEL ||
    label === ERROR_LABEL
      ? "forward"
      : "backward"

  return (
    <div className="flex flex-col items-center gap-3">
      <TextRoll
        className={cn(
          textStyles.entityDescription,
          "min-h-7 overflow-hidden text-center"
        )}
        direction={rollDirection}
        duration={0.12}
        getEnterDelay={(i) => i * 0.005}
        reserveText={LONGEST_LABEL}
        text={label}
      />
      <AnimatedEntityBackground
        className="rounded-lg"
        defaultValue={SURFACE_ID}
        enableHover={false}
      >
        <div className="p-0.5" data-id={SURFACE_ID}>
          <button
            aria-describedby="email-copy-status"
            aria-label={`Copy email address ${email}`}
            className="min-w-64 cursor-pointer rounded-md px-5 py-3 text-center text-base font-semibold text-foreground transition-[color,scale] duration-150 ease-[var(--ease-interface)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background active:scale-[0.96] motion-reduce:active:scale-100 sm:min-w-72"
            onBlur={() => setIsHintVisible(false)}
            onClick={copyEmail}
            onFocus={() => {
              if (supportsHover && copyState === "idle") {
                setIsHintVisible(true)
              }
            }}
            onMouseEnter={() => {
              if (supportsHover && copyState === "idle") {
                setIsHintVisible(true)
              }
            }}
            onMouseLeave={() => setIsHintVisible(false)}
            type="button"
          >
            <span>{email}</span>
          </button>
        </div>
      </AnimatedEntityBackground>
      <output
        aria-live="polite"
        className="sr-only"
        id="email-copy-status"
        key={`${copyFeedback.state}-${copyFeedback.token}`}
      >
        {copyState === "copied"
          ? `${email} copied to clipboard.`
          : copyState === "error"
            ? `Copy failed for ${email}.`
            : ""}
      </output>
    </div>
  )
}
