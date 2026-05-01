import { type ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export function SigninScreen({
  onBack,
  onCreate,
  onEnter,
  onRecovery,
  styles,
  AuthTopPanel,
  SocialAuthRow,
  AuthDivider,
  AuthField
}: {
  onBack: () => void;
  onCreate: () => void;
  onEnter: () => void;
  onRecovery: () => void;
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
        <Text style={styles.authPanelTitle}>Entrar na sua conta</Text>
        <SocialAuthRow />
        <AuthDivider />
        <AuthField label="E-mail" placeholder="Digite seu endereço" />
        <AuthField label="Senha" placeholder="Digite sua senha" secure />
        <Pressable onPress={onRecovery} style={styles.authInlineLinkWrap}>
          <Text style={styles.authInlineLink}>Esqueceu a senha?</Text>
        </Pressable>
        <Pressable onPress={onEnter} style={styles.authPrimaryCta}>
          <Text style={styles.authPrimaryCtaText}>Entrar</Text>
        </Pressable>
        <Pressable onPress={onBack} style={styles.authSecondaryCta}>
          <Text style={styles.authSecondaryCtaText}>Voltar</Text>
        </Pressable>
        <Pressable onPress={onCreate} style={styles.authFooterRow}>
          <Text style={styles.authFooterText}>Ainda não tem conta?</Text>
          <Text style={styles.authFooterLink}> Criar conta</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
