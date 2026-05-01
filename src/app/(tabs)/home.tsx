import { useRouter } from "expo-router";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { HomeScreen } from "../../screens/HomeScreen";
import { styles } from "../AppRoot";
import { usePaymentsState } from "../../state/paymentsState";
import { useRouteDependencies } from "../useRouteDependencies";
import { getResponsiveContentStyle } from "../responsive";

export default function HomeRoute() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { consentActive } = usePaymentsState();
  const { Header, Card, ProgressBar, Badge, PaymentRadarRow, SectionRow, MiniCard, PrimaryButton } = useRouteDependencies();

  return (
    <View style={styles.screenBackdrop}>
      <View style={styles.screenGlowPrimary} />
      <View style={styles.screenGlowSecondary} />
      <View style={styles.screenGlowTertiary} />
      <ScrollView style={styles.scroll} contentContainerStyle={[styles.appContent, getResponsiveContentStyle(width)]}>
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
      </ScrollView>
    </View>
  );
}
