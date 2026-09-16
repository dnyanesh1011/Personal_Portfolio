const fallbackSiteUrl = "https://dnyaneshfulsundar.com"

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) {
    return fallbackSiteUrl
  }

  return value.replace(/\/+$/, "")
}

export const siteConfig = {
  author: "Dnyanesh Fulsundar",
  description:
    "Frontend developer building React and Next.js products with close attention to interface quality, architecture, and performance.",
  locale: "en_US",
  name: "Dnyanesh Fulsundar",
  shortName: "Dnyanesh",
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  themeColor: "#111111",
  twitterHandle: "@dnyaanaa",
} as const
