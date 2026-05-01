import { PaymentsScreen } from "../../screens/PaymentsScreen";
import { styles } from "../AppRoot";
import { useRouteDependencies } from "../useRouteDependencies";

export default function PaymentsRoute() {
  const { Header, Card, Badge, PaymentMethodAction, PaymentRadarRow, InfoStrip } = useRouteDependencies();

  return (
    <PaymentsScreen
      styles={styles}
      Header={Header}
      Card={Card}
      Badge={Badge}
      PaymentMethodAction={PaymentMethodAction}
      PaymentRadarRow={PaymentRadarRow}
      InfoStrip={InfoStrip}
    />
  );
}
