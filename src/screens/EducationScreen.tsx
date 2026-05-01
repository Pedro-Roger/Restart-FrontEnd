import { Feather } from "@expo/vector-icons";
import { useContext, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { educationCards } from "../restartContent";
import { ThemeContext } from "../theme/theme";

type Props = {
  completedEducation: number[];
  onToggleComplete: (index: number) => void;
  styles: Record<string, any>;
  colors: { green: string };
  Header: (props: { title: string; subtitle: string }) => ReactNode;
  Card: (props: { children: ReactNode; accent?: boolean }) => ReactNode;
  ProgressBar: (props: { value: number }) => ReactNode;
};

export function EducationScreen({ completedEducation, onToggleComplete, styles, colors, Header, Card, ProgressBar }: Props) {
  const { theme } = useContext(ThemeContext);
  const averageProgress = Math.round(
    educationCards.reduce((sum, card, index) => {
      const progress = completedEducation.includes(index) ? 100 : card.progress;
      return sum + progress;
    }, 0) / educationCards.length
  );

  return (
    <View>
      <Header title="Educação Financeira" subtitle="Conteúdos curtos, simples e úteis" />
      <Card>
        <View style={styles.progressHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Progresso de leitura</Text>
          <Text style={styles.progressValue}>{averageProgress}%</Text>
        </View>
        <ProgressBar value={averageProgress} />
      </Card>
      {educationCards.map((card, index) => (
        <Card key={card.title}>
          <View style={styles.educationHeader}>
            <Feather name="file-text" size={22} color={colors.green} />
            <Text style={[styles.timeText, { color: theme.muted }]}>{card.time}</Text>
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{card.title}</Text>
          <Text style={[styles.cardText, { color: theme.muted }]}>{card.text}</Text>
          <ProgressBar value={completedEducation.includes(index) ? 100 : card.progress} />
          <Pressable onPress={() => onToggleComplete(index)} style={styles.educationAction}>
            <Text style={styles.educationActionText}>
              {completedEducation.includes(index) ? "Concluído" : card.cta}
            </Text>
          </Pressable>
        </Card>
      ))}
    </View>
  );
}
