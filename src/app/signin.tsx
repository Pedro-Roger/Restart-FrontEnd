import { useRouter } from "expo-router";
import { SigninScreen } from "../screens/auth/SigninScreen";
import { styles } from "./AppRoot";
import { useRouteDependencies } from "./useRouteDependencies";
import { useAuthState } from "../state/authState";

export default function SigninRoute() {
  const router = useRouter();
  const { markAuthenticated } = useAuthState();
  const { AuthTopPanel, SocialAuthRow, AuthDivider, AuthField } = useRouteDependencies();

  return (
    <SigninScreen
      onBack={() => router.back()}
      onCreate={() => router.push("/signup")}
      onEnter={() => {
        markAuthenticated();
        router.push("/bank");
      }}
      onRecovery={() => router.push("/recovery")}
      styles={styles}
      AuthTopPanel={AuthTopPanel}
      SocialAuthRow={SocialAuthRow}
      AuthDivider={AuthDivider}
      AuthField={AuthField}
    />
  );
}
