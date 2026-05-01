import { Image, View } from "react-native";

export function AuthTopPanel({ styles, logoAsset }: { styles: Record<string, any>; logoAsset: number }) {
  return (
    <View style={styles.authTopPanel}>
      <View style={styles.authTopGlowPrimary} />
      <View style={styles.authTopGlowSecondary} />
      <Image source={logoAsset} resizeMode="contain" style={styles.authTopLogo} />
    </View>
  );
}
