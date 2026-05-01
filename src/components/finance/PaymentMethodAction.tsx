import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import type { IconName } from "../../restartContent";
import { ThemeContext } from "../../theme/theme";

type Props = {
  icon: IconName;
  label: string;
  styles: Record<string, any>;
};

export function PaymentMethodAction({ icon, label, styles }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable style={[styles.paymentMethodAction, { backgroundColor: theme.elevated, borderColor: theme.line }]}>
      <View style={[styles.paymentMethodIcon, { backgroundColor: theme.greenSoft }]}>
        <Feather name={icon} size={18} color={theme.green} />
      </View>
      <Text style={[styles.paymentMethodText, { color: theme.text }]}>{label}</Text>
    </Pressable>
  );
}
