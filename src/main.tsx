import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports.ts";
import { App } from "./App.tsx";
import { theme } from "./Theme.ts";
import { applyTheme } from "@cloudscape-design/components/theming";
import { UserProvider } from "./contexts/UserContext/UserProvider.tsx";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsconfig);

applyTheme({ theme });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
