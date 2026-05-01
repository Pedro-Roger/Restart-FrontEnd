import { Feather } from "@expo/vector-icons";
import { type ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export function SignupScreen({
  onBack,
  onCreate,
  styles,
  AuthTopPanel,
  SocialAuthRow,
  AuthDivider,
  AuthField
}: {
  onBack: () => void;
  onCreate: () => void;
  styles: Record<string, any>;
  AuthTopPanel: () => ReactNode;
  SocialAuthRow: () => ReactNode;
  AuthDivider: () => ReactNode;
  AuthField: (props: { label: string; placeholder: string; secure?: boolean }) => ReactNode;
}) {
  return (
    <ScrollView style={styles.authFlowScreen} contentContainerStyle={styles.authFlowContent}>
      <AuthTopPanel />
      <View style={styles.authCardShell}>
        <Text style={styles.authPanelTitle}>Criar sua conta</Text>
        <SocialAuthRow />
        <AuthDivider />
        <AuthField label="Nome" placeholder="Seu nome" />
        <AuthField label="E-mail" placeholder="Digite seu endereço" />
        <AuthField label="Senha" placeholder="Digite sua senha" secure />
        <View style={styles.authTermsRow}>
          <View style={styles.authTermsCheck}>
            <Feather name="check" size={12} color="#FFFFFF" />
          </View>
          <Text style={styles.authTermsText}>Concordo com os Termos de Uso e Política de Privacidade</Text>
        </View>
        <Pressable onPress={onCreate} style={styles.authPrimaryCta}>
          <Text style={styles.authPrimaryCtaText}>Criar conta</Text>
        </Pressable>
        <Pressable onPress={onBack} style={styles.authSecondaryCta}>
          <Text style={styles.authSecondaryCtaText}>Voltar para login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
