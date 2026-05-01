import { SpaceGrotesk_400Regular } from "@expo-google-fonts/space-grotesk/400Regular";
import { SpaceGrotesk_700Bold } from "@expo-google-fonts/space-grotesk/700Bold";
import { useFonts } from "@expo-google-fonts/space-grotesk/useFonts";
import { Stack } from "expo-router";
import { DomainStateProvider } from "../state/DomainStateProvider";
import { useProfileState } from "../state/profileState";
import { StatusBar } from "expo-status-bar";

function RouterStack() {
  const { themeMode } = useProfileState();

  return (
    <>
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="recovery" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="bank" />
        <Stack.Screen name="open-finance" />
        <Stack.Screen name="evolution" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <DomainStateProvider>
      <RouterStack />
    </DomainStateProvider>
  );
}
