import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { ContactSection } from "@/components/contact/contact-section";
import { HomepageDock } from "@/components/dock/homepage-dock";
import { HomepageFooter } from "@/components/homepage/homepage-footer";
import { ProjectSkillHighlightProvider } from "@/components/homepage/project-skill-highlight-provider";
import { SkillsList } from "@/components/homepage/skills-list";
import {
  HomeSection,
  PageContent,
  PageShell,
  SectionHeader,
} from "@/components/homepage/homepage-layout";
import { ProjectList } from "@/components/editorial-entity/project-list";
import { StructuredData } from "@/components/metadata/structured-data";
import { FlipAvatar } from "@/components/homepage/flip-avatar";
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
  const { identity, about, approach, projects, socialLinks } =
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
const skills = [
  { name: "C++", icon: "skill-icons:cpp" },
  { name: "Go", icon: "logos:go" },
  { name: "Typescript", icon: "skill-icons:typescript" },
  { name: "Python", icon: "logos:python" },
  { name: "React", icon: "logos:react" },
  { name: "Amazon Web Services", icon: "logos:aws" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "Kubernetes", icon: "logos:kubernetes" },
  { name: "GitHub Actions", icon: "logos:github-actions" },
  { name: "Postman", icon: "logos:postman-icon" },
  { name: "SQL", icon: "vscode-icons:file-type-sql" },
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "Clerk", icon: "simple-icons:clerk" },
  { name: "SonarQube", icon: "logos:sonarqube" },
  { name: "Apache Airflow", icon: "devicon:apacheairflow" },
  { name: "Kafka", icon: "devicon:apachekafka" },
  { name: "ArgoCD", icon: "devicon:argocd" },
  { name: "MongoDB", icon: "logos:mongodb-icon" },
  { name: "PostgreSQL", icon: "logos:postgresql" },
  { name: "Prisma", icon: "skill-icons:prisma" },
  { name: "OpenSearch", icon: "devicon:opensearch" },
];

const aboutHeadingStagger = 3;
const aboutParagraphStart = aboutHeadingStagger + 1;

const projectsHeadingStagger =
  aboutParagraphStart + aboutParagraphs.length;

const projectsStartStagger = projectsHeadingStagger + 1;

const skillsHeadingStagger =
  projectsStartStagger + projects.length;

const skillsStartStagger =
  skillsHeadingStagger + 1;

const approachHeadingStagger =
  skillsStartStagger + skills.length;

const approachParagraphStart =
  approachHeadingStagger + 1;

const contactStagger =
  approachParagraphStart + approachParagraphs.length;

const quoteStagger = contactStagger + 1;

  return (
    <PageShell>
      <HomepageScrollReset />

      <StructuredData
        data={[createPersonJsonLd(), createWebsiteJsonLd()]}
      />

      <ProjectSkillHighlightProvider>
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

          <FlipAvatar
            className="blur-fade size-24 shrink-0"
            style={{ "--stagger": 2 } as CSSProperties}
          />
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
                actionLabel="view All"
                title="about"
              />
            </div>
          }
          id="about"
        >
          <div className="space-y-3">
            {aboutParagraphs.map((para, index) => (
              <p
                className="blur-fade text-base font-normal leading-7 text-muted-foreground"
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
        {/* Projects + Skills */}
        {/* -------------------------------------------------- */}

      <div
        className="
          relative
          lg:grid
          lg:w-[calc(100%+18.5rem)]
          lg:grid-cols-[minmax(0,1fr)_16rem]
          lg:gap-10
        "
      >
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
                actionLabel="view All"
                actionHref="/projects"
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

        <aside className="mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-8">
            <section
              className="scroll-mt-24 space-y-5"
              id="skills"
            >
              <div
                className="blur-fade"
                style={
                  {
                    "--stagger": skillsHeadingStagger,
                  } as CSSProperties
                }
              >
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  skills
                </h2>
              </div>

              <SkillsList
                skills={skills}
                staggerStart={skillsStartStagger}
              />
            </section>
          </div>
        </aside>
      </div>

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
                className="blur-fade text-base font-normal leading-7 text-muted-foreground"
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
</ProjectSkillHighlightProvider>

      <HomepageDock
        socialLinks={socialLinks}
      />

      <HomepageFooter stagger={quoteStagger} />
    </PageShell>
  );
}