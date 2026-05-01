import { Feather } from "@expo/vector-icons";
import { useContext, type ReactNode } from "react";
import { Text, View } from "react-native";
import { missions, type MissionStatus } from "../../restartContent";
import { ThemeContext } from "../../theme/theme";

type Props = {
  styles: Record<string, any>;
  statusDotStyle: (status: MissionStatus) => any;
  statusIcon: (status: MissionStatus) => any;
  Badge: (props: { label: string; tone: "success" | "progress" | "warning" | "locked" }) => ReactNode;
  Card: (props: { children: ReactNode; accent?: boolean }) => ReactNode;
};

export function MissionTimeline({ styles, statusDotStyle, statusIcon, Badge, Card }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View>
      {missions.map((mission, index) => (
        <Card key={mission.title}>
          <View style={styles.missionRow}>
            <View style={styles.timelineRail}>
              <View style={[styles.timelineDot, statusDotStyle(mission.status)]}>
                <Feather name={statusIcon(mission.status)} size={14} color="#FFFFFF" />
              </View>
              {index < missions.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <View style={styles.missionBody}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{mission.title}</Text>
              <Text style={[styles.cardText, { color: theme.muted }]}>{mission.description}</Text>
              <Badge label={mission.status} tone={mission.status === "concluída" ? "success" : mission.status === "em andamento" ? "progress" : "locked"} />
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
}
