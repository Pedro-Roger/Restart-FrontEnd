import { Feather } from "@expo/vector-icons";
import { useContext, type ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";
import { bankConnection } from "../../restartContent";
import { ThemeContext } from "../../theme/theme";

export function BankConnectionScreen({
  consentActive,
  onToggleConsent,
  onConnect,
  styles,
  colors,
  BrandHeader,
  Card,
  SectionRow,
  InfoStrip,
  PrimaryButton,
  SecondaryButton
}: {
  consentActive: boolean;
  onToggleConsent: () => void;
  onConnect: () => void;
  styles: Record<string, any>;
  colors: { navy: string };
  BrandHeader: (props: { subtitle: string; centered?: boolean }) => ReactNode;
  Card: (props: { children: ReactNode; accent?: boolean }) => ReactNode;
  SectionRow: (props: { icon: any; title: string; subtitle: string }) => ReactNode;
  InfoStrip: (props: { icon: any; text: string }) => ReactNode;
  PrimaryButton: (props: { label: string; onPress: () => void; compact?: boolean }) => ReactNode;
  SecondaryButton: (props: { label: string; onPress: () => void; danger?: boolean }) => ReactNode;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.bg }]} contentContainerStyle={styles.formScreen}>
      <BrandHeader subtitle="Open Finance com transparência" centered />
      <Text style={[styles.pageTitle, { color: theme.text }]}>{bankConnection.title}</Text>
      <Text style={[styles.pageText, { color: theme.muted }]}>{bankConnection.text}</Text>
      <Card accent>
        <Text style={styles.cardTitle}>{bankConnection.consentTitle}</Text>
        {bankConnection.dataPoints.map((item) => (
          <SectionRow key={item} icon="check-circle" title={item} subtitle="Compartilhamento autorizado por você" />
        ))}
      </Card>
      <Card>
        <View style={styles.bankHeader}>
          <View style={styles.bankIcon}>
            <Feather name="briefcase" size={24} color={colors.navy} />
          </View>
          <View>
            <Text style={styles.cardTitle}>{bankConnection.bank}</Text>
            <Text style={styles.cardHint}>Banco parceiro Restart</Text>
          </View>
        </View>
      </Card>
      <InfoStrip icon={consentActive ? "check-circle" : "alert-circle"} text={consentActive ? bankConnection.connectedLabel : bankConnection.pendingLabel} />
      <Text style={styles.privacyText}>{bankConnection.privacy}</Text>
      <PrimaryButton label="Conectar via Open Finance" onPress={onConnect} />
      <SecondaryButton label={bankConnection.revokeLabel} onPress={onToggleConsent} />
    </ScrollView>
  );
}
