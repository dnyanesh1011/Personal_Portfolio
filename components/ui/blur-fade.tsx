import type { CSSProperties, ReactNode } from "react";

export type Stagger = {
  next: () => number;
};

export function createStagger(): Stagger {
  let index = 0;

  return {
    next: () => index++,
  };
}

type BlurFadeProps = {
  children: ReactNode;
  stagger: Stagger;
  className?: string;
};

export function BlurFade({
  children,
  stagger,
  className,
}: BlurFadeProps): React.ReactElement {
  const style = {
    "--stagger": stagger.next(),
  } as CSSProperties;

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}