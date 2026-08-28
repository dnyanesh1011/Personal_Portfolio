"use client"

import { AnimatePresence, m, type Transition } from "@/lib/motion/primitives"
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  type SyntheticEvent,
} from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

type AnimatedBackgroundChildProps = {
  "data-active"?: "true" | "false"
  "data-id": string
  "data-checked"?: "true" | "false"
  children?: ReactNode
  className?: string
  onBlur?: (event: SyntheticEvent) => void
  onClick?: (event: SyntheticEvent) => void
  onFocus?: (event: SyntheticEvent) => void
  onMouseEnter?: (event: SyntheticEvent) => void
  onMouseLeave?: (event: SyntheticEvent) => void
  onPointerEnter?: (event: SyntheticEvent) => void
  onPointerLeave?: (event: SyntheticEvent) => void
}

type AnimatedBackgroundChild = ReactElement<AnimatedBackgroundChildProps>

export type AnimatedBackgroundProps = {
  backgroundStyle?: CSSProperties
  children: AnimatedBackgroundChild | AnimatedBackgroundChild[]
  className?: string
  defaultValue?: string
  enableHover?: boolean
  onValueChange?: (newActiveId: string | null) => void
  transition?: Transition
}

function composeEventHandler(
  userHandler: ((event: SyntheticEvent) => void) | undefined,
  handler: (event: SyntheticEvent) => void
) {
  return (event: SyntheticEvent) => {
    userHandler?.(event)

    if (!event.defaultPrevented) {
      handler(event)
    }
  }
}

function isMovingToSiblingItem(event: SyntheticEvent): boolean {
  if (!(event.currentTarget instanceof HTMLElement)) {
    return false
  }

  const relatedTarget =
    "relatedTarget" in event ? event.relatedTarget : undefined

  if (!(relatedTarget instanceof HTMLElement)) {
    return false
  }

  const nextItem = relatedTarget.closest("[data-id]")

  return nextItem?.parentElement === event.currentTarget.parentElement
}

const backgroundPresenceVariants = {
  animate: {
    opacity: 1,
  },
  exit: (isActiveWithinGroup: boolean) =>
    isActiveWithinGroup
      ? {}
      : {
          opacity: 0,
        },
  initial: {
    opacity: 0,
  },
} as const

export function AnimatedBackground({
  backgroundStyle,
  children,
  className,
  defaultValue,
  enableHover = false,
  onValueChange,
  transition,
}: AnimatedBackgroundProps): React.ReactElement {
  // Separate hover/click state from the defaultValue. Derived activeId falls
  // back to defaultValue when nothing is interacted with — this makes
  // defaultValue prop changes (e.g. route changes) reflect without an effect.
  const [hoverActiveId, setHoverActiveId] = useState<string | null>(null)
  const activeId = hoverActiveId ?? defaultValue ?? null
  const uniqueId = useId()
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)")
  const resolvedTransition = prefersReducedMotion ? { duration: 0 } : transition

  // Blocks handleInteractionStart briefly after the tab regains visibility to
  // suppress synthetic pointerenter events Chrome fires on tab focus.
  const blockActivationRef = useRef(false)
  const onValueChangeRef = useRef(onValueChange)
  onValueChangeRef.current = onValueChange
  const defaultValueRef = useRef(defaultValue)
  defaultValueRef.current = defaultValue

  // Debounce the end of interaction to absorb the brief moment when the cursor
  // passes through the tooltip portal (which has no [data-id] ancestor) while
  // moving between adjacent items. Without this, isMovingToSiblingItem() returns
  // false for the portal case and the background highlight incorrectly resets.
  const interactionEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  const handleInteractionStart = (id: string) => {
    if (blockActivationRef.current) return
    if (interactionEndTimerRef.current !== null) {
      clearTimeout(interactionEndTimerRef.current)
      interactionEndTimerRef.current = null
    }
    setHoverActiveId(id)
    onValueChange?.(id)
  }

  const handleInteractionEnd = () => {
    interactionEndTimerRef.current = setTimeout(() => {
      interactionEndTimerRef.current = null
      setHoverActiveId(null)
      onValueChangeRef.current?.(defaultValueRef.current ?? null)
    }, 50)
  }

  useEffect(() => {
    let unblockTimer: ReturnType<typeof setTimeout> | null = null

    function onVisibilityChange() {
      if (document.hidden) {
        if (unblockTimer) clearTimeout(unblockTimer)
        if (interactionEndTimerRef.current !== null) {
          clearTimeout(interactionEndTimerRef.current)
          interactionEndTimerRef.current = null
        }
        setHoverActiveId(null)
        onValueChangeRef.current?.(defaultValueRef.current ?? null)
      } else {
        blockActivationRef.current = true
        unblockTimer = setTimeout(() => {
          blockActivationRef.current = false
        }, 100)
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
      if (unblockTimer) clearTimeout(unblockTimer)
      if (interactionEndTimerRef.current !== null) {
        clearTimeout(interactionEndTimerRef.current)
      }
    }
  }, [])

  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement<AnimatedBackgroundChildProps>(child)) {
          return child
        }

        const id = child.props["data-id"]
        const isActive = activeId === id
        const interactionProps = !enableHover
          ? {
              onClick: composeEventHandler(child.props.onClick, () =>
                handleInteractionStart(id)
              ),
            }
          : canHover
            ? {
                onBlur: composeEventHandler(child.props.onBlur, (event) => {
                  if (!isMovingToSiblingItem(event)) {
                    handleInteractionEnd()
                  }
                }),
                onFocus: composeEventHandler(child.props.onFocus, () =>
                  handleInteractionStart(id)
                ),
                onPointerEnter: composeEventHandler(
                  child.props.onPointerEnter,
                  () => handleInteractionStart(id)
                ),
                onPointerLeave: composeEventHandler(
                  child.props.onPointerLeave,
                  (event) => {
                    if (!isMovingToSiblingItem(event)) {
                      handleInteractionEnd()
                    }
                  }
                ),
              }
            : {}

        return cloneElement(
          child,
          {
            className: cn("relative", child.props.className),
            "data-active": activeId ? "true" : "false",
            "data-checked": isActive ? "true" : "false",
            key: id,
            ...interactionProps,
          },
          <>
            <AnimatePresence custom={activeId !== null} initial={false}>
              {activeId !== null ? (
                <m.div
                  aria-hidden="true"
                  animate="animate"
                  className="pointer-events-none absolute inset-0"
                  custom={activeId !== null}
                  exit="exit"
                  initial={prefersReducedMotion ? false : "initial"}
                  key="background-presence"
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  variants={backgroundPresenceVariants}
                >
                  {isActive ? (
                    <m.div
                      className={cn("pointer-events-none size-full", className)}
                      layoutId={`background-${uniqueId}`}
                      style={backgroundStyle}
                      transition={canHover ? resolvedTransition : { duration: 0 }}
                    />
                  ) : null}
                </m.div>
              ) : null}
            </AnimatePresence>
            {child.props.children}
          </>
        )
      })}
    </>
  )
}
