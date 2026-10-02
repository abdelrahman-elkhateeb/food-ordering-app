import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export default function HomeCta() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-start justify-between gap-6 bg-primary p-8 text-primary-foreground sm:p-12 md:flex-row md:items-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
          {t("home.cta.title")}
        </h2>
        <p className="opacity-80">{t("home.cta.subtitle")}</p>
      </div>

      <Button
        size="lg"
        asChild
        className="bg-foreground text-background hover:bg-foreground/85"
      >
        <Link to="/menu">
          {t("home.cta.button")}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </Button>
    </section>
  );
}
