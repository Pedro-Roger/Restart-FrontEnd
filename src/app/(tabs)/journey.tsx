import { ScrollView, useWindowDimensions } from "react-native";
import { JourneyScreen } from "../../screens/JourneyScreen";
import { styles } from "../AppRoot";
import { useRouteDependencies } from "../useRouteDependencies";
import { getResponsiveContentStyle } from "../responsive";

export default function JourneyRoute() {
  const { width } = useWindowDimensions();
  const { Header, Card, ProgressBar, MissionTimeline } = useRouteDependencies();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={[styles.appContent, getResponsiveContentStyle(width)]}>
      <JourneyScreen styles={styles} Header={Header} Card={Card} ProgressBar={ProgressBar} MissionTimeline={MissionTimeline} />
    </ScrollView>
  );
}
