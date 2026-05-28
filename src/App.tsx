import { Authenticator } from "@aws-amplify/ui-react";
import { AppLayout, Flashbar } from "@cloudscape-design/components";
import { formOverrides } from "./signinCustomUI/constants";
import { SignInHeader } from "./signinCustomUI/components/SignInHeader";
import { CustomTopNavigation } from "./components/CustomTopNavigation/CustomTopNavigation";
import { CustomSideNavigation } from "./components/CustomSideNavigation/CustomSideNavigation";
import { PageContentRoutes } from "./routes/pageContentRoutes/PageContentRoutes";
import {
  NotificationProvider,
  useNotifications,
} from "./contexts/NotificationContext/NotificationContext";

const AppContent = ({ signOut }: { signOut?: () => void }) => {
  const { flashItems } = useNotifications();

  return (
    <>
      <CustomTopNavigation signOut={signOut} />
      <AppLayout
        toolsHide
        navigation={<CustomSideNavigation />}
        notifications={<Flashbar items={flashItems} stackItems />}
        content={<PageContentRoutes />}
      />
    </>
  );
};

export const App = () => (
  <Authenticator variation="modal" formFields={formOverrides} components={{ Header: SignInHeader }}>
    {({ signOut }) => (
      <NotificationProvider>
        <AppContent signOut={signOut} />
      </NotificationProvider>
    )}
  </Authenticator>
);
