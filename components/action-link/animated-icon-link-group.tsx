"use client"

import { useMemo, useState } from "react"
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
    itemClassName
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
    []
  )

  const pathname = usePathname()

  const activeItemId = useMemo(() => {
    if (!showActiveRoute) return undefined
    const activeItem = items.find(
      (item) =>
        "href" in item &&
        typeof (item as IconLinkHrefItem).href === "string" &&
        (item as IconLinkHrefItem).href.startsWith("/") &&
        isPathActive((item as IconLinkHrefItem).href, pathname)
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
              "text-muted-foreground"
          )

          return (
            <div
              className="cursor-pointer"
              data-id={item.id ?? item.label}
              key={item.id ?? item.label}
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
                      <item.icon
                        aria-hidden="true"
                        className={iconSizeClass[size]}
                      />
                    </button>
                  ) : (
                    <Link
                      aria-label={item.label}
                      className={itemClass}
                      href={(item as IconLinkHrefItem).href}
                      onClick={(e) => {
                        if (isInternalLink) {
                          setPendingActiveId(item.id ?? item.label)
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
                      <item.icon
                        aria-hidden="true"
                        className={iconSizeClass[size]}
                      />
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
          <TooltipPopup sideOffset={tooltipSideOffset}>{payload}</TooltipPopup>
        )}
      </Tooltip>
    </IconLinkGroup>
  )
}
