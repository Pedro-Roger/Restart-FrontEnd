import { useRouter } from "expo-router";
import { ScrollView, useWindowDimensions } from "react-native";
import { ProfileScreen } from "../../screens/ProfileScreen";
import { profilePhotoAsset, styles } from "../AppRoot";
import { useAuthState } from "../../state/authState";
import { usePaymentsState } from "../../state/paymentsState";
import { useRouteDependencies } from "../useRouteDependencies";
import { getResponsiveContentStyle } from "../responsive";

export default function ProfileRoute() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { logout } = useAuthState();
  const { consentActive, toggleConsent } = usePaymentsState();
  const { Card } = useRouteDependencies();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={[styles.appContent, getResponsiveContentStyle(width)]}>
      <ProfileScreen
        consentActive={consentActive}
        onToggleConsent={toggleConsent}
        onLogout={() => {
          logout();
          router.replace("/login");
        }}
        styles={styles}
        profilePhotoAsset={profilePhotoAsset}
        Card={Card}
      />
    </ScrollView>
  );
}
