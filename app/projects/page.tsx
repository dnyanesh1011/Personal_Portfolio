import type { Metadata } from "next"
import { Suspense } from "react"

import { HomepageDock } from "@/components/dock/homepage-dock"
import { HomepageFooter } from "@/components/homepage/homepage-footer"
import {
  HomeSection,
  PageContent,
  PageShell,
} from "@/components/homepage/homepage-layout"
import { ProjectList } from "@/components/editorial-entity/project-list"
import { StoredBackLink } from "@/components/navigation/stored-back-link"
import { StructuredData } from "@/components/metadata/structured-data"
import { textStyles } from "@/lib/design/text-styles"
import {
  getDiscoveryRouteByHref,
  homepageContent,
} from "@/lib/content/content-discovery"
import { projects } from "@/lib/content/projects"
import { getRouteMetadata } from "@/lib/metadata/site-metadata"
import { createCollectionPageJsonLd } from "@/lib/metadata/structured-data"
import { navigationIntentKeys } from "@/lib/navigation/navigation-intent"

export const metadata: Metadata = getRouteMetadata("/projects")

export default function ProjectsPage(): React.ReactElement {
  const { socialLinks } = homepageContent
  const route = getDiscoveryRouteByHref("/projects")

  return (
    <PageShell>
      {route ? (
        <StructuredData data={createCollectionPageJsonLd(route)} />
      ) : null}
      <PageContent>
        <header className="space-y-3 pt-4 sm:pt-8">
          <Suspense fallback={null}>
            <StoredBackLink
              intentKey={navigationIntentKeys.projectsArchiveBackHref}
              showWithoutStoredHref={false}
            />
          </Suspense>
          <h1 className={textStyles.archiveTitle}>Projects</h1>
          <div className="space-y-3">
            <p className={textStyles.pageDescription}>
              A selection of frontend work across client products and personal
              projects, documenting my learning journey.
            </p>
            <p className={textStyles.pageDescription}>
              Each project has its own shape, but I usually care about the same
              things: clear planning, strong visual hierarchy, and
              implementation that can hold up as the product grows.
            </p>
          </div>
        </header>

        <HomeSection rhythm="list">
          <ProjectList projects={projects} />
        </HomeSection>
      </PageContent>
      <HomepageDock socialLinks={socialLinks} />
      <HomepageFooter />
    </PageShell>
  )
}
