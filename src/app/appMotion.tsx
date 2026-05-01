import { useContext, useEffect, useRef } from "react";
import { Animated, Easing, type StyleProp, type ViewStyle } from "react-native";
import { ThemeContext } from "../theme/theme";
import { styles } from "./appStyles";

export function useAnimatedEntrance(animationKey: string, distance = 8) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(distance);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      })
    ]).start();
  }, [animationKey, distance, opacity, translateY]);

  return {
    opacity,
    transform: [{ translateY }]
  };
}

export function AnimatedCard({
  children,
  style
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { theme } = useContext(ThemeContext);
  const animatedStyle = useAnimatedEntrance("card", 6);
  return (
    <Animated.View
      style={[
        style,
        {
          backgroundColor: theme.card,
          borderColor: theme.line
        },
        animatedStyle
      ]}
    >
      {children}
    </Animated.View>
  );
}
