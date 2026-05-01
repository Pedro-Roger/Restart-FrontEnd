import { createContext } from "react";

export type ThemeMode = "light" | "dark";

export const fontFamily = {
  body: "SpaceGrotesk_400Regular",
  heading: "SpaceGrotesk_700Bold"
} as const;

export const lightTheme = {
  navy: "#0D1424",
  navySoft: "#2E7BFF",
  green: "#3B82FF",
  greenSoft: "#1A2540",
  purple: "#4B67FF",
  purpleSoft: "#1E2B4D",
  gold: "#6FA7FF",
  bg: "#0A1222",
  card: "#121D33",
  text: "#EAF1FF",
  muted: "#97A6C5",
  line: "#263655",
  danger: "#FF6C79",
  elevated: "#182540",
  tab: "rgba(11, 20, 37, 0.88)",
  glass: "rgba(17, 28, 49, 0.72)",
  glassStrong: "rgba(23, 38, 66, 0.84)",
  glassSoft: "rgba(96, 141, 255, 0.16)",
  glassBorder: "rgba(255,255,255,0.12)",
  glassAccentBorder: "rgba(126, 179, 255, 0.34)"
};

export const darkTheme = {
  navy: "#F2F6FF",
  navySoft: "#5AA3FF",
  green: "#4D8FFF",
  greenSoft: "#223253",
  purple: "#7D9CFF",
  purpleSoft: "#1F304F",
  gold: "#8CB8FF",
  bg: "#060D1A",
  card: "#111B30",
  text: "#FFFFFF",
  muted: "#B2C0DC",
  line: "#2B3E61",
  danger: "#FF8891",
  elevated: "#182744",
  tab: "rgba(10, 18, 34, 0.9)",
  glass: "rgba(15, 25, 45, 0.76)",
  glassStrong: "rgba(22, 38, 68, 0.88)",
  glassSoft: "rgba(110, 163, 255, 0.18)",
  glassBorder: "rgba(255,255,255,0.13)",
  glassAccentBorder: "rgba(144, 189, 255, 0.36)"
};

export type AppTheme = typeof lightTheme;

export const ThemeContext = createContext({
  theme: lightTheme,
  themeMode: "light" as ThemeMode,
  toggleTheme: (): void => undefined
});
