import { CheckCircle2, PackageSearch } from "lucide-react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrderConfirmed() {
  const { orderId } = useParams();
  const { t } = useTranslation();

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-10">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-primary text-primary-foreground">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <CardTitle className="text-2xl">
            {t("orderConfirmed.title")}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-muted-foreground">
            {t("orderConfirmed.description")}
          </p>

          <div className="border p-4">
            <p className="text-sm text-muted-foreground">
              {t("orderConfirmed.orderId")}
            </p>
            <p className="text-3xl font-black">#{orderId}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="w-full" asChild>
              <Link to={`/track-order?id=${orderId}`}>
                <PackageSearch className="h-4 w-4" />
                {t("orderConfirmed.track")}
              </Link>
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/menu">{t("orderConfirmed.backToMenu")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
