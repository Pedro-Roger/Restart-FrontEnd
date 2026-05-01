import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { Text, View } from "react-native";
import type { IconName } from "../../restartContent";
import { ThemeContext } from "../../theme/theme";

export function Illustration({ icon, step, styles }: { icon: IconName; step: number; styles: Record<string, any> }) {
  const { theme } = useContext(ThemeContext);
  return (
    <LinearGradient
      colors={[theme.purple, theme.navySoft]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.illustration, { borderColor: theme.line }]}
    >
      <View style={styles.illustrationWave} />
      <View style={[styles.stepBadge, { backgroundColor: theme.greenSoft }]}>
        <Text style={[styles.stepText, { color: theme.green }]}>0{step}</Text>
      </View>
      <Feather name={icon} size={70} color="#FFFFFF" />
      <View style={styles.fakeChart}>
        {[30, 48, 66, 84].map((height, index) => (
          <View key={height} style={[styles.fakeBar, { height, backgroundColor: index === 3 ? theme.gold : "#FFFFFF" }]} />
        ))}
      </View>
    </LinearGradient>
  );
}
