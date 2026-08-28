type PageMarkdownInput = {
  description?: string
  rawMdx: string
  title: string
}

const frontmatterPattern = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/
const fencedCodeBlockPattern = /^```[\s\S]*?^```[^\S\r\n]*(?:\r?\n|$)/gm
const mdxImportExportPattern =
  /^(?:import|export)\s+(?:[\s\S]*? from\s+["'][^"']+["'];?|[\s\S]*?;)\r?\n?/gm
const mdxExpressionLinePattern = /^\{.*\}\r?\n?/gm
const mdxJsxBlockPattern = /\n?<[A-Z][\s\S]*?\/>\n?/g
const mdxKbdPattern = /<kbd>([\s\S]*?)<\/kbd>/g
const mdxImageComponentPattern = /\n?<(?:ArticleImage|img)\s+([^>]*?)\/>\n?/g
const quotedAttributePattern = /([\w-]+)=["']([^"']*)["']/g
const repeatedBlankLinesPattern = /\n{3,}/g

function getQuotedAttributes(value: string): Record<string, string> {
  const attributes: Record<string, string> = {}

  for (const match of value.matchAll(quotedAttributePattern)) {
    attributes[match[1]] = match[2]
  }

  return attributes
}

function replaceImageComponent(_match: string, rawAttributes: string): string {
  const attributes = getQuotedAttributes(rawAttributes)

  if (!attributes.src) {
    return "\n"
  }

  return `\n![${attributes.alt ?? ""}](${attributes.src})\n`
}

function cleanMarkdownSegment(value: string): string {
  return value
    .replace(mdxImportExportPattern, "")
    .replace(mdxImageComponentPattern, replaceImageComponent)
    .replace(mdxJsxBlockPattern, "\n")
    .replace(mdxExpressionLinePattern, "")
    .replace(mdxKbdPattern, (_match, label: string) => `\`${label.trim()}\``)
}

function cleanOutsideFencedCode(value: string): string {
  let cursor = 0
  let result = ""

  for (const match of value.matchAll(fencedCodeBlockPattern)) {
    const index = match.index ?? 0

    result += cleanMarkdownSegment(value.slice(cursor, index))
    result += match[0]
    cursor = index + match[0].length
  }

  result += cleanMarkdownSegment(value.slice(cursor))

  return result
}

export function createPageMarkdown({
  description,
  rawMdx,
  title,
}: PageMarkdownInput): string {
  const body = cleanOutsideFencedCode(rawMdx.replace(frontmatterPattern, ""))
    .replace(repeatedBlankLinesPattern, "\n\n")
    .trim()

  return [`# ${title}`, description, body]
    .filter((section): section is string => Boolean(section?.trim()))
    .join("\n\n")
}
