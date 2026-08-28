import type { CSSProperties } from "react"
import type { Transition } from "@/lib/motion/primitives"

export const activeSurfaceStyle = {
  backgroundColor: "var(--surface-active)",
} satisfies CSSProperties

// Single spring for all animated background surfaces — entity rows and icon
// groups — because the settle time and feel were nearly identical across two
// separate configs (both ~365ms) while the ξ relationship was semantically
// inverted. Unified at ξ ≈ 0.85, ~333ms settle: smooth, no perceptible bounce.
export const surfaceBackgroundTransition = {
  damping: 28,
  stiffness: 300,
  type: "spring",
} satisfies Transition
