import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import { Info, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import ResetDemoButton from "@/components/dashboard/ResetDemoButton";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useUser } from "@/features/users/useUser";

export default function AdminLayout() {
  const { t } = useTranslation();
  const { user, isAdmin } = useUser();

  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b px-4 sm:px-6">
          <SidebarTrigger />

          <Separator orientation="vertical" className="h-6" />

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-semibold">{t("admin.title")}</h1>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {t("admin.subtitle")}
            </p>
          </div>

          {user && (
            <span
              className={cn(
                "hidden max-w-48 items-center gap-1.5 border px-2 py-1 text-[11px] font-semibold tracking-wider uppercase sm:inline-flex",
                isAdmin && "border-primary bg-primary text-primary-foreground"
              )}
              title={user.email}
            >
              <ShieldCheck className="size-3.5 shrink-0" />
              <span className="truncate">
                {isAdmin ? t("admin.roleAdmin") : t("admin.roleVisitor")}
              </span>
            </span>
          )}
          {isAdmin && <ResetDemoButton />}
          <LanguageToggle />
          <ThemeToggle />
        </header>

        <div className="flex items-start gap-2 border-b bg-primary/10 px-4 py-2 text-xs sm:px-6">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          {t("admin.demoBanner")}
        </div>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
