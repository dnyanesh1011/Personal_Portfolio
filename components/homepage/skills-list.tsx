"use client";

import { Icon } from "@iconify/react";

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
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <div
          className={cn(
            "blur-fade inline-flex items-center gap-2 rounded-lg",
            "border border-border bg-background px-3 py-2",
            "text-base font-light leading-5 text-muted-foreground",
          )}
          key={skill.name}
          style={{
            "--stagger": staggerStart + index,
          } as React.CSSProperties}
        >
          <Icon
            aria-hidden="true"
            className="size-5 shrink-0"
            icon={skill.icon}
          />
          <span>{skill.name}</span>
        </div>
      ))}
    </div>
  );
}