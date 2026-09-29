"use client"

import type { ActivityState } from "@/lib/activity/types"
import { activities } from "@/lib/activity/activities"

type ActivityIndicatorProps = {
  activity: ActivityState | null
}

export function ActivityIndicator({
  activity,
}: ActivityIndicatorProps) {
  if (!activity || activity.activity === "offline") {
    return null
  }

  const definition = activities[activity.activity]

  return (
    <div
      className="inline-flex items-center gap-2 text-sm text-muted-foreground"
      aria-label={definition.label}
    >
      <span
        aria-hidden="true"
        className="relative flex size-2"
      >
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/40" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>

      <span>{definition.label}</span>
    </div>
  )
}