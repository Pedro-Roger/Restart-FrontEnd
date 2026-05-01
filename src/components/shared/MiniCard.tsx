import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, type ReactNode } from "react";
import { Text, View } from "react-native";
import type { IconName } from "../../restartContent";
import { ThemeContext } from "../../theme/theme";

type Props = {
  title: string;
  value: string;
  icon: IconName;
  styles: Record<string, any>;
  AnimatedCard: (props: { children: ReactNode; style?: any }) => ReactNode;
};

export function MiniCard({ title, value, icon, styles, AnimatedCard }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <AnimatedCard
      style={[
        styles.miniCard,
        {
          backgroundColor: theme.glass,
          borderColor: theme.glassBorder
        }
      ]}
    >
      <LinearGradient
        colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.02)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.miniCardTint}
      />
      <View style={styles.miniCardHighlight} />
      <View style={styles.miniCardContent}>
        <Feather name={icon} size={21} color={theme.green} />
        <Text style={[styles.miniTitle, { color: theme.muted }]}>{title}</Text>
        <Text style={[styles.miniValue, { color: theme.text }]}>{value}</Text>
      </View>
    </AnimatedCard>
  );
}
