import type { VariantProps } from "class-variance-authority"

import type { IconLinkSize } from "@/components/action-link/icon-link"
import type { buttonVariants } from "@/components/ui/button"

export const iconSizeClass: Record<IconLinkSize, string> = {
  dock: "size-5",
  projectAction: "size-4.5",
  social: "size-5",
}

export const buttonSize: Record<
  IconLinkSize,
  NonNullable<VariantProps<typeof buttonVariants>["size"]>
> = {
  dock: "icon-lg",
  projectAction: "icon-sm",
  social: "icon",
}
