/* eslint-disable react-doctor/no-danger -- JSON.stringify output is not user-controlled; < escaped to prevent early script close */
import type * as React from "react"

import type { JsonLd } from "@/lib/metadata/structured-data"

type StructuredDataProps = {
  data: JsonLd | readonly JsonLd[]
}

export function StructuredData({
  data,
}: StructuredDataProps): React.ReactElement {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />
  )
}
