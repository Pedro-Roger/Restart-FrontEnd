import { Image, Text, View } from "react-native";
import { useContext, type ReactNode } from "react";
import { ThemeContext } from "../../theme/theme";

export function BrandHeader({
  subtitle,
  centered,
  styles,
  logoAsset,
  renderThemeToggle
}: {
  subtitle: string;
  centered?: boolean;
  styles: Record<string, any>;
  logoAsset: number;
  renderThemeToggle: () => ReactNode;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.brandHeader}>
      <View style={[styles.brandTop, centered && styles.brandTopCentered]}>
        <View style={centered && styles.brandCopyCentered}>
          <Image source={logoAsset} resizeMode="contain" style={styles.brandLogoImage} />
          <Text style={[styles.brandSubtitle, { color: theme.muted }]}>{subtitle}</Text>
        </View>
        <View style={centered ? styles.brandToggleCentered : undefined}>{renderThemeToggle()}</View>
      </View>
    </View>
  );
}
