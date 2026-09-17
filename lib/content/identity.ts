import type {
  ActionLinkRecord,
  SiteIdentity,
} from "@/lib/content/content-types"

export const siteIdentity = {
  name: "Dnyanesh Fulsundar",
  title: "Frontend Developer",
  email: "dnyaneshwarxi@gmail.com",
} satisfies SiteIdentity

export const socialLinks = [
  {
    href: "https://github.com/dnyanesh1011",
    kind: "github",
  },
  {
    href: "https://www.linkedin.com/in/dnyaneshfulsundar/",
    kind: "linkedin",
  },
  {
    href: "https://x.com/dnyaanaa",
    kind: "x",
  },
  {
    href: "https://drive.google.com/file",
    kind: "cv",
  },
  {
    href: "mailto:dnyaneshwarxi@gmail.com",
    kind: "email",
  },
] satisfies readonly ActionLinkRecord[]
