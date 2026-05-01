import { useRouter } from "expo-router";
import { HomeScreen } from "../../screens/HomeScreen";
import { styles } from "../AppRoot";
import { usePaymentsState } from "../../state/paymentsState";
import { useRouteDependencies } from "../useRouteDependencies";

export default function HomeRoute() {
  const router = useRouter();
  const { consentActive } = usePaymentsState();
  const { Header, Card, ProgressBar, Badge, PaymentRadarRow, SectionRow, MiniCard, PrimaryButton } = useRouteDependencies();

  return (
    <HomeScreen
      consentActive={consentActive}
      onJourney={() => router.push("/(tabs)/journey")}
      onOpenFinance={() => router.push("/open-finance")}
      styles={styles}
      Header={Header}
      Card={Card}
      ProgressBar={ProgressBar}
      Badge={Badge}
      PaymentRadarRow={PaymentRadarRow}
      SectionRow={SectionRow}
      MiniCard={MiniCard}
      PrimaryButton={PrimaryButton}
    />
  );
}
