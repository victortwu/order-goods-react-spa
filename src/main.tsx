import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports.ts";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { App } from "./App.tsx";
import { ErrorBoundary } from "./ErrorBoundry.tsx";
import { ThemeProvider } from "./contexts/ThemeProvider/ThemeProvider.tsx";
import { UserProvider } from "./contexts/UserContext/UserProvider.tsx";
import { OrderListProvider } from "./contexts/OrderListContext/OrderListContext.tsx";
import { SmsConsentPage } from "./contentPages/SmsConsentPage/SmsConsentPage.tsx";
import "@aws-amplify/ui-react/styles.css";
import "@cloudscape-design/global-styles/index.css";
import "./theme.css";

Amplify.configure(awsconfig);

const queryClient = new QueryClient();

const AppRouter = () => (
  <Routes>
    {/* Public routes — no authentication required */}
    <Route path="/sms-consent" element={<SmsConsentPage />} />

    {/* All other routes require authentication */}
    <Route
      path="*"
      element={
        <UserProvider>
          <OrderListProvider>
            <App />
          </OrderListProvider>
        </UserProvider>
      }
    />
  </Routes>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
