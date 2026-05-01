import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, View } from "react-native";
import type { IconName } from "../../restartContent";
import { ThemeContext, darkTheme } from "../../theme/theme";

type Props = {
  icon: IconName;
  text: string;
  styles: Record<string, any>;
};

export function InfoStrip({ icon, text, styles }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.infoStrip, { backgroundColor: theme.gold === darkTheme.gold ? "#2D2817" : "#FFF6DA" }]}>
      <Feather name={icon} size={18} color={theme.gold} />
      <Text style={[styles.infoText, { color: theme.text }]}>{text}</Text>
    </View>
  );
}
