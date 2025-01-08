import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";
import { theme } from "./Theme.ts";
import { applyTheme } from "@cloudscape-design/components/theming";

applyTheme({ theme });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
