import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconBrandXFilled,
  IconBriefcase,
  IconExternalLinkFilled,
  IconFileCvFilled,
  IconHome,
  IconMailFilled,
  IconNotebook,
  type Icon as TablerIcon,
} from "@tabler/icons-react"

import type { IconLinkHrefItem } from "@/components/action-link/icon-link"
import type {
  ActionLinkKind,
  ActionLinkRecord,
} from "@/lib/content/content-types"

type ActionLinkDefinition = {
  icon: TablerIcon
  label: string | ((item: ActionLinkRecord) => string)
  target?: string
}

const actionLinkDefinitions: Record<ActionLinkKind, ActionLinkDefinition> = {
  contact: {
    icon: IconMailFilled,
    label: "Contact",
  },
  cv: {
    icon: IconFileCvFilled,
    label: "Open CV",
    target: "_blank",
  },
  email: {
    icon: IconMailFilled,
    label: "Email Me",
  },
  github: {
    icon: IconBrandGithubFilled,
    label: "GitHub",
    target: "_blank",
  },
  home: {
    icon: IconHome,
    label: "Home",
  },
  linkedin: {
    icon: IconBrandLinkedinFilled,
    label: "LinkedIn",
    target: "_blank",
  },
  projectLive: {
    icon: IconExternalLinkFilled,
    label: (item) =>
      item.labelContext ? `${item.labelContext} live site` : "Open website",
    target: "_blank",
  },
  projectSource: {
    icon: IconBrandGithubFilled,
    label: (item) =>
      item.labelContext ? `${item.labelContext} source code` : "Source code",
    target: "_blank",
  },
  projects: {
    icon: IconBriefcase,
    label: "Projects",
  },
  writing: {
    icon: IconNotebook,
    label: "Writing",
  },
  x: {
    icon: IconBrandXFilled,
    label: "X",
    target: "_blank",
  },
}

export function resolveActionLinkItem(
  item: ActionLinkRecord
): IconLinkHrefItem {
  const definition = actionLinkDefinitions[item.kind]

  const label =
    typeof definition.label === "function"
      ? definition.label(item)
      : definition.label

  return {
    id: `${item.kind}:${item.href}`,
    href: item.href,
    icon: definition.icon,
    label: item.label ?? label,
    ...(definition.target ? { target: definition.target } : {}),
  }
}