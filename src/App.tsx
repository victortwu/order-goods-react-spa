import { Authenticator } from "@aws-amplify/ui-react";
import { AppLayout } from "@cloudscape-design/components";
import { formOverrides } from "./signinCustomUI/constants";
import { SignInHeader } from "./signinCustomUI/components/SignInHeader";
import { CustomTopNavigation } from "./components/CustomTopNavigation/CustomTopNavigation";
import { CustomSideNavigation } from "./components/CustomSideNavigation/CustomSideNavigation";
import { PageContentRoutes } from "./routes/pageContentRoutes/PageContentRoutes";

export const App = () => (
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
