"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ProjectSkillHighlightContextValue = {
  activeStack: readonly string[] | null;
  setActiveStack: (stack: readonly string[] | null) => void;
};

const ProjectSkillHighlightContext =
  createContext<ProjectSkillHighlightContextValue>({
    activeStack: null,
    setActiveStack: () => {},
  });

type ProjectSkillHighlightProviderProps = {
  children: ReactNode;
};

export function ProjectSkillHighlightProvider({
  children,
}: ProjectSkillHighlightProviderProps): React.ReactElement {
  const [activeStack, setActiveStack] = useState<readonly string[] | null>(
    null,
  );

  const value = useMemo(
    () => ({
      activeStack,
      setActiveStack,
    }),
    [activeStack],
  );

  return (
    <ProjectSkillHighlightContext.Provider value={value}>
      {children}
    </ProjectSkillHighlightContext.Provider>
  );
}

export function useProjectSkillHighlight(): ProjectSkillHighlightContextValue {
  const context = useContext(ProjectSkillHighlightContext);

  return context;
}