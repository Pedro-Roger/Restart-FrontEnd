import { Text } from "react-native";

type Props = {
  label: string;
  tone: "success" | "progress" | "warning" | "locked";
  styles: Record<string, any>;
  badgeStyle: (tone: "success" | "progress" | "warning" | "locked") => any;
};

export function Badge({ label, tone, styles, badgeStyle }: Props) {
  return <Text style={[styles.badge, badgeStyle(tone)]}>{label}</Text>;
}
