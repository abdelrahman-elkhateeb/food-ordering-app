import { Outlet, ScrollRestoration } from "react-router";
import { useTranslation } from "react-i18next";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthListener } from "@/features/users/useAuthListener";

export default function RootLayout() {
  const { i18n } = useTranslation();

  useAuthListener();

  return (
    <TooltipProvider>
      <Outlet />
      <ScrollRestoration />
      <Toaster
        richColors
        position={i18n.language === "ar" ? "bottom-left" : "bottom-right"}
      />
    </TooltipProvider>
  );
}
