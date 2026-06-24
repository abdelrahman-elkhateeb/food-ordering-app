import { Link } from "react-router-dom";
import { CreditCard, Banknote } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/cartStore";

export default function Checkout() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const cart = useCartStore((state) => state.cart);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold">{t("cart.empty")}</h1>

        <Button asChild>
          <Link to="/menu">{t("checkout.backToMenu")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="py-8">
      <h1 className="mb-6 text-3xl font-bold">{t("checkout.title")}</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>{t("checkout.deliveryDetails")}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="customerName">{t("checkout.fullName")}</Label>
              <Input
                id="customerName"
                placeholder={t("checkout.fullNamePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t("checkout.phoneNumber")}</Label>
              <Input id="phone" placeholder={t("checkout.phonePlaceholder")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t("checkout.address")}</Label>
              <Textarea
                id="address"
                placeholder={t("checkout.addressPlaceholder")}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>{t("checkout.paymentMethod")}</Label>

              <RadioGroup defaultValue="cash" className="grid gap-3 sm:grid-cols-2">
                <Label
                  htmlFor="cash"
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-4"
                >
                  <RadioGroupItem value="cash" id="cash" />
                  <Banknote className="h-5 w-5" />
                  {t("checkout.cash")}
                </Label>

                <Label
                  htmlFor="online"
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-4"
                >
                  <RadioGroupItem value="online" id="online" />
                  <CreditCard className="h-5 w-5" />
                  {t("checkout.online")}
                </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{t("checkout.orderSummary")}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              {cart.map((item) => {
                const name = isArabic ? item.name_ar : item.name_en;

                return (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span>
                      {name} × {item.quantity}
                    </span>
                    <span>
                      {item.price * item.quantity} {t("common.currency")}
                    </span>
                  </div>
                );
              })}
            </div>

            <Separator />

            <div className="flex justify-between">
              <span>{t("checkout.items")}</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>{t("checkout.total")}</span>
              <span>
                {totalPrice} {t("common.currency")}
              </span>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full">{t("checkout.placeOrder")}</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}