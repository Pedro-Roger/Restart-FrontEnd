import { useRouter } from "expo-router";
import { SignupScreen } from "../screens/auth/SignupScreen";
import { styles } from "./AppRoot";
import { useRouteDependencies } from "./useRouteDependencies";
import { useAuthState } from "../state/authState";

export default function SignupRoute() {
  const router = useRouter();
  const { markAuthenticated } = useAuthState();
  const { AuthTopPanel, SocialAuthRow, AuthDivider, AuthField } = useRouteDependencies();

  return (
    <SignupScreen
      onBack={() => router.back()}
      onCreate={() => {
        markAuthenticated();
        router.push("/bank");
      }}
      styles={styles}
      AuthTopPanel={AuthTopPanel}
      SocialAuthRow={SocialAuthRow}
      AuthDivider={AuthDivider}
      AuthField={AuthField}
    />
  );
}
