import { useRouter } from "expo-router";
import { RecoveryScreen } from "../screens/auth/RecoveryScreen";
import { styles } from "./AppRoot";

export default function RecoveryRoute() {
  const router = useRouter();

  return <RecoveryScreen onBack={() => router.back()} onContinue={() => router.replace("/signin")} styles={styles} />;
}
