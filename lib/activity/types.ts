export type ActivityType =
  | "vscode"
  | "instagram"
  | "spotify"
  | "gym"
  | "sleeping"
  | "studying"
  | "riding"
  | "offline"

export type ActivitySource =
  | "mobile"
  | "desktop"
  | "automatic"

export type ActivityEvent =
  | {
      event: "activity.set"
      activity: Exclude<ActivityType, "offline">
      source: ActivitySource
      timestamp: string
    }
  | {
      event: "activity.clear"
      source: ActivitySource
      timestamp: string
    }
  | {
      event: "activity.heartbeat"
      source: ActivitySource
      timestamp: string
    }

export type ActivityState = {
  activity: ActivityType
  source: ActivitySource
  startedAt: string
  lastSeen: string
  expiresAt: string | null
}