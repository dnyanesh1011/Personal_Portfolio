import type * as React from "react"

import { SignatureMark } from "@/components/homepage/signature-mark"

export function HomepageFooter(): React.ReactElement {
  return (
    <footer className="mt-20 flex flex-row items-center justify-between gap-4 pb-16 text-sm text-muted-foreground">
      <SignatureMark />
    </footer>
  )
}