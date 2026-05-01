import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { useContext, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { bankConnection, dashboard, gamification, openFinanceBanks, payments, user } from "../restartContent";
import { ThemeContext } from "../theme/theme";

type HelperProps = {
  icon: any;
  title: string;
  subtitle: string;
};

type RadarProps = {
  title: string;
  subtitle: string;
  amount: string;
  status: "urgente" | "atenção" | "monitorar";
};

type MiniCardProps = {
  title: string;
  value: string;
  icon: any;
};

type Props = {
  consentActive: boolean;
  onJourney: () => void;
  onOpenFinance: () => void;
  styles: Record<string, any>;
  Header: (props: { title: string; subtitle: string }) => ReactNode;
  Card: (props: { children: ReactNode; accent?: boolean }) => ReactNode;
  ProgressBar: (props: { value: number }) => ReactNode;
  Badge: (props: { label: string; tone: "success" | "progress" | "warning" | "locked" }) => ReactNode;
  PaymentRadarRow: (props: RadarProps) => ReactNode;
  SectionRow: (props: HelperProps) => ReactNode;
  MiniCard: (props: MiniCardProps) => ReactNode;
  PrimaryButton: (props: { label: string; onPress: () => void; compact?: boolean }) => ReactNode;
};

export function HomeScreen({
  consentActive,
  onJourney,
  onOpenFinance,
  styles,
  Header,
  Card,
  ProgressBar,
  Badge,
  PaymentRadarRow,
  SectionRow,
  MiniCard,
  PrimaryButton
}: Props) {
  const { theme } = useContext(ThemeContext);
  const [selectedBankId, setSelectedBankId] = useState<(typeof openFinanceBanks)[number]["id"]>(
    openFinanceBanks[0].id
  );
  const selectedBank = openFinanceBanks.find((bank) => bank.id === selectedBankId) ?? openFinanceBanks[0];

  return (
    <View style={styles.homeScreen}>
      <Header title={`Olá, ${user.name}`} subtitle={`Dados sincronizados do ${selectedBank.name}`} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bankSwitcherRow}
        style={styles.bankSwitcherScroll}
      >
        {openFinanceBanks.map((bank) => {
          const active = bank.id !== "add" && bank.id === selectedBankId;
          return (
            <Pressable
              key={bank.id}
              onPress={() => {
                if (bank.id !== "add") {
                  setSelectedBankId(bank.id);
                }
                onOpenFinance();
              }}
              style={[
                styles.bankChip,
                {
                  backgroundColor: active ? theme.glassStrong : theme.glass,
                  borderColor: active ? theme.glassAccentBorder : theme.glassBorder
                }
              ]}
            >
              <View
                style={[
                  styles.bankChipBadge,
                  { backgroundColor: active ? theme.navySoft : "rgba(255,255,255,0.10)" }
                ]}
              >
                <Text style={styles.bankChipBadgeText}>{bank.shortName}</Text>
              </View>
              <Text style={[styles.bankChipText, { color: theme.text }]}>{bank.id === "add" ? "+" : bank.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <LinearGradient
        colors={[theme.gold, "#F6E27A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroFinanceCard}
      >
        <View style={[styles.heroWave, styles.heroWarmWave]} />
        <View style={styles.accountHeroHeader}>
          <View>
            <Text style={styles.accountEyebrow}>Conta</Text>
            <Text style={styles.cardTitle}>{selectedBank.name}</Text>
          </View>
          <Feather name="chevron-right" size={22} color={theme.navy} />
        </View>
        <Text style={styles.accountBalanceLabel}>Saldo em conta</Text>
        <Text style={styles.accountBalanceValue}>{selectedBank.balance}</Text>
        <Text style={styles.accountConnectionText}>{selectedBank.accountLabel}</Text>
        <View style={styles.accountMetricsRow}>
          <View style={styles.accountMetricPill}>
            <Text style={styles.accountMetricLabel}>Crédito disponível</Text>
            <Text style={styles.accountMetricValue}>{selectedBank.availableCredit}</Text>
          </View>
          <View style={styles.accountMetricPill}>
            <Text style={styles.accountMetricLabel}>Limite do cartão</Text>
            <Text style={styles.accountMetricValue}>{selectedBank.creditCardLimit}</Text>
          </View>
        </View>
        <Pressable onPress={onOpenFinance} style={styles.accountPrimaryAction}>
          <Text style={styles.accountPrimaryActionText}>Ver dados de outro banco</Text>
        </Pressable>
      </LinearGradient>
      <Card accent>
        <View style={styles.relationshipScoreHeader}>
          <View>
            <Text style={styles.cardTitle}>Score de relacionamento</Text>
            <Text style={styles.cardHint}>{selectedBank.name}</Text>
          </View>
          <Text style={styles.relationshipScoreValue}>{selectedBank.relationshipScore}</Text>
        </View>
        <ProgressBar value={selectedBank.relationshipScore} />
        <Text style={styles.relationshipScoreText}>{selectedBank.relationshipLabel}</Text>
      </Card>
      <Card>
        <SectionRow icon="briefcase" title={selectedBank.accountType} subtitle={selectedBank.lastSync} />
        {selectedBank.products.map((product) => (
          <SectionRow key={product} icon="check-circle" title={product} subtitle="Produto importado com seu consentimento" />
        ))}
      </Card>
      <Card accent>
        <View style={styles.progressHeader}>
          <Text style={styles.cardTitle}>Radar de contas a pagar</Text>
          <Badge label={`${payments.radar.length} alertas`} tone="warning" />
        </View>
        {payments.radar.slice(0, 3).map((item) => (
          <PaymentRadarRow
            key={item.title}
            title={item.title}
            subtitle={item.dueIn}
            amount={item.amount}
            status={item.status as "urgente" | "atenção" | "monitorar"}
          />
        ))}
      </Card>
      <Card>
        <SectionRow icon="target" title="Próxima missão" subtitle={dashboard.nextMission} />
        <PrimaryButton label="Ver jornada" onPress={onJourney} compact />
      </Card>
      <Card>
        <SectionRow icon="bar-chart-2" title={dashboard.ratingCardTitle} subtitle={dashboard.guidance} />
        <Pressable onPress={onOpenFinance}>
          <SectionRow
            icon={consentActive ? "shield" : "alert-triangle"}
            title="Open Finance"
            subtitle={consentActive ? bankConnection.connectedLabel : bankConnection.pendingLabel}
          />
        </Pressable>
      </Card>
      <View style={styles.grid}>
        <MiniCard title="RA Restart" value={`${user.rating}`} icon="activity" />
        <MiniCard title="Limite usado" value={selectedBank.usedLimit} icon="credit-card" />
      </View>
      <Card accent>
        <SectionRow icon="star" title="Conquista" subtitle={gamification.achievement} />
        <SectionRow icon="activity" title="Sequência" subtitle={gamification.streak} />
        <Text style={styles.rewardText}>{gamification.nextReward}</Text>
      </Card>
      <View style={styles.grid}>
        <MiniCard title="Último pagamento" value={dashboard.lastPayment} icon="check-circle" />
        <MiniCard title="Banco parceiro" value={user.bank} icon="briefcase" />
      </View>
      <Card>
        <SectionRow icon="book-open" title="Dicas para evoluir" subtitle={dashboard.tip} />
      </Card>
    </View>
  );
}
