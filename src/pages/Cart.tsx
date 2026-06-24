import { useTranslation } from "react-i18next";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";

export default function Cart() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const cart = useCartStore((state) => state.cart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold">{t("cart.empty")}</h1>

        <p className="text-muted-foreground">
          {t("cart.emptyDescription")}
        </p>

        <Button asChild>
          <Link to="/menu">{t("cart.browseMenu")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("cart.title")}</h1>

          <p className="text-muted-foreground">
            {t("cart.itemsCount", { count: totalItems })}
          </p>
        </div>

        <Button variant="outline" onClick={clearCart}>
          {t("cart.clear")}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map((item) => {
            const name = isArabic ? item.name_ar : item.name_en;

            return (
              <Card key={item.id}>
                <CardContent className="flex gap-4 p-4">
                  <img
                    src={item.image_url}
                    alt={name}
                    className="h-24 w-24 rounded-md object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold">{name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.price} {t("common.currency")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <Minus size={16} />
                        </Button>

                        <span className="w-6 text-center font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{t("cart.orderSummary")}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>{t("cart.items")}</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between">
              <span>{t("cart.subtotal")}</span>
              <span>
                {totalPrice} {t("common.currency")}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>{t("cart.total")}</span>
              <span>
                {totalPrice} {t("common.currency")}
              </span>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" asChild>
              <Link to="/checkout">{t("cart.checkout")}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}