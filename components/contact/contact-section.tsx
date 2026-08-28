import type * as React from "react"

import { EmailCopyButton } from "@/components/contact/email-copy-button"
import { HomeSection } from "@/components/homepage/homepage-layout"

export function ContactSection({
  email,
}: {
  email: string
}): React.ReactElement {
  return (
    <HomeSection className="pt-2 text-center" id="contact">
      <EmailCopyButton email={email} />
    </HomeSection>
  )
}
