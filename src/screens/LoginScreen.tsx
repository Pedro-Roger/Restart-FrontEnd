import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Pressable, SafeAreaView, Text, View } from "react-native";

type Props = {
  onCreate: () => void;
  onEnter: () => void;
  profilePhotoAsset: number;
  styles: Record<string, any>;
};

export function LoginScreen({ onCreate, onEnter, profilePhotoAsset, styles }: Props) {
  return (
    <ImageBackground source={profilePhotoAsset} resizeMode="cover" style={styles.loginHero}>
      <LinearGradient
        colors={["rgba(7, 19, 15, 0.08)", "rgba(7, 19, 15, 0.38)", "rgba(7, 19, 15, 0.92)"]}
        locations={[0, 0.42, 1]}
        style={styles.loginOverlay}
      >
        <SafeAreaView style={styles.loginSafeArea}>
          <View style={styles.loginContent}>
            <View style={styles.loginCopy}>
              <Text style={styles.loginEyebrow}>Restart</Text>
              <Text style={styles.loginHeadline}>Alcance os objetivos que você merece</Text>
              <Text style={styles.loginSubheadline}>
                Construa sua evolução financeira com uma jornada simples, clara e feita para o seu momento.
              </Text>
            </View>
            <View style={styles.loginActions}>
              <Pressable onPress={onCreate} style={styles.loginPrimaryButton}>
                <Text style={styles.loginPrimaryButtonText}>Começar</Text>
              </Pressable>
              <Pressable onPress={onEnter} style={styles.loginSecondaryAction}>
                <Text style={styles.loginSecondaryActionText}>Logar</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}
