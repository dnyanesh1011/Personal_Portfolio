"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type * as React from "react"

import { AnimatedBackground } from "@/components/editorial-entity/animated-background"
import {
  buttonSize,
  iconSizeClass,
} from "@/components/action-link/icon-link-config"
import {
  type IconLinkButtonItem,
  type IconLinkHrefItem,
  type IconLinkItem,
  type IconLinkSize,
} from "@/components/action-link/icon-link"
import { IconLinkGroup } from "@/components/action-link/icon-link-group"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipCreateHandle,
  TooltipPopup,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  activeSurfaceStyle,
  surfaceBackgroundTransition,
} from "@/lib/motion/surface-motion"
import { cn } from "@/lib/utils"

function isPathActive(href: string, pathname: string): boolean {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(href + "/")
}

function getSharedClassName({
  itemClassName,
  size,
}: {
  itemClassName?: string
  size: IconLinkSize
}): string {
  return cn(
    buttonVariants({
      size: buttonSize[size],
      variant: "ghost",
    }),
    "transition-[color,scale] duration-150 ease-[var(--ease-interface)] hover:bg-transparent focus-visible:bg-transparent active:scale-[0.96] data-pressed:bg-transparent motion-reduce:active:scale-100",
    itemClassName,
  )
}

export function AnimatedIconLinkGroup({
  "aria-label": ariaLabel,
  as,
  backgroundClassName,
  className,
  itemClassName,
  items,
  onItemClick,
  showActiveRoute,
  size = "social",
  tooltipSideOffset = 4,
}: {
  "aria-label"?: string
  as?: "div" | "nav"
  backgroundClassName?: string
  className?: string
  itemClassName?: string
  items: readonly IconLinkItem[]
  onItemClick?: () => void
  showActiveRoute?: boolean
  size?: IconLinkSize
  tooltipSideOffset?: number
}): React.ReactElement {
  const tooltipHandle = useMemo(
    () => TooltipCreateHandle<React.ReactNode>(),
    [],
  )

  const pathname = usePathname()

  const iconRefs = useRef(new Map<string, HTMLSpanElement>())
  const resetTimeoutRef = useRef<number | null>(null)

  const updateMagnification = (clientX: number): void => {
    iconRefs.current.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const distance = Math.abs(clientX - centerX)

      const influence = Math.max(0, 1 - distance / 112)
      const scale = 1 + 0.32 * influence * influence

      element.style.transform = `scale(${scale})`
    })
  }

  const resetMagnification = (): void => {
    iconRefs.current.forEach((element) => {
      element.style.transform = "scale(1)"
    })
  }

  const handlePointerEnter = (
    event: React.PointerEvent<HTMLDivElement>,
  ): void => {
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }

    updateMagnification(event.clientX)
  }

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ): void => {
    updateMagnification(event.clientX)
  }

  const handlePointerLeave = (): void => {
    resetTimeoutRef.current = window.setTimeout(() => {
      resetMagnification()
      resetTimeoutRef.current = null
    }, 80)
  }

  const activeItemId = useMemo(() => {
    if (!showActiveRoute) return undefined

    const activeItem = items.find(
      (item) =>
        "href" in item &&
        typeof (item as IconLinkHrefItem).href === "string" &&
        (item as IconLinkHrefItem).href.startsWith("/") &&
        isPathActive((item as IconLinkHrefItem).href, pathname),
    )

    return activeItem ? (activeItem.id ?? activeItem.label) : undefined
  }, [showActiveRoute, items, pathname])

  const [pendingActiveId, setPendingActiveId] = useState<string | null>(null)

  // Derive during render: pending is effective until activeItemId catches up.
  const effectiveDefaultValue =
    pendingActiveId && pendingActiveId !== activeItemId
      ? pendingActiveId
      : activeItemId

  return (
    <IconLinkGroup
      aria-label={ariaLabel}
      as={as}
      className={cn(className, "gap-0")}
    >
      <AnimatedBackground
        backgroundStyle={activeSurfaceStyle}
        className={cn("rounded-lg", backgroundClassName)}
        defaultValue={effectiveDefaultValue}
        enableHover
        transition={surfaceBackgroundTransition}
      >
        {items.map((item) => {
          const itemId = item.id ?? item.label

          const isInternalLink =
            "href" in item &&
            typeof (item as IconLinkHrefItem).href === "string" &&
            (item as IconLinkHrefItem).href.startsWith("/")

          const isActive =
            showActiveRoute &&
            isInternalLink &&
            isPathActive((item as IconLinkHrefItem).href, pathname)

          const itemClass = cn(
            getSharedClassName({ itemClassName, size }),
            showActiveRoute &&
              isInternalLink &&
              !isActive &&
              "text-muted-foreground",
          )

          const icon = (
            <span
              className="inline-flex origin-center transition-transform duration-150 ease-out will-change-transform"
              ref={(element) => {
                if (element) {
                  iconRefs.current.set(itemId, element)
                } else {
                  iconRefs.current.delete(itemId)
                }
              }}
            >
              <item.icon
                aria-hidden="true"
                className={iconSizeClass[size]}
              />
            </span>
          )

          return (
            <div
              className="flex aspect-square cursor-pointer items-center justify-center rounded-full"
              data-id={itemId}
              key={itemId}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              onPointerMove={handlePointerMove}
            >
              <TooltipTrigger
                handle={tooltipHandle}
                payload={item.tooltip ?? item.label}
                render={
                  item.kind === "button" ? (
                    <button
                      aria-label={item.label}
                      className={itemClass}
                      onClick={(item as IconLinkButtonItem).onClick}
                      type="button"
                    >
                      {icon}
                    </button>
                  ) : (
                    <Link
                      aria-label={item.label}
                      className={itemClass}
                      href={(item as IconLinkHrefItem).href}
                      onClick={(e) => {
                        if (isInternalLink) {
                          setPendingActiveId(itemId)
                        }

                        onItemClick?.()
                        ;(item as IconLinkHrefItem).onClick?.(e)
                      }}
                      rel={
                        (item as IconLinkHrefItem).target === "_blank"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      target={(item as IconLinkHrefItem).target}
                    >
                      {icon}
                    </Link>
                  )
                }
              />
            </div>
          )
        })}
      </AnimatedBackground>

      <Tooltip handle={tooltipHandle}>
        {({ payload }) => (
          <TooltipPopup
            instantPosition={size === "dock"}
            sideOffset={tooltipSideOffset}
          >
            {payload}
          </TooltipPopup>
        )}
      </Tooltip>
    </IconLinkGroup>
  )
}