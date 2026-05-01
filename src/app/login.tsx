import { useRouter } from "expo-router";
import { LoginScreen } from "../screens/LoginScreen";
import { profilePhotoAsset, styles } from "./AppRoot";

export default function LoginRoute() {
  const router = useRouter();

  return <LoginScreen onCreate={() => router.push("/signup")} onEnter={() => router.push("/signin")} profilePhotoAsset={profilePhotoAsset} styles={styles} />;
}
