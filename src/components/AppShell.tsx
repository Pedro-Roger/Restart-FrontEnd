import type { ReactNode } from "react";
import { useContext } from "react";
import { ScrollView, View } from "react-native";
import type { TabKey } from "../navigation/types";
import { ThemeContext } from "../theme/theme";
import { BottomNavigation } from "./navigation/BottomNavigation";

type Props = {
  children: ReactNode;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  styles: Record<string, any>;
};

export function AppShell({ children, activeTab, onTabChange, styles }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.appShell, { backgroundColor: theme.bg }]}>
      <ScrollView style={[styles.scroll, { backgroundColor: theme.bg }]} contentContainerStyle={styles.appContent}>
        {children}
      </ScrollView>
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} styles={styles} />
    </View>
  );
}
