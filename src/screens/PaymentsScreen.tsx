import { Feather } from "@expo/vector-icons";
import { useContext, type ReactNode } from "react";
import { Text, View } from "react-native";
import { openFinanceSnapshot, payments } from "../restartContent";
import { ThemeContext } from "../theme/theme";
import type { PaymentRadarStatus } from "../components/finance/PaymentRadarRow";

type Props = {
  styles: Record<string, any>;
  Header: (props: { title: string; subtitle: string }) => ReactNode;
  Card: (props: { children: ReactNode; accent?: boolean }) => ReactNode;
  Badge: (props: { label: string; tone: "success" | "progress" | "warning" | "locked" }) => ReactNode;
  PaymentMethodAction: (props: { icon: any; label: string }) => ReactNode;
  PaymentRadarRow: (props: { title: string; subtitle: string; amount: string; status: PaymentRadarStatus }) => ReactNode;
  InfoStrip: (props: { icon: any; text: string }) => ReactNode;
};

export function PaymentsScreen({ styles, Header, Card, Badge, PaymentMethodAction, PaymentRadarRow, InfoStrip }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View>
      <Header title="Pagamentos" subtitle="Radar do CPF para evitar atrasos e esquecer vencimentos" />
      <Card accent>
        <View style={styles.paymentTop}>
          <View>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Mensalidade Restart</Text>
            <Text style={[styles.bigValue, { color: theme.text }]}>{payments.monthlyFee}</Text>
          </View>
          <View style={styles.paymentSuccessBadge}>
            <Feather name="check-circle" size={16} color="#16A34A" />
            <Text style={styles.paymentSuccessBadgeText}>paga</Text>
          </View>
        </View>
        <View style={styles.paymentSuccessRow}>
          <View style={styles.paymentSuccessIconWrap}>
            <Feather name="check" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.paymentSuccessText}>Mensalidade paga com sucesso</Text>
        </View>
      </Card>
      <Card>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Pagar com</Text>
        <View style={styles.paymentMethodBar}>
          <PaymentMethodAction icon="file-text" label="Boleto" />
          <PaymentMethodAction icon="zap" label="PIX" />
          <PaymentMethodAction icon="maximize" label="QR Code" />
        </View>
      </Card>
      <Card>
        <View style={styles.paymentRadarHeader}>
          <View style={styles.paymentRadarCopy}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Radar de contas a pagar</Text>
            <Text style={[styles.paymentRadarUpdated, { color: theme.green }]}>{openFinanceSnapshot.lastSync}</Text>
          </View>
          <Feather name="refresh-cw" size={18} color={theme.green} />
        </View>
        {payments.radar.map((item) => (
          <PaymentRadarRow key={item.title} title={item.title} subtitle={item.dueIn} amount={item.amount} status={item.status as PaymentRadarStatus} />
        ))}
      </Card>
      <Card>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Histórico</Text>
        {payments.history.map((item) => (
          <View key={item.month} style={styles.historyRow}>
            <Text style={styles.historyMonth}>{item.month}</Text>
            <Text style={styles.historyAmount}>{item.amount}</Text>
            <Badge label={item.status} tone="success" />
          </View>
        ))}
      </Card>
      <InfoStrip icon="trending-up" text={payments.message} />
    </View>
  );
}
