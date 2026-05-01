import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type JourneyStateValue = {
  completedEducation: number[];
  toggleEducationCompletion: (index: number) => void;
};

const JourneyStateContext = createContext<JourneyStateValue | null>(null);

export function JourneyStateProvider({ children }: { children: ReactNode }) {
  const [completedEducation, setCompletedEducation] = useState<number[]>([0]);

  function toggleEducationCompletion(index: number) {
    setCompletedEducation((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  }

  const value = useMemo(
    () => ({
      completedEducation,
      toggleEducationCompletion
    }),
    [completedEducation]
  );

  return <JourneyStateContext.Provider value={value}>{children}</JourneyStateContext.Provider>;
}

export function useJourneyState() {
  const value = useContext(JourneyStateContext);

  if (!value) {
    throw new Error("useJourneyState must be used within JourneyStateProvider");
  }

  return value;
}
