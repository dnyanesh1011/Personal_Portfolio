import { siteConfig } from "@/lib/metadata/site-config"
import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/lib/metadata/og-image"

export const alt = "Projects"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function Image() {
  return renderOgImage({ kicker: siteConfig.name, title: "Projects" })
}
