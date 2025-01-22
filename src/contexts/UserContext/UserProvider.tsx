import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchAuthSession } from "aws-amplify/auth";

type UserContextType = {
  user: any | null;
  isAdmin: boolean;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  isAdmin: false,
  loading: false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await fetchAuthSession();
        const groups =
          (session?.tokens?.idToken?.payload?.["cognito:groups"] as string[]) ||
          [];

        setUser(session);
        setIsAdmin(groups.includes("admins"));
      } catch (error) {
        console.error("Error fetching user session:", error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
