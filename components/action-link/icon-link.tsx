import type { Icon as TablerIcon } from "@tabler/icons-react"
import type * as React from "react"

export type IconLinkSize = "dock" | "projectAction" | "social"

type IconLinkBase = {
  icon: TablerIcon
  id?: string
  label: string
  tooltip?: React.ReactNode
}

export type IconLinkHrefItem = IconLinkBase & {
  href: string
  kind?: "link"
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  target?: string
}

export type IconLinkButtonItem = IconLinkBase & {
  kind: "button"
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type IconLinkItem = IconLinkHrefItem | IconLinkButtonItem
