import { DirectionProvider } from "@/components/ui/direction";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type LanguageProviderProps = {
  children: React.ReactNode;
};

export default function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const { i18n } = useTranslation();

  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = direction;
    localStorage.setItem("language", i18n.language);
  }, [i18n.language, direction]);

  return (
    <DirectionProvider dir={direction}>
      {children}
    </DirectionProvider>
  );
}