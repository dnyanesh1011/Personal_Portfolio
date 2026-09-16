"use client"

import * as React from "react"
import { IconMoon, IconSun } from "@tabler/icons-react"
import { useSound } from "@web-kits/audio/react"
import { useTheme } from "@teispace/next-themes"

import { ActionLinkSet } from "@/components/action-link/action-link-set"
import { Kbd } from "@/components/ui/kbd"
import type { IconLinkButtonItem } from "@/components/action-link/icon-link"
import type { ActionLinkRecord } from "@/lib/content/content-types"
import { click, toggleOff, toggleOn } from "@/lib/audio/minimal"
import { vibrate } from "@/lib/haptics"

const navigationItems = [
  {
    href: "/",
    kind: "home",
  },
  {
    href: "/projects",
    kind: "projects",
  },
] as const

const dockPillClassName =
  "pointer-events-auto flex items-center gap-1 rounded-full border border-border/40 bg-surface-floating/85 px-2 py-1 shadow-[var(--shadow-surface-floating)] backdrop-blur-md [&_a]:!flex [&_a]:!size-10 [&_a]:!items-center [&_a]:!justify-center [&_a]:!rounded-full [&_a]:!bg-transparent [&_a:hover]:!bg-foreground/10 [&_a:focus-visible]:!bg-foreground/10 [&_button]:!flex [&_button]:!size-10 [&_button]:!items-center [&_button]:!justify-center [&_button]:!rounded-full [&_button]:!bg-transparent [&_button:hover]:!bg-foreground/10 [&_button:focus-visible]:!bg-foreground/10 [&_svg]:!size-5"

// Static — hoisted so tooltip payload reference never changes between renders,
// preventing spurious store.set('payload') calls on every HomepageDock re-render.
type DockSocialLink = Pick<ActionLinkRecord, "href" | "kind" | "label">



export function HomepageDock({
  socialLinks,
}: {
  socialLinks: readonly DockSocialLink[]
}): React.ReactElement {
  const { resolvedTheme, setTheme } = useTheme()
  const playClick = useSound(click)
  const playToggleOn = useSound(toggleOn)
  const playToggleOff = useSound(toggleOff)

  // Ref so the click handler always reads the current theme without being listed
  // as a useMemo dependency — keeps themeItem stable across theme-change re-renders.
  const resolvedThemeRef = React.useRef(resolvedTheme)
  resolvedThemeRef.current = resolvedTheme

  const themeItem = React.useMemo<IconLinkButtonItem>(
    () => {
      const isDark = resolvedTheme === "dark"
      const label = isDark ? "Switch to light theme" : "Switch to dark theme"

      return {
        icon: isDark ? IconSun : IconMoon,
        id: "theme-toggle",
        kind: "button",
        label,
        onClick: () => {
          vibrate()

          if (resolvedThemeRef.current === "dark") {
            playToggleOn()
            setTheme("light")
          } else {
            playToggleOff()
            setTheme("dark")
          }
        },
        tooltip: (
          <span className="flex items-center gap-2">
            <span>{label}</span>
            <Kbd className="-mr-1">D</Kbd>
          </span>
        ),
      }
    },
    [resolvedTheme, setTheme, playToggleOn, playToggleOff],
  )

  const pill = (
    <ActionLinkSet
      as="div"
      className={dockPillClassName}
      items={[
        ...navigationItems,
        ...socialLinks.filter((item) =>
          ["github", "linkedin", "x", "email"].includes(item.kind),
        ),
        themeItem,
      ]}
      onItemClick={() => {
  vibrate()
  playClick()
}}
      variant="dock"
    />
  )

  return (
    <>
      {/*
        Progressive blur zone (pointer:fine / desktop only): 8 overlapping layers
        of increasing blur radius, each masked to a vertical band. Smooth gradient
        of blur intensity — 0.5px at top to 12px at bottom.
        8 layers = 8 serial GPU passes per scroll frame, which is too expensive
        on mobile. pointer:coarse devices get a CSS gradient fallback instead.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-auto fixed inset-x-0 bottom-0 z-[39] hidden h-20 sm:h-[4.75rem] [@media(pointer:fine)]:block"
      >
        <div className="absolute inset-0 backdrop-blur-[0.5px] [mask:linear-gradient(to_bottom,transparent_0%,black_12.5%,black_25%,transparent_37.5%)]" />
        <div className="absolute inset-0 backdrop-blur-[1px] [mask:linear-gradient(to_bottom,transparent_12.5%,black_25%,black_37.5%,transparent_50%)]" />
        <div className="absolute inset-0 backdrop-blur-[2px] [mask:linear-gradient(to_bottom,transparent_25%,black_37.5%,black_50%,transparent_62.5%)]" />
        <div className="absolute inset-0 backdrop-blur-[3px] [mask:linear-gradient(to_bottom,transparent_37.5%,black_50%,black_62.5%,transparent_75%)]" />
        <div className="absolute inset-0 backdrop-blur-[4px] [mask:linear-gradient(to_bottom,transparent_50%,black_62.5%,black_75%,transparent_87.5%)]" />
        <div className="absolute inset-0 backdrop-blur-[5px] [mask:linear-gradient(to_bottom,transparent_62.5%,black_75%,black_87.5%,transparent_100%)]" />
        <div className="absolute inset-0 backdrop-blur-[6px] [mask:linear-gradient(to_bottom,transparent_75%,black_87.5%,black_100%)]" />
        <div className="absolute inset-0 backdrop-blur-[12px] [mask:linear-gradient(to_bottom,transparent_87.5%,black_100%)]" />
      </div>

      {/* Mobile fallback (pointer:coarse): gradient fade — zero GPU compositing
          cost, same semantic signal as the blur zone. */}
      <div
        aria-hidden="true"
        className="pointer-events-auto fixed inset-x-0 bottom-0 z-[39] h-20 bg-gradient-to-t from-background to-transparent sm:h-[4.75rem] [@media(pointer:fine)]:hidden"
      />

      <nav
        aria-label="Primary navigation"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-6"
      >
        {pill}
      </nav>
    </>
  )
}