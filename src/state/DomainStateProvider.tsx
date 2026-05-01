import type { ReactNode } from "react";
import { AuthStateProvider } from "./authState";
import { JourneyStateProvider } from "./journeyState";
import { PaymentsStateProvider } from "./paymentsState";
import { ProfileStateProvider } from "./profileState";

export function DomainStateProvider({ children }: { children: ReactNode }) {
  return (
    <ProfileStateProvider>
      <AuthStateProvider>
        <JourneyStateProvider>
          <PaymentsStateProvider>{children}</PaymentsStateProvider>
        </JourneyStateProvider>
      </AuthStateProvider>
    </ProfileStateProvider>
  );
}
