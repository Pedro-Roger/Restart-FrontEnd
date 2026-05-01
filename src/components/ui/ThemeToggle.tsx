import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../theme/theme";

export function ThemeToggle({ styles }: { styles: Record<string, any> }) {
  const { theme, themeMode, toggleTheme } = useContext(ThemeContext);
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: themeMode === "dark" }}
      onPress={toggleTheme}
      style={[styles.themeToggle, { backgroundColor: theme.card, borderColor: theme.line }]}
    >
      <Feather name={themeMode === "dark" ? "moon" : "sun"} size={17} color={theme.green} />
    </Pressable>
  );
}
