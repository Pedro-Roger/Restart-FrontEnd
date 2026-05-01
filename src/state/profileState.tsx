import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { darkTheme, lightTheme, ThemeContext, type ThemeMode } from "../theme/theme";

type ProfileStateValue = {
  themeMode: ThemeMode;
  theme: typeof lightTheme;
  toggleTheme: () => void;
};

const ProfileStateContext = createContext<ProfileStateValue | null>(null);

export function ProfileStateProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  function toggleTheme() {
    setThemeMode((current) => (current === "light" ? "dark" : "light"));
  }

  const value = useMemo(
    () => ({
      themeMode,
      theme,
      toggleTheme
    }),
    [themeMode, theme]
  );

  return (
    <ProfileStateContext.Provider value={value}>
      <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>{children}</ThemeContext.Provider>
    </ProfileStateContext.Provider>
  );
}

export function useProfileState() {
  const value = useContext(ProfileStateContext);

  if (!value) {
    throw new Error("useProfileState must be used within ProfileStateProvider");
  }

  return value;
}
