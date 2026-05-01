import type { ReactNode } from "react";
import { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../../theme/theme";

type Props = {
  children: ReactNode;
  accent?: boolean;
  styles: Record<string, any>;
  AnimatedCard: (props: { children: ReactNode }) => ReactNode;
};

export function Card({ children, accent, styles, AnimatedCard }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <AnimatedCard>
      <View
        style={[
          styles.card,
          {
            backgroundColor: accent ? theme.elevated : theme.card,
            borderColor: accent ? theme.greenSoft : theme.line
          }
        ]}
      >
        {children}
      </View>
    </AnimatedCard>
  );
}
