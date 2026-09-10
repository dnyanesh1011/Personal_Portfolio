"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type React from "react";

import { textStyles } from "@/lib/design/text-styles";
import { cn } from "@/lib/utils";

export const TooltipCreateHandle: typeof TooltipPrimitive.createHandle =
  TooltipPrimitive.createHandle;

export const TooltipProvider: typeof TooltipPrimitive.Provider =
  TooltipPrimitive.Provider;

export const Tooltip: typeof TooltipPrimitive.Root = TooltipPrimitive.Root;

export function TooltipTrigger(
  props: TooltipPrimitive.Trigger.Props,
): React.ReactElement {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      delay={130}
      {...props}
    />
  );
}

export function TooltipPopup({
  className,
  align = "center",
  sideOffset = 4,
  side = "top",
  anchor,
  children,
  portalProps,
  instantPosition = false,
  ...props
}: TooltipPrimitive.Popup.Props & {
  instantPosition?: boolean;
  align?: TooltipPrimitive.Positioner.Props["align"];
  side?: TooltipPrimitive.Positioner.Props["side"];
  sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];
  anchor?: TooltipPrimitive.Positioner.Props["anchor"];
  portalProps?: TooltipPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <TooltipPrimitive.Portal {...portalProps}>
      <TooltipPrimitive.Positioner
        align={align}
        anchor={anchor}
        className={cn(
          "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-150 ease-out",
          instantPosition && "duration-150",
        )}
        data-slot="tooltip-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          className={cn(
            "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) text-balance rounded-md border-border-tooltip border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-sm/5 transition-[width,height,scale,opacity] duration-150 ease-out before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 data-instant:duration-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            textStyles.tooltip,
            className,
          )}
          data-slot="tooltip-popup"
          {...props}
        >
          <TooltipPrimitive.Viewport
            className="
              relative size-full overflow-clip
              px-(--viewport-inline-padding) py-1
              [--viewport-inline-padding:--spacing(2)]

              **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))]
              **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))]

              **:data-current:translate-x-0
              **:data-previous:translate-x-0

              **:data-current:opacity-100
              **:data-previous:opacity-100

              **:data-current:transition-[translate,opacity]
              **:data-previous:transition-[translate,opacity]

              **:data-current:duration-[160ms,100ms]
              **:data-previous:duration-[160ms,70ms]

              **:data-current:ease-[cubic-bezier(0.22,1,0.36,1)]
              **:data-previous:ease-[cubic-bezier(0.22,1,0.36,1)]

              data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-1/2
              data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0

              data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-1/2
              data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0

              data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-1/2
              data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0

              data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-1/2
              data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0

              [[data-instant]_&_[data-current]]:transition-none
              [[data-instant]_&_[data-previous]]:transition-none
            "
            data-slot="tooltip-viewport"
          >
            {children}
          </TooltipPrimitive.Viewport>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { TooltipPrimitive, TooltipPopup as TooltipContent };