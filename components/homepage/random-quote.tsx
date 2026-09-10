"use client"

import type * as React from "react"
import { useEffect, useState } from "react"

const quotes = [
  {
    text: "Man is made by his belief. As he believes, so he is.",
    author: "Bhagavad Gita",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
  {
    text: "The function of good software is to make the complex appear to be simple.",
    author: "Grady Booch",
  },
]

type RandomQuoteProps = {
  stagger: number
}

export function RandomQuote({
  stagger,
}: RandomQuoteProps): React.ReactElement {
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }, [])

  return (
    <section
      aria-label="Random quote"
      className="blur-fade relative min-h-[165px] overflow-hidden rounded-xl border border-border px-6 py-8 sm:px-7"
      style={{ "--stagger": stagger } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-1 -top-5 font-serif text-[9rem] leading-none text-muted-foreground/15"
      >
        “
      </span>

      <div className="relative flex min-h-[101px] flex-col justify-between">
        <p className="font-mono text-base font-bold italic leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          "{quote.text}"
        </p>

        <p className="self-end font-mono text-sm font-medium italic text-muted-foreground">
          — {quote.author}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-1 font-serif text-[9rem] leading-none text-muted-foreground/15"
      >
        ”
      </span>
    </section>
  )
}