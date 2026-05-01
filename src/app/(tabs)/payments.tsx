import { ScrollView, useWindowDimensions } from "react-native";
import { PaymentsScreen } from "../../screens/PaymentsScreen";
import { styles } from "../AppRoot";
import { useRouteDependencies } from "../useRouteDependencies";
import { getResponsiveContentStyle } from "../responsive";

export default function PaymentsRoute() {
  const { width } = useWindowDimensions();
  const { Header, Card, Badge, PaymentMethodAction, PaymentRadarRow, InfoStrip } = useRouteDependencies();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={[styles.appContent, getResponsiveContentStyle(width)]}>
      <PaymentsScreen
        styles={styles}
        Header={Header}
        Card={Card}
        Badge={Badge}
        PaymentMethodAction={PaymentMethodAction}
        PaymentRadarRow={PaymentRadarRow}
        InfoStrip={InfoStrip}
      />
    </ScrollView>
  );
}
