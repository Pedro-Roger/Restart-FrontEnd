import { Pressable, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../theme/theme";

export function PrimaryButton({
  label,
  onPress,
  compact,
  styles
}: {
  label: string;
  onPress: () => void;
  compact?: boolean;
  styles: Record<string, any>;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable onPress={onPress} style={[styles.primaryButton, { backgroundColor: theme.green }, compact && styles.compactButton]}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}
