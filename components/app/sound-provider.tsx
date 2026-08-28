"use client"

import * as React from "react"
import { SoundProvider as WebKitsSoundProvider } from "@web-kits/audio/react"

export function SoundProvider({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <WebKitsSoundProvider enabled>{children}</WebKitsSoundProvider>
}
