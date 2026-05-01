import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { onboarding } from "../restartContent";
import { styles } from "./AppRoot";
import { useRouteDependencies } from "./useRouteDependencies";
import { useProfileState } from "../state/profileState";

export default function OnboardingRoute() {
  const router = useRouter();
  const { theme } = useProfileState();
  const { Dots, Illustration, PrimaryButton } = useRouteDependencies();
  const [index, setIndex] = useState(0);
  const item = onboarding[index];

  function next() {
    if (index < onboarding.length - 1) {
      setIndex((current) => current + 1);
      return;
    }

    router.replace("/login");
  }

  return (
    <View style={[styles.authScreen, { backgroundColor: theme.bg }]}>
      <Pressable onPress={() => router.replace("/login")} style={styles.skipButton}>
        <Text style={[styles.skipText, { color: theme.muted }]}>Pular</Text>
      </Pressable>
      <Illustration icon={item.icon} step={index + 1} />
      <Text style={[styles.authTitle, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.authText, { color: theme.muted }]}>{item.text}</Text>
      <Dots total={onboarding.length} active={index} />
      <PrimaryButton label={index === onboarding.length - 1 ? "Entrar no Restart" : "Continuar"} onPress={next} />
    </View>
  );
}
