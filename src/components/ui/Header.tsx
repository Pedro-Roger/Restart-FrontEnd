import type { ReactNode } from "react";
import { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../../theme/theme";

type Props = {
  title: string;
  subtitle: string;
  styles: Record<string, any>;
  renderThemeToggle: () => ReactNode;
};

export function Header({ title, subtitle, styles, renderThemeToggle }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.headerCopy}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.headerSubtitle, { color: theme.muted }]}>{subtitle}</Text>
        </View>
        {renderThemeToggle()}
      </View>
    </View>
  );
}
