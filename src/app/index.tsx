import { Redirect } from "expo-router";
import { useAuthState } from "../state/authState";

export default function IndexRoute() {
  const { isAuthenticated } = useAuthState();
  return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/login"} />;
}
