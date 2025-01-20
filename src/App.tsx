import { Authenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { SignInHeader } from "./signinCustomUI/components/SignInHeader";
import { formOverrides } from "./signinCustomUI/constants";
import "@cloudscape-design/global-styles/index.css";
import { Button } from "@cloudscape-design/components";
import { useUser } from "./contexts/UserContext/UserProvider";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const App = () => {
  const { user, isAdmin, loading } = useUser();

  // just to test connection for now
  useEffect(() => {
    fetch(`${baseUrl}/prod/goods`)
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <Authenticator
      variation="modal"
      formFields={formOverrides}
      components={{ Header: SignInHeader }}
    >
      {({ signOut }) => {
        return (
          <div>
            <h1>Welcome, {user?.userId}!</h1>
            {loading ? (
              <h2>...loading user group.</h2>
            ) : (
              <h2>
                {isAdmin
                  ? "You have Admin Privileges"
                  : "You are a Regular User"}
              </h2>
            )}
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        );
      }}
    </Authenticator>
  );
};
