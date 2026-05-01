import { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../../theme/theme";

type Props = {
  value: number;
  styles: Record<string, any>;
};

export function CircularProgress({ value, styles }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.circularOuter, { borderColor: theme.green, backgroundColor: theme.card }]}>
      <View style={styles.circularInner}>
        <Text style={[styles.circularValue, { color: theme.text }]}>{value}</Text>
        <Text style={[styles.circularLabel, { color: theme.muted }]}>RA</Text>
      </View>
    </View>
  );
}
