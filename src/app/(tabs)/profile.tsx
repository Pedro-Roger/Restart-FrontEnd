import { useRouter } from "expo-router";
import { ProfileScreen } from "../../screens/ProfileScreen";
import { profilePhotoAsset, styles } from "../AppRoot";
import { useAuthState } from "../../state/authState";
import { usePaymentsState } from "../../state/paymentsState";
import { useRouteDependencies } from "../useRouteDependencies";

export default function ProfileRoute() {
  const router = useRouter();
  const { logout } = useAuthState();
  const { consentActive, toggleConsent } = usePaymentsState();
  const { Card } = useRouteDependencies();

  return (
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
  );
}
