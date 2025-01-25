import { useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { AppLayout } from "@cloudscape-design/components";
import { formOverrides } from "./signinCustomUI/constants";
import { SignInHeader } from "./signinCustomUI/components/SignInHeader";
import { CustomTopNavigation } from "./components/CustomTopNavigation/CustomTopNavigation";
import { PageContentRoutes } from "./routes/pageContentRoutes/PageContentRoutes";
import "@cloudscape-design/global-styles/index.css";
import { CustomSideNavigation } from "./components/CustomSideNavigation/CustomSideNavigation";

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
            <CustomTopNavigation signOut={signOut} />
            <AppLayout
              toolsHide
              navigation={<CustomSideNavigation />}
              content={<PageContentRoutes />}
            />
          </>
        );
      }}
    </Authenticator>
  );
};
