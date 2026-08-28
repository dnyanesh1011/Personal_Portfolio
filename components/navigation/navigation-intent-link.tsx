"use client"

import Link from "next/link"
import type * as React from "react"
import { useSound } from "@web-kits/audio/react"

import {
  applyNavigationIntent,
  type NavigationIntentAction,
} from "@/lib/navigation/navigation-intent"
import { textStyles } from "@/lib/design/text-styles"
import { click } from "@/lib/audio/minimal"
import { cn } from "@/lib/utils"

type NavigationIntentLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  intent?: NavigationIntentAction | NavigationIntentAction[]
}

function applyNavigationIntents(
  intent: NavigationIntentLinkProps["intent"]
): void {
  if (!intent) {
    return
  }

  if (Array.isArray(intent)) {
    intent.forEach((action) => {
      applyNavigationIntent(action)
    })
    return
  }

  applyNavigationIntent(intent)
}

export function NavigationIntentLink({
  className,
  intent,
  onClick,
  ...props
}: NavigationIntentLinkProps): React.ReactElement {
  const playClick = useSound(click)

  return (
    <Link
      className={cn(textStyles.inlineMutedLink, className)}
      onClick={(event) => {
        playClick()
        applyNavigationIntents(intent)
        onClick?.(event)
      }}
      {...props}
    />
  )
}
