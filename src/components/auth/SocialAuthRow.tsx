import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export function SocialAuthRow({ styles }: { styles: Record<string, any> }) {
  return (
    <View style={styles.authSocialRow}>
      <Pressable style={styles.authSocialButton}>
        <Feather name="facebook" size={16} color="#1877F2" />
        <Text style={styles.authSocialButtonText}>Facebook</Text>
      </Pressable>
      <Pressable style={styles.authSocialButton}>
        <Feather name="chrome" size={16} color="#EA4335" />
        <Text style={styles.authSocialButtonText}>Google</Text>
      </Pressable>
    </View>
  );
}
