import { ScrollView, useWindowDimensions } from "react-native";
import { EducationScreen } from "../../screens/EducationScreen";
import { colors, styles } from "../AppRoot";
import { useRouteDependencies } from "../useRouteDependencies";
import { useJourneyState } from "../../state/journeyState";
import { getResponsiveContentStyle } from "../responsive";

export default function EducationRoute() {
  const { width } = useWindowDimensions();
  const { completedEducation, toggleEducationCompletion } = useJourneyState();
  const { Header, Card, ProgressBar } = useRouteDependencies();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={[styles.appContent, getResponsiveContentStyle(width)]}>
      <EducationScreen
        completedEducation={completedEducation}
        onToggleComplete={toggleEducationCompletion}
        styles={styles}
        colors={colors}
        Header={Header}
        Card={Card}
        ProgressBar={ProgressBar}
      />
    </ScrollView>
  );
}
