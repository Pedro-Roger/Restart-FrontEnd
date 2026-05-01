import { JourneyScreen } from "../../screens/JourneyScreen";
import { styles } from "../AppRoot";
import { useRouteDependencies } from "../useRouteDependencies";

export default function JourneyRoute() {
  const { Header, Card, ProgressBar, MissionTimeline } = useRouteDependencies();

  return <JourneyScreen styles={styles} Header={Header} Card={Card} ProgressBar={ProgressBar} MissionTimeline={MissionTimeline} />;
}
