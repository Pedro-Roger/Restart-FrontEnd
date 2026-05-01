import { Feather } from "@expo/vector-icons";
import { Animated, Easing, View } from "react-native";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../theme/theme";

export function FloatingPreviewStack({ styles }: { styles: Record<string, any> }) {
  const { theme } = useContext(ThemeContext);
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        })
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [float]);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10]
  });

  return (
    <Animated.View style={[styles.previewStack, { transform: [{ translateY }] }]}>
      <View style={[styles.previewPhone, styles.previewPhoneLarge, { backgroundColor: theme.card }]}>
        <View style={[styles.previewLogoTile, { backgroundColor: theme.purpleSoft }]}>
          <Feather name="trending-up" size={26} color={theme.purple} />
        </View>
        <View style={[styles.previewButton, { backgroundColor: theme.purple }]} />
        <View style={[styles.previewLine, { backgroundColor: theme.line }]} />
      </View>
      <View style={[styles.previewPhone, styles.previewPhoneSmall, { backgroundColor: theme.card }]}>
        <View style={[styles.previewTinyBar, { backgroundColor: theme.green }]} />
        <View style={[styles.previewTinyBar, { backgroundColor: theme.purple }]} />
        <View style={[styles.previewTinyBar, { backgroundColor: theme.gold }]} />
      </View>
    </Animated.View>
  );
}
