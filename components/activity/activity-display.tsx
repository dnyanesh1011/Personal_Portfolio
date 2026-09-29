"use client"

import * as React from "react"

import type { ActivityState } from "@/lib/activity/types"

import { ActivityIndicator } from "./activity-indicator"

const POLL_INTERVAL = 30_000

export function ActivityDisplay() {
  const [activity, setActivity] =
    React.useState<ActivityState | null>(null)

  React.useEffect(() => {
    let cancelled = false

    async function loadActivity() {
      try {
        const response = await fetch("/api/activity", {
          cache: "no-store",
        })

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as {
          activity: ActivityState | null
        }

        if (!cancelled) {
          setActivity(data.activity)
        }
      } catch {
        // Activity is non-critical UI.
      }
    }

    loadActivity()

    const interval = window.setInterval(
      loadActivity,
      POLL_INTERVAL,
    )

    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [])

  return <ActivityIndicator activity={activity} />
}