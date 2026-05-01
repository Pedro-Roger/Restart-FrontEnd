import { useContext, type ReactNode } from "react";
import { Text, View } from "react-native";
import { missions } from "../restartContent";
import { ThemeContext } from "../theme/theme";

type Props = {
  styles: Record<string, any>;
  Header: (props: { title: string; subtitle: string }) => ReactNode;
  Card: (props: { children: ReactNode; accent?: boolean }) => ReactNode;
  ProgressBar: (props: { value: number }) => ReactNode;
  MissionTimeline: () => ReactNode;
};

export function JourneyScreen({ styles, Header, Card, ProgressBar, MissionTimeline }: Props) {
  const { theme } = useContext(ThemeContext);
  const completed = missions.filter((mission) => mission.status === "concluída").length;
  return (
    <View>
      <Header title="Jornada Financeira" subtitle="Complete missões e avance passo a passo" />
      <Card>
        <View style={styles.progressHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Progresso geral</Text>
          <Text style={styles.progressValue}>{completed}/{missions.length}</Text>
        </View>
        <ProgressBar value={(completed / missions.length) * 100} />
      </Card>
      <MissionTimeline />
    </View>
  );
}
