import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports.ts";
import { BrowserRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { App } from "./App.tsx";
import { ErrorBoundary } from "./ErrorBoundry.tsx";
import { ThemeProvider } from "./contexts/ThemeProvider/ThemeProvider.tsx";
import { UserProvider } from "./contexts/UserContext/UserProvider.tsx";
import "@aws-amplify/ui-react/styles.css";
import "@cloudscape-design/global-styles/index.css";

Amplify.configure(awsconfig);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
