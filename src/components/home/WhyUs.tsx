import { Banknote, ChefHat, Languages, Radio } from "lucide-react";
import { useTranslation } from "react-i18next";

const features = [
  { key: "fresh", icon: ChefHat },
  { key: "live", icon: Radio },
  { key: "payment", icon: Banknote },
  { key: "language", icon: Languages },
];

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section className="space-y-10 py-16">
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
        {t("home.why.title")}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ key, icon: Icon }) => (
          <div key={key} className="space-y-3 border-t-2 border-primary pt-6">
            <Icon className="size-6" />
            <h3 className="font-bold">{t(`home.why.${key}.title`)}</h3>
            <p className="text-sm text-muted-foreground">
              {t(`home.why.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
