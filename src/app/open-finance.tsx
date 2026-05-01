import { Redirect, useRouter } from "expo-router";
import { OpenFinanceManagementScreen } from "../screens/OpenFinanceManagementScreen";
import { styles } from "./AppRoot";
import { useRouteDependencies } from "./useRouteDependencies";
import { useAuthState } from "../state/authState";

export default function OpenFinanceRoute() {
  const router = useRouter();
  const { isAuthenticated } = useAuthState();
  const { Card } = useRouteDependencies();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <OpenFinanceManagementScreen onBack={() => router.back()} styles={styles} Card={Card} />;
}
