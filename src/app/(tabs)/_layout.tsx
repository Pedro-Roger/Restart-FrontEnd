import { Redirect, Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useProfileState } from "../../state/profileState";
import { useAuthState } from "../../state/authState";
import { bottomTabs } from "../../restartContent";

const tabIconMap = Object.fromEntries(bottomTabs.map((item) => [item.key, item.icon])) as Record<string, React.ComponentProps<typeof Feather>["name"]>;
const tabLabelMap = Object.fromEntries(bottomTabs.map((item) => [item.key, item.label])) as Record<string, string>;

export default function TabsLayout() {
  const { isAuthenticated } = useAuthState();
  const { theme } = useProfileState();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.green,
        tabBarInactiveTintColor: theme.muted,
        tabBarStyle: {
          backgroundColor: theme.tab,
          borderTopColor: theme.line
        },
        tabBarIcon: ({ color, size }) => <Feather name={tabIconMap[route.name]} color={color} size={size} />,
        tabBarLabel: tabLabelMap[route.name]
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="journey" />
      <Tabs.Screen name="payments" />
      <Tabs.Screen name="education" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
