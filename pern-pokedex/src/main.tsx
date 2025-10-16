import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { EntradorProvider } from "./context/EntrenadorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <EntradorProvider>
        <App />
      </EntradorProvider>
    </MantineProvider>
  </StrictMode>
);
