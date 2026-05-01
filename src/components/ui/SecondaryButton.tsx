import { Pressable, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../theme/theme";

export function SecondaryButton({
  label,
  onPress,
  danger,
  styles
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
  styles: Record<string, any>;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable onPress={onPress} style={[styles.secondaryButton, { backgroundColor: theme.card, borderColor: danger ? "#F0CDCD" : theme.line }, danger && styles.dangerButton]}>
      <Text style={[styles.secondaryButtonText, { color: danger ? theme.danger : theme.navySoft }, danger && styles.dangerText]}>{label}</Text>
    </Pressable>
  );
}
