import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

export function RecoveryScreen({ onBack, onContinue, styles }: { onBack: () => void; onContinue: () => void; styles: Record<string, any> }) {
  return (
    <ScrollView style={styles.authOtpScreen} contentContainerStyle={styles.authOtpContent}>
      <Pressable onPress={onBack} style={styles.authBackButton}>
        <Feather name="chevron-left" size={18} color="#64748B" />
      </Pressable>
      <Text style={styles.authOtpTitle}>Inserir código</Text>
      <Text style={styles.authOtpText}>
        Enviamos um código de acesso para <Text style={styles.authOtpTextStrong}>mariana@email.com</Text>
      </Text>
      <View style={styles.authOtpDots}>
        {["7", "5", "9", ""].map((item, index) => (
          <View key={`${item}-${index}`} style={styles.authOtpDot}>
            <Text style={styles.authOtpDotText}>{item}</Text>
          </View>
        ))}
      </View>
      <Pressable onPress={onContinue} style={styles.authPrimaryCta}>
        <Text style={styles.authPrimaryCtaText}>Continuar</Text>
      </Pressable>
      <View style={styles.authFooterRow}>
        <Text style={styles.authFooterText}>Não recebeu?</Text>
        <Text style={styles.authFooterLink}> Reenviar código</Text>
      </View>
    </ScrollView>
  );
}
