import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AuthStateValue = {
  isAuthenticated: boolean;
  markAuthenticated: () => void;
  logout: () => void;
};

const AuthStateContext = createContext<AuthStateValue | null>(null);

export function AuthStateProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function markAuthenticated() {
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  const value = useMemo(
    () => ({
      isAuthenticated,
      markAuthenticated,
      logout
    }),
    [isAuthenticated]
  );

  return <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>;
}

export function useAuthState() {
  const value = useContext(AuthStateContext);

  if (!value) {
    throw new Error("useAuthState must be used within AuthStateProvider");
  }

  return value;
}
