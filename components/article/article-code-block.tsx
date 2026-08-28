"use client"

import { useEffect, useRef, useState } from "react"
import { IconCheckFilled, IconCopyFilled } from "@tabler/icons-react"
import type * as React from "react"
import { useSound } from "@web-kits/audio/react"

import { AnimatePresence, m } from "@/lib/motion/primitives"
import { copy } from "@/lib/audio/minimal"
import { cn } from "@/lib/utils"

const iconTransition = { bounce: 0, duration: 0.3, type: "spring" } as const

function CopyIcon({
  copied,
  className: cls,
  ...p
}: { copied: boolean } & React.SVGProps<SVGSVGElement>) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <m.span
        key={copied ? "check" : "copy"}
        animate={{ filter: "blur(0px)", opacity: 1, transform: "scale(1)" }}
        className="inline-flex"
        exit={{ filter: "blur(2px)", opacity: 0, transform: "scale(0.6)" }}
        initial={{ filter: "blur(2px)", opacity: 0, transform: "scale(0.6)" }}
        transition={iconTransition}
      >
        {copied ? (
          <IconCheckFilled className={cls} {...p} />
        ) : (
          <IconCopyFilled className={cls} {...p} />
        )}
      </m.span>
    </AnimatePresence>
  )
}

export function ArticleCodeBlock({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"pre">): React.ReactElement {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const playClick = useSound(copy)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(t)
  }, [copied])

  function handleCopy() {
    playClick()
    const text = preRef.current?.querySelector("code")?.textContent ?? ""
    void navigator.clipboard.writeText(text).then(() => setCopied(true))
  }

  return (
    <div className="group relative">
      <pre
        ref={preRef}
        className={cn(
          "text-code-foreground overflow-x-auto rounded-lg bg-code p-4 font-mono text-sm leading-6",
          className
        )}
        {...props}
      >
        {children}
      </pre>
      <button
        aria-label={copied ? "Copied" : "Copy code"}
        className="text-code-foreground/40 hover:text-code-foreground absolute top-1.5 right-1.5 cursor-pointer rounded-md p-1 transition-colors duration-150"
        onClick={handleCopy}
        type="button"
      >
        <CopyIcon copied={copied} className="size-3.5" />
      </button>
      <output aria-live="polite" className="sr-only">
        {copied ? "Code copied to clipboard" : ""}
      </output>
    </div>
  )
}
