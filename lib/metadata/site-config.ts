const fallbackSiteUrl = "https://www.mohamedgshoaib.me"

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) {
    return fallbackSiteUrl
  }

  return value.replace(/\/+$/, "")
}

export const siteConfig = {
  author: "Dnyanesh Fulsundar",
  description:
    "Frontend developer based in Cairo, Egypt. I build React and Next.js products with close attention to interface quality, architecture, and performance.",
  locale: "en_US",
  name: "Dnyanesh Fulsundar",
  shortName: "Mohamed",
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  themeColor: "#111111",
  twitterHandle: "@mohamedgshoaib",
} as const
