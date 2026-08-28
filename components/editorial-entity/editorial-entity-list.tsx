"use client"

import { cloneElement, type CSSProperties, type ReactElement } from "react"
import type { VariantProps } from "class-variance-authority"

import { AnimatedEntityBackground } from "@/components/editorial-entity/animated-entity-background"
import { entitySurfaceVariants } from "@/components/editorial-entity/entity-surface-variants"
import { cn } from "@/lib/utils"

type EditorialEntitySurfaceProps = {
  className: string
  "data-id": string
  style?: CSSProperties
}

type EditorialEntityElement = ReactElement<EditorialEntitySurfaceProps>

type EditorialEntityListProps<TItem> = {
  getId: (item: TItem) => string
  itemClassName?: string
  items: readonly TItem[]
  renderItem: (
    item: TItem,
    surfaceProps: EditorialEntitySurfaceProps,
    index: number
  ) => EditorialEntityElement
  siblingDimming?: boolean
  surfaceInset?: VariantProps<typeof entitySurfaceVariants>["inset"]
  surfaceInteraction?: VariantProps<typeof entitySurfaceVariants>["interaction"]
}

const siblingDimmingClassName = "entity-sibling-dimming"

export function EditorialEntityList<TItem>({
  getId,
  itemClassName,
  items,
  renderItem,
  siblingDimming = false,
  surfaceInset = "card",
  surfaceInteraction = "focus",
}: EditorialEntityListProps<TItem>): React.ReactElement {
  return (
    <AnimatedEntityBackground>
      {items.map((item, index) => {
        const id = getId(item)
        const element = renderItem(
          item,
          {
            "data-id": id,
            className: entitySurfaceVariants({
              className: cn(
                "cursor-pointer",
                itemClassName,
                siblingDimming && siblingDimmingClassName
              ),
              inset: surfaceInset,
              interaction: surfaceInteraction,
            }),
          },
          index
        )

        return cloneElement(element, { key: id })
      })}
    </AnimatedEntityBackground>
  )
}
