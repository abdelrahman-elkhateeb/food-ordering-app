import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useProducts } from "@/features/products/useProducts";
import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/types/CartTypes";
import Loading from "../MenuLoading";

export default function MenuCard() {
  const { data: products, isPending, error } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const handleAddToCart = (product: CartItem) => {
    addToCart({
      id: product.id,
      name_en: product.name_en,
      name_ar: product.name_ar,
      price: product.price,
      image_url: product.image_url,
    });
  };

  if (isPending) return <Loading />;

  if (error) return <p>{t("common.error")}</p>;

  return (
    <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => {
        const name = isArabic ? product.name_ar : product.name_en;
        const description = isArabic
          ? product.description_ar
          : product.description_en;

        return (
          <Card key={product.id} className="overflow-hidden">
            <img
              src={product.image_url}
              alt={name}
              className="h-48 w-full object-cover"
            />

            <CardContent className="space-y-2 p-4">
              <h3 className="text-lg font-semibold">{name}</h3>

              <p className="line-clamp-2 text-sm text-muted-foreground">
                {description}
              </p>
            </CardContent>

            <CardFooter className="flex items-center justify-between">
              <span className="text-lg font-bold">
                {product.price} EGP
              </span>

              <Button
                disabled={!product.is_available}
                onClick={() => handleAddToCart(product)}
              >
                {product.is_available
                  ? t("menu.addToCart")
                  : t("common.unavailable")}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}