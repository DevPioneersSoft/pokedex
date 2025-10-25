import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RouterProvider router={routes} />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
