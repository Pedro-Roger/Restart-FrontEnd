import { Animated, Easing, View } from "react-native";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../theme/theme";

type Props = {
  value: number;
  styles: Record<string, any>;
  themeModeTrack: (theme: any) => string;
};

export function ProgressBar({ value, styles, themeModeTrack }: Props) {
  const { theme } = useContext(ThemeContext);
  const progress = useRef(new Animated.Value(0)).current;
  const width = `${Math.max(6, Math.min(value, 100))}%` as `${number}%`;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 720,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start();
  }, [progress, value]);

  const animatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["6%", width]
  });

  return (
    <View style={[styles.progressTrack, { backgroundColor: themeModeTrack(theme) }]}>
      <Animated.View style={[styles.progressFill, { width: animatedWidth, backgroundColor: theme.green }]} />
    </View>
  );
}
