import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { ContactSection } from "@/components/contact/contact-section";
import { HomepageDock } from "@/components/dock/homepage-dock";
import { HomepageFooter } from "@/components/homepage/homepage-footer";
import {
  HomeSection,
  PageContent,
  PageShell,
  SectionHeader,
} from "@/components/homepage/homepage-layout";
import { ProjectList } from "@/components/editorial-entity/project-list";
import { StructuredData } from "@/components/metadata/structured-data";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { WritingList } from "@/components/editorial-entity/writing-list";
import { homepageContent } from "@/lib/content/content-discovery";
import { getRouteMetadata } from "@/lib/metadata/site-metadata";
import {
  createPersonJsonLd,
  createWebsiteJsonLd,
} from "@/lib/metadata/structured-data";
import { navigationIntentKeys } from "@/lib/navigation/navigation-intent";
import { HomepageScrollReset } from "@/components/homepage/homepage-scroll-reset";

export const metadata: Metadata = getRouteMetadata("/");

export default function Page(): React.ReactElement {
  const { identity, about, approach, projects, writing, socialLinks } =
    homepageContent;

  /*
   * ------------------------------------------------------------
   * Continuous landing-animation sequence
   * ------------------------------------------------------------
   *
   * Every animated element receives one unique stagger number.
   *
   * Hero
   *   0  name
   *   1  title
   *   2  avatar
   *
   * About
   *   3  heading
   *   4... paragraphs
   *
   * Projects
   *   next heading
   *   next... project cards
   *
   * My Approach
   *   next heading
   *   next... paragraphs
   *
   * Writing
   *   next heading
   *   next... writing posts
   *
   * Contact
   *   final stagger
   * ------------------------------------------------------------
   */

  const aboutParagraphs = about.split("\n\n");
  const approachParagraphs = approach.split("\n\n");

  const aboutHeadingStagger = 3;
  const aboutParagraphStart = aboutHeadingStagger + 1;

  const projectsHeadingStagger =
    aboutParagraphStart + aboutParagraphs.length;

  const projectsStartStagger = projectsHeadingStagger + 1;

  const approachHeadingStagger =
    projectsStartStagger + projects.length;

  const approachParagraphStart =
    approachHeadingStagger + 1;

  const writingHeadingStagger =
    approachParagraphStart + approachParagraphs.length;

  const writingStartStagger =
    writingHeadingStagger + 1;

  const contactStagger =
    writingStartStagger + writing.length;

  return (
    <PageShell>
      <HomepageScrollReset />

      <StructuredData
        data={[createPersonJsonLd(), createWebsiteJsonLd()]}
      />

      <PageContent>
        {/* -------------------------------------------------- */}
        {/* Hero */}
        {/* -------------------------------------------------- */}

        <header className="flex items-start justify-between gap-6">
          <div className="flex min-w-0 flex-col gap-2">
            <h1
              className="blur-fade text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              style={{ "--stagger": 0 } as CSSProperties}
            >
              {identity.name}
            </h1>

            <p
              className="blur-fade text-base font-light leading-7 text-muted-foreground"
              style={{ "--stagger": 1 } as CSSProperties}
            >
              {identity.title}
            </p>
          </div>

          <Avatar
            className="blur-fade size-24 shrink-0 rounded-full"
            style={{ "--stagger": 2 } as CSSProperties}
          >
            <AvatarImage
              alt="Dnyanesh Fulsundar"
              className="object-contain"
              fetchPriority="high"
              sizes="96px"
              src="/assets/avatar/avatar.webp"
              width={96}
              height={96}
            />
          </Avatar>
        </header>

        {/* -------------------------------------------------- */}
        {/* About */}
        {/* -------------------------------------------------- */}

        <HomeSection
          header={
            <div
              className="blur-fade"
              style={
                {
                  "--stagger": aboutHeadingStagger,
                } as CSSProperties
              }
            >
              <SectionHeader
                actionLabel="View All"
                title="about"
              />
            </div>
          }
          id="about"
        >
          <div className="space-y-3">
            {aboutParagraphs.map((para, index) => (
              <p
                className="blur-fade text-base font-light leading-7 text-muted-foreground"
                key={`about-${index}`}
                style={
                  {
                    "--stagger": aboutParagraphStart + index,
                  } as CSSProperties
                }
              >
                {para}
              </p>
            ))}
          </div>
        </HomeSection>

        {/* -------------------------------------------------- */}
        {/* Projects */}
        {/* -------------------------------------------------- */}

        <HomeSection
          header={
            <div
              className="blur-fade"
              style={
                {
                  "--stagger": projectsHeadingStagger,
                } as CSSProperties
              }
            >
              <SectionHeader
                actionHref="/projects"
                actionIntent={{
                  key: navigationIntentKeys.projectsArchiveBackHref,
                  type: "set",
                  value: "/",
                }}
                actionLabel="view All"
                title="projects"
              />
            </div>
          }
          id="projects"
          rhythm="list"
        >
          <ProjectList
            projects={projects}
            source="home"
            staggerStart={projectsStartStagger}
          />
        </HomeSection>

        {/* -------------------------------------------------- */}
        {/* My Approach */}
        {/* -------------------------------------------------- */}

        <HomeSection
          header={
            <div
              className="blur-fade"
              style={
                {
                  "--stagger": approachHeadingStagger,
                } as CSSProperties
              }
            >
              <SectionHeader actionLabel="View All" title="my approach" />
            </div>
          }
        >
          <div className="space-y-4">
            {approachParagraphs.map((para, index) => (
              <p
                className="blur-fade text-base font-light leading-7 text-muted-foreground"
                key={`approach-${index}`}
                style={
                  {
                    "--stagger": approachParagraphStart + index,
                  } as CSSProperties
                }
              >
                {para}
              </p>
            ))}
          </div>
        </HomeSection>

        {/* -------------------------------------------------- */}
        {/* Writing */}
        {/* -------------------------------------------------- */}

        <HomeSection
          header={
            <div
              className="blur-fade"
              style={
                {
                  "--stagger": writingHeadingStagger,
                } as CSSProperties
              }
            >
              <SectionHeader
                actionHref="/writing"
                actionIntent={{
                  key: navigationIntentKeys.writingArchiveBackHref,
                  type: "set",
                  value: "/",
                }}
                actionLabel="view All"
                title="writing"
              />
            </div>
          }
          id="writing"
          rhythm="list"
        >
          <WritingList
            posts={writing}
            source="home"
            staggerStart={writingStartStagger}
          />
        </HomeSection>

        {/* -------------------------------------------------- */}
        {/* Contact */}
        {/* -------------------------------------------------- */}

        <div
          className="blur-fade"
          style={
            {
              "--stagger": contactStagger,
            } as CSSProperties
          }
        >
          <ContactSection email={identity.email} />
        </div>
      </PageContent>

      <HomepageDock
        socialLinks={socialLinks}
      />

      <HomepageFooter />
    </PageShell>
  );
}