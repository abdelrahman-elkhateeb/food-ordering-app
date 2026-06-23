import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ThemeProvider } from "@/components/theme-provider.tsx"
import { DirectionProvider } from "@/components/ui/direction"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import { router } from "./routes/router"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DirectionProvider direction="rtl">
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </DirectionProvider>
  </StrictMode>
)
