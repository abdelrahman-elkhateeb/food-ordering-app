import { Link, Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import { UtensilsCrossed } from "lucide-react";

import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <main className="relative flex min-h-svh items-center justify-center bg-muted px-4 py-10">
      <div className="absolute end-4 top-4 flex items-center gap-1">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center text-xl font-black tracking-tight"
        >
          <span className="flex size-8 items-center justify-center bg-primary text-primary-foreground">
            <UtensilsCrossed className="size-4" />
          </span>
          {t("brand")}
        </Link>

        <Outlet />
      </div>
    </main>
  );
}
