export const textStyles = {
  articleBody:
    "space-y-8 text-base font-medium leading-8 text-muted-foreground [&_a]:text-foreground [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:scroll-mt-24 [&_h2]:pt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:leading-8 [&_h2]:text-foreground [&_h3]:scroll-mt-24 [&_h3]:pt-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:leading-7 [&_h3]:text-foreground [&_li]:text-pretty [&_p]:text-pretty",
  archiveTitle:
    "text-xl font-semibold tracking-normal text-balance text-foreground",
  detailTitle:
    "text-2xl font-semibold tracking-normal text-balance text-foreground",
  entityDescription:
    "text-lg font-medium leading-8 text-pretty text-muted-foreground",
  entityTitle: "truncate text-base font-semibold text-foreground",
  inlineMutedLink:
    "inline-block text-base font-medium text-muted-foreground transition-[color,scale] hover:text-foreground active:scale-[0.96] motion-reduce:active:scale-100",
  metadata: "text-sm font-medium text-muted-foreground",
  pageDescription:
    "max-w-prose text-base font-medium leading-7 text-pretty text-muted-foreground",
  pageTitle:
    "text-4xl sm:text-5xl font-semibold tracking-tight text-balance text-foreground",
  sectionTitle: "text-lg font-semibold text-balance text-foreground",
  smallDescription:
    "text-sm font-medium leading-6 text-pretty text-muted-foreground",
  tocHeading: "mb-4 text-sm font-medium text-muted-foreground",
  tocItem:
    "group grid min-h-8 grid-cols-[0.75rem_1fr] items-stretch rounded-md pr-2 text-sm font-medium text-muted-foreground transition-[color,opacity] duration-150 ease-[var(--ease-interface)] hover:text-foreground",
  tooltip: "text-sm font-medium",
} as const
