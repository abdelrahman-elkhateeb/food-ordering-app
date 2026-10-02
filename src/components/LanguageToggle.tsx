import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const { t, i18n } = useTranslation();

  function toggleLanguage() {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage}>
      <Languages className="h-4 w-4" />
      {t("nav.switchLanguage")}
    </Button>
  );
}
