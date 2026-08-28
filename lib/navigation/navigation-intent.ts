export const navigationIntentKeys = {
  projectDetailBackHref: "portfolio:project-detail:back-href",
  projectsArchiveBackHref: "portfolio:projects-archive:back-href",
  writingArchiveBackHref: "portfolio:writing-archive:back-href",
  writingDetailBackHref: "portfolio:writing-detail:back-href",
} as const

export type NavigationIntentKey =
  (typeof navigationIntentKeys)[keyof typeof navigationIntentKeys]

export type NavigationIntentAction =
  | {
      key: NavigationIntentKey
      type: "clear"
    }
  | {
      key: NavigationIntentKey
      type: "set"
      value: string
    }

export function applyNavigationIntent(action: NavigationIntentAction): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    if (action.type === "clear") {
      window.sessionStorage.removeItem(action.key)
      return
    }

    window.sessionStorage.setItem(action.key, action.value)
  } catch {
    // Session storage can be unavailable in private or restricted contexts.
  }
}

export function readNavigationIntent(key: NavigationIntentKey): string | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    return window.sessionStorage.getItem(key)
  } catch {
    return null
  }
}
