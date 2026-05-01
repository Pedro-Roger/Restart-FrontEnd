import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../../theme/theme";
import type { IconName } from "../../restartContent";

type Props = {
  icon: IconName;
  title: string;
  subtitle: string;
  styles: Record<string, any>;
};

export function SectionRow({ icon, title, subtitle, styles }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.sectionRow}>
      <View style={[styles.rowIcon, { backgroundColor: theme.greenSoft }]}>
        <Feather name={icon} size={18} color={theme.green} />
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.rowSubtitle, { color: theme.muted }]}>{subtitle}</Text>
      </View>
    </View>
  );
}
