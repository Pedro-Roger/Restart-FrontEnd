import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../../theme/theme";

export type PaymentRadarStatus = "urgente" | "atenção" | "monitorar";

type Props = {
  title: string;
  subtitle: string;
  amount: string;
  status: PaymentRadarStatus;
  styles: Record<string, any>;
  radarStatusStyle: (status: PaymentRadarStatus) => any;
};

export function PaymentRadarRow({ title, subtitle, amount, status, styles, radarStatusStyle }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.radarRow}>
      <View style={[styles.radarIcon, radarStatusStyle(status)]}>
        <Feather name={status === "urgente" ? "alert-circle" : status === "atenção" ? "clock" : "bell"} size={18} color="#FFFFFF" />
      </View>
      <View style={styles.radarCopy}>
        <Text style={[styles.rowTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.rowSubtitle, { color: theme.muted }]}>{subtitle}</Text>
      </View>
      <Text style={[styles.radarAmount, { color: theme.text }]}>{amount}</Text>
    </View>
  );
}
