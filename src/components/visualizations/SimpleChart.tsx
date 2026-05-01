import { useContext, useMemo } from "react";
import { Text, View } from "react-native";
import { evolution } from "../../restartContent";
import { ThemeContext } from "../../theme/theme";

type Props = {
  styles: Record<string, any>;
};

export function SimpleChart({ styles }: Props) {
  const { theme } = useContext(ThemeContext);
  const max = useMemo(() => Math.max(...evolution.months.map((month) => month.value)), []);
  return (
    <View style={styles.chart}>
      {evolution.months.map((month) => (
        <View key={month.label} style={styles.chartColumn}>
          <View style={[styles.chartBarWrap, { backgroundColor: theme.greenSoft }]}>
            <View style={[styles.chartBar, { height: `${(month.value / max) * 100}%`, backgroundColor: theme.green }]} />
          </View>
          <Text style={[styles.chartValue, { color: theme.text }]}>{month.value}</Text>
          <Text style={[styles.chartLabel, { color: theme.muted }]}>{month.label}</Text>
        </View>
      ))}
    </View>
  );
}
