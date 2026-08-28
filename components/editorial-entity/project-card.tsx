import { SkeletonImage } from "@/components/ui/skeleton-image";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { ProjectActions } from "@/components/action-link/project-actions";
import { EntitySurface } from "@/components/editorial-entity/entity-surface";
import { entitySurfaceVariants } from "@/components/editorial-entity/entity-surface-variants";
import { textStyles } from "@/lib/design/text-styles";
import { cn } from "@/lib/utils";

export type ProjectCardProps = {
  liveHref: string;
  name: string;
  priority?: boolean;
  screenshotSrc?: string;
  sourceHref: string | null;
  surfaceInset?: VariantProps<typeof entitySurfaceVariants>["inset"];
  surfaceInteraction?: VariantProps<
    typeof entitySurfaceVariants
  >["interaction"];
  summary: string;
};

export function ProjectCard({
  liveHref,
  name,
  priority,
  screenshotSrc,
  sourceHref,
  surfaceInset = "card",
  surfaceInteraction = "withinFocus",
  summary,
}: ProjectCardProps): React.ReactElement {
  return (
    <EntitySurface
      as="article"
      className="pointer-events-none relative"
      inset={surfaceInset}
      interaction={surfaceInteraction}
    >
      <ProjectMediaFrame name={name} priority={priority} src={screenshotSrc} />

      <div className="mt-3 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {name}
          </h3>

          <p className="mt-1.5 max-w-xl text-sm font-light leading-6 text-muted-foreground">
            {summary}
          </p>
        </div>

        <div className="pointer-events-auto relative z-10 shrink-0 pt-0.5">
          <ProjectActions
            liveHref={liveHref}
            projectName={name}
            sourceHref={sourceHref}
          />
        </div>
      </div>
    </EntitySurface>
  );
}

function ProjectMediaFrame({
  name,
  priority,
  src,
}: {
  name: string;
  priority?: boolean;
  src?: string;
}): React.ReactElement {
  return (
    <div className="group relative aspect-[16/9] overflow-hidden rounded-xl">
      {src ? (
        <SkeletonImage
          alt={`${name} project screenshot`}
          className="object-cover transition-transform duration-500 ease-[var(--ease-interface-out)] group-hover:scale-[1.02]"
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, 50vw"
          src={src}
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}
    </div>
  );
}
