import { Link, useNavigate } from "react-router";
import { CreditCard, Banknote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";

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
import { useCartItems } from "@/features/cart/useCartItems";
import { useCreateOrder } from "@/features/orders/useCreateOrder";
import { useUser } from "@/features/users/useUser";
import { formatPrice } from "@/lib/format";
import type { PaymentMethod } from "@/types/OrderTypes";

type CheckoutFormValues = {
  customer_name: string;
  phone: string;
  address: string;
  payment_method: PaymentMethod;
};

const EGYPTIAN_MOBILE = /^01[0125][0-9]{8}$/;

export default function Checkout() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  const { user } = useUser();
  const { createNewOrder, isCreatingOrder } = useCreateOrder();

  const clearCart = useCartStore((state) => state.clearCart);
  const { availableItems, totalItems, totalPrice } = useCartItems();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    values: {
      customer_name: user?.user_metadata?.full_name ?? "",
      phone: "",
      address: "",
      payment_method: "cash",
    },
    resetOptions: { keepDirtyValues: true },
  });

  function onSubmit(data: CheckoutFormValues) {
    createNewOrder(
      {
        ...data,
        items: availableItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      },
      {
        onSuccess: (order) => {
          clearCart();
          navigate(`/order-confirmed/${order.id}`);
        },
      }
    );
  }

  if (availableItems.length === 0) {
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <section className="py-10">
        <h1 className="mb-6 text-3xl font-black">{t("checkout.title")}</h1>

        <p className="mb-6 border-s-2 border-primary bg-primary/10 p-3 text-sm">
          {t("checkout.demoNotice")}
        </p>

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
                  autoComplete="name"
                  placeholder={t("checkout.fullNamePlaceholder")}
                  aria-invalid={!!errors.customer_name}
                  {...register("customer_name", {
                    validate: (value) =>
                      !!value.trim() || t("checkout.fullNameRequired"),
                  })}
                />
                {errors.customer_name && (
                  <p className="text-sm text-destructive">
                    {errors.customer_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("checkout.phoneNumber")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  dir="ltr"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder={t("checkout.phonePlaceholder")}
                  aria-invalid={!!errors.phone}
                  {...register("phone", {
                    required: t("checkout.phoneRequired"),
                    pattern: {
                      value: EGYPTIAN_MOBILE,
                      message: t("checkout.phoneInvalid"),
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t("checkout.address")}</Label>
                <Textarea
                  id="address"
                  autoComplete="street-address"
                  placeholder={t("checkout.addressPlaceholder")}
                  aria-invalid={!!errors.address}
                  {...register("address", {
                    validate: (value) =>
                      !!value.trim() || t("checkout.addressRequired"),
                  })}
                />
                {errors.address && (
                  <p className="text-sm text-destructive">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>{t("checkout.paymentMethod")}</Label>

                <Controller
                  control={control}
                  name="payment_method"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid gap-3 sm:grid-cols-2"
                    >
                      <Label
                        htmlFor="cash"
                        className="flex cursor-pointer items-center gap-3 border p-4 has-data-[state=checked]:border-primary"
                      >
                        <RadioGroupItem value="cash" id="cash" />
                        <Banknote className="h-5 w-5" />
                        {t("payment.cash")}
                      </Label>

                      <Label
                        htmlFor="online"
                        className="flex cursor-not-allowed items-center gap-3 border p-4 opacity-60"
                      >
                        <RadioGroupItem value="online" id="online" disabled />
                        <CreditCard className="h-5 w-5" />
                        {t("payment.online")}
                        <span className="ms-auto bg-muted px-2 py-0.5 text-[10px] tracking-widest uppercase">
                          {t("checkout.onlineSoon")}
                        </span>
                      </Label>
                    </RadioGroup>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>{t("checkout.orderSummary")}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                {availableItems.map((item) => {
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
                        {formatPrice(item.price * item.quantity, i18n.language)}
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
                <span>{formatPrice(totalPrice, i18n.language)}</span>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                disabled={isCreatingOrder}
                className="w-full"
              >
                {isCreatingOrder
                  ? t("checkout.placing")
                  : t("checkout.placeOrder")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </form>
  );
}
