import Link from "next/link"
import type * as React from "react"

export function EntityPrimaryLink({
  ariaLabel,
  href,
  onClick,
}: {
  ariaLabel: string
  href: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}): React.ReactElement {
  return (
    <Link
      aria-label={ariaLabel}
      className="absolute inset-0 rounded-[inherit] outline-none"
      href={href}
      onClick={onClick}
    />
  )
}
