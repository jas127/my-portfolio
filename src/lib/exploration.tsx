import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const SECTION_IDS = ['home', 'world-map', 'main-quests', 'side-quests', 'toolbox', 'field-notes', 'curious', 'about', 'contact'];

type ExplorationValue = {
  visited: string[];
  progress: number;
};

const ExplorationContext = createContext<ExplorationValue>({ visited: [], progress: 0 });

export function ExplorationProvider({ children }: { children: ReactNode }) {
  const [visited, setVisited] = useState<string[]>(['home']);

  useEffect(() => {
    const observers = SECTION_IDS.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisited((current) => (current.includes(id) ? current : [...current, id]));
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const value = useMemo(
    () => ({ visited, progress: Math.round((visited.length / SECTION_IDS.length) * 100) }),
    [visited],
  );
  return <ExplorationContext.Provider value={value}>{children}</ExplorationContext.Provider>;
}

export const useExploration = () => useContext(ExplorationContext);
export { SECTION_IDS };
