import { Animated, Easing } from "react-native";
import { useEffect, useRef, type ReactNode } from "react";

function useAnimatedEntrance(animationKey: string, distance = 8) {
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

export function ScreenTransition({
  children,
  transitionKey,
  styles
}: {
  children: ReactNode;
  transitionKey: string;
  styles: Record<string, any>;
}) {
  const animatedStyle = useAnimatedEntrance(transitionKey, 12);
  return <Animated.View style={[styles.screenTransition, animatedStyle]}>{children}</Animated.View>;
}
