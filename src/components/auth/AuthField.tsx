import { Feather } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";

export function AuthField({
  label,
  placeholder,
  secure,
  styles
}: {
  label: string;
  placeholder: string;
  secure?: boolean;
  styles: Record<string, any>;
}) {
  return (
    <View style={styles.authFieldWrap}>
      <Text style={styles.authFieldLabel}>{label}</Text>
      <View style={styles.authFieldBox}>
        <TextInput placeholder={placeholder} placeholderTextColor="#9AA4B2" secureTextEntry={secure} style={styles.authFieldInput} />
        {secure ? <Feather name="eye-off" size={16} color="#94A3B8" /> : null}
      </View>
    </View>
  );
}
