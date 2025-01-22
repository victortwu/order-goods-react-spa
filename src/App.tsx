import { useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { formOverrides } from "./signinCustomUI/constants";
import { useUser } from "./contexts/UserContext/UserProvider";
import { SignInHeader } from "./signinCustomUI/components/SignInHeader";
import { AppLayout, TopNavigation } from "@cloudscape-design/components";
import "@cloudscape-design/global-styles/index.css";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const App = () => {
  const { user, isAdmin, loading } = useUser();

  // just to test connection for now
  // https://docs.amplify.aws/gen1/react/build-a-backend/restapi/restapi-v5-to-v6-migration-guide/
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
          <>
            <TopNavigation
              identity={{ href: "#", title: "Order Goods" }}
              utilities={[
                {
                  type: "button",
                  text: "Sign Out",
                  onClick: signOut,
                },
              ]}
            />
            <AppLayout
              content={
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
                </div>
              }
            />
          </>
        );
      }}
    </Authenticator>
  );
};
