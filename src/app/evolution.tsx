import { Redirect } from "expo-router";
import { EvolutionScreen } from "../screens/EvolutionScreen";
import { styles } from "./AppRoot";
import { useRouteDependencies } from "./useRouteDependencies";
import { useAuthState } from "../state/authState";

export default function EvolutionRoute() {
  const { isAuthenticated } = useAuthState();
  const { Header, Card, SimpleChart, MiniCard, InfoStrip } = useRouteDependencies();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <EvolutionScreen styles={styles} Header={Header} Card={Card} SimpleChart={SimpleChart} MiniCard={MiniCard} InfoStrip={InfoStrip} />;
}
