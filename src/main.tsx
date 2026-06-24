import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/lib/i18n";
import "./index.css";

import { ThemeProvider } from "@/components/theme-provider.tsx";
import LanguageProvider from "./components/Language-Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
);