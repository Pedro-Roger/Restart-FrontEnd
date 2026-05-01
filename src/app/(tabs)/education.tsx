import { EducationScreen } from "../../screens/EducationScreen";
import { colors, styles } from "../AppRoot";
import { useRouteDependencies } from "../useRouteDependencies";
import { useJourneyState } from "../../state/journeyState";

export default function EducationRoute() {
  const { completedEducation, toggleEducationCompletion } = useJourneyState();
  const { Header, Card, ProgressBar } = useRouteDependencies();

  return (
    <EducationScreen
      completedEducation={completedEducation}
      onToggleComplete={toggleEducationCompletion}
      styles={styles}
      colors={colors}
      Header={Header}
      Card={Card}
      ProgressBar={ProgressBar}
    />
  );
}
