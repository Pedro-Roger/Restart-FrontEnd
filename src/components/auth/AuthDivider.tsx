import { Text, View } from "react-native";

export function AuthDivider({ styles }: { styles: Record<string, any> }) {
  return (
    <View style={styles.authDividerRow}>
      <View style={styles.authDividerLine} />
      <Text style={styles.authDividerText}>Ou</Text>
      <View style={styles.authDividerLine} />
    </View>
  );
}
