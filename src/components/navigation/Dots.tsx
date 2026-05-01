import { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../../theme/theme";

export function Dots({ total, active, styles }: { total: number; active: number; styles: Record<string, any> }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.dots}>
      {Array.from({ length: total }).map((_, index) => (
        <View key={index} style={[styles.dot, { backgroundColor: theme.line }, active === index && { ...styles.dotActive, backgroundColor: theme.green }]} />
      ))}
    </View>
  );
}
