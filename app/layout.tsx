import localFont from "next/font/local"
import type { Metadata } from "next"

import "./globals.css"
import { SoundProvider } from "@/components/app/sound-provider"
import { ThemeProvider } from "@/components/app/theme-provider"
import { MotionDomMaxProvider } from "@/lib/motion/runtime"
import { siteConfig } from "@/lib/metadata/site-config"
import { cn } from "@/lib/utils"

const googleSans = localFont({
  display: "swap",
  src: [
    {
      path: "./fonts/GoogleSans-VariableFont_GRAD,opsz,wght.woff2",
      style: "normal",
      weight: "400 700",
    },
    {
      path: "./fonts/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.woff2",
      style: "italic",
      weight: "400 700",
    },
  ],
  variable: "--font-sans",
})

const googleSansCode = localFont({
  display: "swap",
  src: [
    {
      path: "./fonts/GoogleSansCode-VariableFont_MONO,wght.woff2",
      style: "normal",
      weight: "400 700",
    },
    {
      path: "./fonts/GoogleSansCode-Italic-VariableFont_MONO,wght.woff2",
      style: "italic",
      weight: "400 700",
    },
  ],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        googleSans.variable,
        googleSansCode.variable
      )}
    >
      <body>
        <SoundProvider>
          <ThemeProvider>
            <MotionDomMaxProvider>{children}</MotionDomMaxProvider>
          </ThemeProvider>
        </SoundProvider>
      </body>
    </html>
  )
}
