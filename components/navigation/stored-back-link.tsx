"use client"

import { useCallback, useSyncExternalStore } from "react"
import Link from "next/link"
import type * as React from "react"
import { useSound } from "@web-kits/audio/react"

import { textStyles } from "@/lib/design/text-styles"
import { click } from "@/lib/audio/minimal"
import {
  type NavigationIntentKey,
  readNavigationIntent,
} from "@/lib/navigation/navigation-intent"

type StoredBackLinkProps = {
  defaultHref?: string
  intentKey: NavigationIntentKey
  showWithoutStoredHref?: boolean
}

function subscribeToNavigationIntent(): () => void {
  return () => {}
}

function getServerNavigationIntentSnapshot(): string | null {
  return null
}

export function StoredBackLink({
  defaultHref,
  intentKey,
  showWithoutStoredHref = true,
}: StoredBackLinkProps): React.ReactElement | null {
  const getStoredHref = useCallback(() => {
    return readNavigationIntent(intentKey)
  }, [intentKey])
  const storedHref = useSyncExternalStore(
    subscribeToNavigationIntent,
    getStoredHref,
    getServerNavigationIntentSnapshot
  )

  const href = storedHref ?? defaultHref
  const playClick = useSound(click)

  if (!href || (!storedHref && !showWithoutStoredHref)) {
    return null
  }

  return (
    <Link
      className={textStyles.inlineMutedLink}
      href={href}
      onClick={() => playClick()}
    >
      Back
    </Link>
  )
}
