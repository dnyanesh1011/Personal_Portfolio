import { cva } from "class-variance-authority"

export const entitySurfaceVariants = cva(
  [
    "rounded-lg outline-none",
    "transition-[background-color,box-shadow]",
    "duration-[var(--duration-surface-hover)] ease-[var(--ease-interface)]",
    "motion-reduce:transition-none",
  ],
  {
    defaultVariants: {
      inset: "row",
      interaction: "within",
    },
    variants: {
      inset: {
        card: "-mx-3 px-3 py-3",
        none: "",
        row: "-mx-3 px-3 py-2",
      },
      interaction: {
        focus:
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        none: "",
        self: "hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        withinFocus:
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        within:
          "focus-within:bg-surface-hover focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background hover:bg-surface-hover",
      },
    },
  }
)
