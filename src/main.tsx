import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports.ts";
import { BrowserRouter } from "react-router";
import { App } from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeProvider/ThemeProvider.tsx";
import { UserProvider } from "./contexts/UserContext/UserProvider.tsx";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsconfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
