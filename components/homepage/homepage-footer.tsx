import type * as React from "react"

import { RandomQuote } from "@/components/homepage/random-quote"

type HomepageFooterProps = {
  stagger?: number
}

export function HomepageFooter({
  stagger = 0,
}: HomepageFooterProps): React.ReactElement {
  return (
    <footer className="mt-20 pb-16 text-sm text-muted-foreground">
      <RandomQuote stagger={stagger} />
    </footer>
  )
}