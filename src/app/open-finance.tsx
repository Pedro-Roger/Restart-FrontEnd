import { Redirect, useRouter } from "expo-router";
import { ScrollView, useWindowDimensions } from "react-native";
import { OpenFinanceManagementScreen } from "../screens/OpenFinanceManagementScreen";
import { styles } from "./AppRoot";
import { useRouteDependencies } from "./useRouteDependencies";
import { useAuthState } from "../state/authState";
import { getResponsiveContentStyle } from "./responsive";

export default function OpenFinanceRoute() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { isAuthenticated } = useAuthState();
  const { Card } = useRouteDependencies();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={[styles.appContent, getResponsiveContentStyle(width)]}>
      <OpenFinanceManagementScreen onBack={() => router.back()} styles={styles} Card={Card} />
    </ScrollView>
  );
}
