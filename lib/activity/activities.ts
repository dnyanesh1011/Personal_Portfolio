import type { ActivityType } from "./types"

export const activities = {
  vscode: {
    label: "Working in VS Code",
    icon: "code",
  },
  instagram: {
    label: "On Instagram",
    icon: "brand-instagram",
  },
  spotify: {
    label: "Listening to Spotify",
    icon: "brand-spotify",
  },
  gym: {
    label: "At the Gym",
    icon: "barbell",
  },
  sleeping: {
    label: "Sleeping",
    icon: "moon",
  },
  studying: {
    label: "Studying",
    icon: "book",
  },
  riding: {
    label: "Riding",
    icon: "motorcycle",
  },
  offline: {
    label: "Offline",
    icon: "circle-off",
  },
} satisfies Record<
  ActivityType,
  {
    label: string
    icon: string
  }
>