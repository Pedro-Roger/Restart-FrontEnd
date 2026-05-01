import { createContext } from "react";

export type ThemeMode = "light" | "dark";

export const fontFamily = {
  body: "SpaceGrotesk_400Regular",
  heading: "SpaceGrotesk_700Bold"
} as const;

export const lightTheme = {
  navy: "#163A7A",
  navySoft: "#2F6BFF",
  green: "#2F6BFF",
  greenSoft: "#EAF2FF",
  purple: "#1D4ED8",
  purpleSoft: "#E8F0FF",
  gold: "#8EB4FF",
  bg: "#F7FAFF",
  card: "#FFFFFF",
  text: "#1B2B4B",
  muted: "#6C7E9C",
  line: "#DCE6F5",
  danger: "#D95B5B",
  elevated: "#FFFFFF",
  tab: "#FFFFFF"
};

export const darkTheme = {
  navy: "#DCE8FF",
  navySoft: "#2F6BFF",
  green: "#2F6BFF",
  greenSoft: "#1C315A",
  purple: "#5B8CFF",
  purpleSoft: "#1B2842",
  gold: "#7EA8FF",
  bg: "#101A2B",
  card: "#162235",
  text: "#FFFFFF",
  muted: "#D2DDF0",
  line: "#2A3956",
  danger: "#FF7E7E",
  elevated: "#1A2840",
  tab: "#132038"
};

export type AppTheme = typeof lightTheme;

export const ThemeContext = createContext({
  theme: lightTheme,
  themeMode: "light" as ThemeMode,
  toggleTheme: (): void => undefined
});
