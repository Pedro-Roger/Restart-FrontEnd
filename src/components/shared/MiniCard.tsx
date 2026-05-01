import { Feather } from "@expo/vector-icons";
import { useContext, type ReactNode } from "react";
import { Text } from "react-native";
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
    <AnimatedCard style={styles.miniCard}>
      <Feather name={icon} size={21} color={theme.green} />
      <Text style={[styles.miniTitle, { color: theme.muted }]}>{title}</Text>
      <Text style={[styles.miniValue, { color: theme.text }]}>{value}</Text>
    </AnimatedCard>
  );
}
