"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  IconCheckFilled,
  IconFileTextFilled,
  IconLinkFilled,
  type Icon as TablerIcon,
  type IconProps,
} from "@tabler/icons-react"
import type * as React from "react"

import { useSound } from "@web-kits/audio/react"

import { ActionLinkSet } from "@/components/action-link/action-link-set"
import type {
  IconLinkButtonItem,
  IconLinkSize,
} from "@/components/action-link/icon-link"
import { AnimatePresence, m } from "@/lib/motion/primitives"
import type { ActionLinkRecord } from "@/lib/content/content-types"
import { copy } from "@/lib/audio/minimal"

type PageActionId = "copy-markdown" | "copy-url"
type PageActionState = "idle" | "success" | "error"

type PageActionResult = "idle" | "success"

interface PageActionItem {
  action: () => Promise<PageActionResult>
  disabled?: boolean
  icon: TablerIcon
  id: PageActionId
  label: string
  successLabel: string
}

interface PageActionsProps {
  className?: string
  links?: readonly ActionLinkRecord[]
  markdown?: string
  size?: IconLinkSize
}

const resetDelay = 1600
const emptyLinks: readonly ActionLinkRecord[] = []
const iconEnter = {
  filter: "blur(0px)",
  opacity: 1,
  transform: "scale(1)",
  transition: { bounce: 0, duration: 0.18, type: "spring" },
} as const

const iconExit = {
  filter: "blur(2px)",
  opacity: 0,
  transform: "scale(0.85)",
  transition: { bounce: 0, duration: 0.1, type: "spring" },
} as const

const iconInitial = {
  filter: "blur(2px)",
  opacity: 0,
  transform: "scale(0.85)",
} as const

async function writeToClipboard(value: string): Promise<PageActionResult> {
  await navigator.clipboard.writeText(value)
  return "success"
}

function getPageUrl(): string {
  return window.location.href
}

function makeAnimatedSwapIcon(
  IdleIcon: TablerIcon,
  SuccessIcon: TablerIcon,
  isSuccessRef: React.MutableRefObject<boolean>
): TablerIcon {
  function AnimatedSwapIcon({ className, ...props }: IconProps) {
    return (
      <AnimatePresence initial={false} mode="popLayout">
        <m.span
          key={isSuccessRef.current ? "success" : "idle"}
          animate={iconEnter}
          className="inline-flex"
          exit={iconExit}
          initial={iconInitial}
        >
          {isSuccessRef.current ? (
            <SuccessIcon className={className} {...props} />
          ) : (
            <IdleIcon className={className} {...props} />
          )}
        </m.span>
      </AnimatePresence>
    )
  }
  return AnimatedSwapIcon
}

export function PageActions({
  className,
  links = emptyLinks,
  markdown,
  size = "projectAction",
}: PageActionsProps): React.ReactElement {
  const [actionState, setActionState] = useState<{
    id: PageActionId
    state: PageActionState
  } | null>(null)
  const playClick = useSound(copy)

  // Updated synchronously during render so stable icon components read the latest value
  const copyUrlSuccessRef = useRef(false)
  const copyMarkdownSuccessRef = useRef(false)
  copyUrlSuccessRef.current =
    actionState?.id === "copy-url" && actionState?.state === "success"
  copyMarkdownSuccessRef.current =
    actionState?.id === "copy-markdown" && actionState?.state === "success"

  // Stable component references — created once, AnimatePresence stays mounted
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const CopyUrlIcon = useMemo(
    () =>
      makeAnimatedSwapIcon(IconLinkFilled, IconCheckFilled, copyUrlSuccessRef),
    []
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const CopyMarkdownIcon = useMemo(
    () =>
      makeAnimatedSwapIcon(
        IconFileTextFilled,
        IconCheckFilled,
        copyMarkdownSuccessRef
      ),
    []
  )

  useEffect(() => {
    if (!actionState) {
      return
    }

    const timeout = window.setTimeout(() => {
      setActionState(null)
    }, resetDelay)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [actionState])

  async function runAction(item: PageActionItem): Promise<void> {
    if (item.disabled) {
      return
    }

    try {
      const result = await item.action()

      if (result === "success") {
        setActionState({ id: item.id, state: "success" })
      }
    } catch {
      setActionState({ id: item.id, state: "error" })
    }
  }

  const items: PageActionItem[] = [
    {
      action: () => writeToClipboard(getPageUrl()),
      icon: CopyUrlIcon,
      id: "copy-url",
      label: "Copy page URL",
      successLabel: "URL copied",
    },
    ...(markdown
      ? [
          {
            action: () => writeToClipboard(markdown),
            icon: CopyMarkdownIcon,
            id: "copy-markdown" as const,
            label: "Copy page as Markdown",
            successLabel: "Markdown copied",
          },
        ]
      : []),
  ]

  const liveMessage =
    actionState?.state === "success"
      ? items.find((item) => item.id === actionState.id)?.successLabel
      : actionState?.state === "error"
        ? "Action failed"
        : undefined

  const actionLinkItems: (ActionLinkRecord | IconLinkButtonItem)[] = [
    ...links,
    ...items.map((item) => {
      const isCurrent = actionState?.id === item.id
      const isSuccess = isCurrent && actionState.state === "success"
      const isError = isCurrent && actionState.state === "error"
      const label = isSuccess
        ? item.successLabel
        : isError
          ? "Action failed"
          : item.label

      return {
        icon: item.icon,
        id: item.id,
        kind: "button" as const,
        label,
        onClick: () => {
          playClick()
          void runAction(item)
        },
        tooltip: label,
      }
    }),
  ]

  return (
    <div className={className}>
      <ActionLinkSet
        aria-label="Page actions"
        items={actionLinkItems}
        size={size}
        variant="pageActions"
      />
      <output aria-live="polite" className="sr-only">
        {liveMessage}
      </output>
    </div>
  )
}
