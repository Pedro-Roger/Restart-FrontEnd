import { Feather } from "@expo/vector-icons";
import { useContext, type ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { openFinanceManagement } from "../restartContent";
import { ThemeContext } from "../theme/theme";

export function OpenFinanceManagementScreen({
  onBack,
  styles,
  Card
}: {
  onBack: () => void;
  styles: Record<string, any>;
  Card: (props: { children: ReactNode; accent?: boolean }) => ReactNode;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <View>
      <View style={[styles.openFinanceHero, { backgroundColor: theme.card }]}>
        <Text style={[styles.openFinanceTitle, { color: theme.text }]}>{openFinanceManagement.title}</Text>
        <Pressable style={styles.openFinanceConnectButton}>
          <Feather name="plus" size={24} color="#FFFFFF" />
          <Text style={styles.openFinanceConnectText}>{openFinanceManagement.connectLabel}</Text>
        </Pressable>
        <Pressable onPress={onBack} style={styles.openFinanceBackLower}>
          <Feather name="chevron-left" size={22} color={theme.text} />
          <Text style={[styles.rowTitle, { color: theme.text }]}>Voltar</Text>
        </Pressable>
      </View>
      <Card accent>
        <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 18 }]}>{openFinanceManagement.benefitsTitle}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.openFinanceBenefitsRow}>
          {openFinanceManagement.benefits.map((benefit) => (
            <View key={benefit.title} style={styles.openFinanceBenefitCard}>
              <Text style={styles.openFinanceBenefitTitle}>{benefit.title}</Text>
              <View style={styles.openFinanceBenefitIconWrap}>
                <Feather name={benefit.icon} size={42} color="#8EE6D4" />
              </View>
              <Text style={styles.openFinanceBenefitText}>{benefit.text}</Text>
            </View>
          ))}
        </ScrollView>
      </Card>
      <Card>
        <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 12 }]}>{openFinanceManagement.sectionsTitle}</Text>
        {openFinanceManagement.items.map((item) => (
          <View key={item.title} style={styles.openFinanceManageRow}>
            <View style={styles.openFinanceManageIcon}>
              <Feather name={item.icon} size={22} color="#FFFFFF" />
            </View>
            <View style={styles.openFinanceManageCopy}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.rowSubtitle, { color: theme.muted }]}>{item.subtitle}</Text>
            </View>
            <Feather name="chevron-right" size={22} color={theme.muted} />
          </View>
        ))}
      </Card>
    </View>
  );
}
