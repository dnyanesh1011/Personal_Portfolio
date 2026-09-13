"use client";

import { Icon } from "@iconify/react";

import { useProjectSkillHighlight } from "@/components/homepage/project-skill-highlight-provider";
import { cn } from "@/lib/utils";

type Skill = {
  name: string;
  icon: string;
};

type SkillsListProps = {
  skills: Skill[];
  staggerStart?: number;
};

export function SkillsList({
  skills,
  staggerStart = 0,
}: SkillsListProps): React.ReactElement {
  const { activeStack } = useProjectSkillHighlight();

  return (
    <div className="flex flex-wrap gap-1.5">
    {skills.map((skill, index) => {
      const isHighlighted =
        activeStack !== null &&
        activeStack.some(
          (technology) =>
            technology.trim().toLowerCase() === skill.name.trim().toLowerCase(),
        );

      return (
        <div
          className={cn(
            "blur-fade inline-flex items-center gap-2 rounded-lg",
            "border bg-background px-3 py-2",
            "text-base font-light leading-5 transition-[opacity,border-color,background-color,color] duration-300 ease-out",
            isHighlighted
              ? "border-foreground/30 text-foreground"
              : activeStack !== null
                ? "border-border/50 text-muted-foreground/40"
                : "border-border text-muted-foreground",
          )}
          key={skill.name}
          style={{
            "--stagger": staggerStart + index,
          } as React.CSSProperties}
        >
          <Icon
            aria-hidden="true"
            className={cn(
              "size-5 shrink-0 transition-opacity duration-200",
              activeStack !== null && !isHighlighted
                ? "opacity-40"
                : "opacity-100",
            )}
            icon={skill.icon}
          />
          <span>{skill.name}</span>
        </div>
      );
    })}
    </div>
  );
}