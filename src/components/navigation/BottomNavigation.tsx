import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { bottomTabs } from "../../restartContent";
import type { TabKey } from "../../navigation/types";
import { ThemeContext } from "../../theme/theme";
import { useContext } from "react";

type Props = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  styles: Record<string, any>;
};

export function BottomNavigation({ activeTab, onTabChange, styles }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.bottomNavigation, { backgroundColor: theme.tab, borderColor: theme.line }]}>
      {bottomTabs.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <Pressable key={tab.key} onPress={() => onTabChange(tab.key)} style={styles.tabButton}>
            <Feather name={tab.icon} size={21} color={active ? theme.green : theme.muted} />
            <Text style={[styles.tabLabel, { color: active ? theme.green : theme.muted }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
