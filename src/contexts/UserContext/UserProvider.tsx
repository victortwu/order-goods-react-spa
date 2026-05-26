import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { fetchAuthSession, type AuthSession } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

type UserContextType = {
  user: AuthSession | null;
  isAdmin: boolean;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  isAdmin: false,
  loading: false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthSession | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const loadUser = useCallback(async () => {
    try {
      const session = await fetchAuthSession();
      const groups = (session?.tokens?.idToken?.payload?.["cognito:groups"] as string[]) || [];

      setUser(session);
      setIsAdmin(groups.includes("admins"));
    } catch {
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();

    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signedIn" || payload.event === "signedOut") {
        loadUser();
      }
    });

    return unsubscribe;
  }, [loadUser]);

  return <UserContext.Provider value={{ user, isAdmin, loading }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
