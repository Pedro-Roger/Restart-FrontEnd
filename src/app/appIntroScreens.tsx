import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, TextInput, View } from "react-native";
import { Dots } from "../components/navigation/Dots";
import { FloatingPreviewStack } from "../components/ui/FloatingPreviewStack";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Illustration } from "../components/visualizations/Illustration";
import { onboarding, splash } from "../restartContent";
import { ThemeContext } from "../theme/theme";
import { logoAsset } from "./appAssets";
import { styles } from "./appStyles";

export function SplashScreen({ onStart }: { onStart: () => void }) {
  const { theme } = useContext(ThemeContext);
  const pulse = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslate = useRef(new Animated.Value(26)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 620,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(logoTranslate, {
        toValue: 0,
        duration: 620,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      })
    ]).start();
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        })
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [logoOpacity, logoTranslate, pulse]);

  return (
    <LinearGradient colors={[theme.purple, theme.navySoft, theme.navy]} style={styles.splash}>
      <View style={styles.splashBlobOne} />
      <View style={styles.splashBlobTwo} />
      <Animated.Image
        source={logoAsset}
        resizeMode="contain"
        style={[
          styles.splashLogoImage,
          {
            opacity: logoOpacity,
            transform: [{ translateY: logoTranslate }, { scale: pulse }]
          }
        ]}
      />
      <Text style={styles.splashText}>{splash.phrase}</Text>
      <FloatingPreviewStack styles={styles} />
      <PrimaryButton label="Começar" onPress={onStart} styles={styles} />
    </LinearGradient>
  );
}

export function OnboardingScreen({
  index,
  onNext,
  onSkip
}: {
  index: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const item = onboarding[index];
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.authScreen, { backgroundColor: theme.bg }]}>
      <Pressable onPress={onSkip} style={styles.skipButton}>
        <Text style={[styles.skipText, { color: theme.muted }]}>Pular</Text>
      </Pressable>
      <Illustration icon={item.icon} step={index + 1} styles={styles} />
      <Text style={[styles.authTitle, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.authText, { color: theme.muted }]}>{item.text}</Text>
      <Dots total={onboarding.length} active={index} styles={styles} />
      <PrimaryButton label={index === onboarding.length - 1 ? "Entrar no Restart" : "Continuar"} onPress={onNext} styles={styles} />
    </View>
  );
}

export function Input({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.inputWrap}>
      <Text style={[styles.inputLabel, { color: theme.text }]}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.muted}
        style={[styles.input, { backgroundColor: theme.card, borderColor: theme.line, color: theme.text }]}
        {...props}
      />
    </View>
  );
}
