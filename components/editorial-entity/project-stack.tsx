import type * as React from "react"

export function ProjectStack({
  stack,
}: {
  stack: readonly string[]
}): React.ReactElement | null {
  if (stack.length === 0) return null

  return (
    <ul className="list-disc space-y-2 pl-5">
      {stack.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
