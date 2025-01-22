import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { Authenticator } from "@aws-amplify/ui-react";
import { formOverrides } from "./signinCustomUI/constants";
import { SignInHeader } from "./signinCustomUI/components/SignInHeader";
import {
  AppLayout,
  SideNavigation,
  TopNavigation,
} from "@cloudscape-design/components";
import "@cloudscape-design/global-styles/index.css";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const App = () => {
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
              navigation={
                <SideNavigation
                  header={{
                    href: "#",
                    text: "Order Goods",
                  }}
                  items={[
                    { type: "link", text: `Home`, href: `/` },
                    { type: "link", text: `List`, href: `/list` },
                  ]}
                />
              }
              content={
                <Routes>
                  <Route path="/" element={<div>Home</div>} />
                  <Route path="/list" element={<div>List</div>} />
                </Routes>
              }
            />
          </>
        );
      }}
    </Authenticator>
  );
};
