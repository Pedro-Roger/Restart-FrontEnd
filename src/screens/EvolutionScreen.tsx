import type { ReactNode } from "react";
import { View, Text } from "react-native";
import { evolution } from "../restartContent";

type Props = {
  styles: Record<string, any>;
  Header: (props: { title: string; subtitle: string }) => ReactNode;
  Card: (props: { children: ReactNode; accent?: boolean }) => ReactNode;
  SimpleChart: () => ReactNode;
  MiniCard: (props: { title: string; value: string; icon: any }) => ReactNode;
  InfoStrip: (props: { icon: any; text: string }) => ReactNode;
};

export function EvolutionScreen({ styles, Header, Card, SimpleChart, MiniCard, InfoStrip }: Props) {
  return (
    <View>
      <Header title="Evolução" subtitle="Seu avanço fica claro mês a mês" />
      <Card>
        <Text style={styles.cardTitle}>RA mensal</Text>
        <SimpleChart />
      </Card>
      <View style={styles.grid}>
        {evolution.indicators.map((indicator) => (
          <MiniCard key={indicator.label} title={indicator.label} value={indicator.value} icon="activity" />
        ))}
      </View>
      <InfoStrip icon="eye" text={evolution.message} />
    </View>
  );
}
