import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type PaymentsStateValue = {
  consentActive: boolean;
  toggleConsent: () => void;
};

const PaymentsStateContext = createContext<PaymentsStateValue | null>(null);

export function PaymentsStateProvider({ children }: { children: ReactNode }) {
  const [consentActive, setConsentActive] = useState(true);

  function toggleConsent() {
    setConsentActive((current) => !current);
  }

  const value = useMemo(
    () => ({
      consentActive,
      toggleConsent
    }),
    [consentActive]
  );

  return <PaymentsStateContext.Provider value={value}>{children}</PaymentsStateContext.Provider>;
}

export function usePaymentsState() {
  const value = useContext(PaymentsStateContext);

  if (!value) {
    throw new Error("usePaymentsState must be used within PaymentsStateProvider");
  }

  return value;
}
