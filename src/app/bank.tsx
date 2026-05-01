import { Redirect, useRouter } from "expo-router";
import { BankConnectionScreen } from "../screens/auth/BankConnectionScreen";
import { colors, styles } from "./AppRoot";
import { usePaymentsState } from "../state/paymentsState";
import { useAuthState } from "../state/authState";
import { useRouteDependencies } from "./useRouteDependencies";

export default function BankRoute() {
  const router = useRouter();
  const { isAuthenticated } = useAuthState();
  const { consentActive, toggleConsent } = usePaymentsState();
  const { BrandHeader, Card, SectionRow, InfoStrip, PrimaryButton, SecondaryButton } = useRouteDependencies();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <BankConnectionScreen
      consentActive={consentActive}
      onToggleConsent={toggleConsent}
      onConnect={() => router.replace("/(tabs)/home")}
      styles={styles}
      colors={colors}
      BrandHeader={BrandHeader}
      Card={Card}
      SectionRow={SectionRow}
      InfoStrip={InfoStrip}
      PrimaryButton={PrimaryButton}
      SecondaryButton={SecondaryButton}
    />
  );
}
