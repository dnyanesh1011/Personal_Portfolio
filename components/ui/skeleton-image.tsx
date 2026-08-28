"use client"

import Image from "next/image"
import { useState } from "react"
import type * as React from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function SkeletonImage({
  className,
  onLoad,
  ...props
}: React.ComponentProps<typeof Image>): React.ReactElement {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Image
        className={cn(
          "transition-opacity duration-500 ease-in-out",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
        {...props}
      />
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
    </>
  )
}
