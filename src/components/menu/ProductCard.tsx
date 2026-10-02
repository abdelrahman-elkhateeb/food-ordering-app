import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/ProductsTypes";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";
  const name = isArabic ? product.name_ar : product.name_en;
  const description = isArabic
    ? product.description_ar
    : product.description_en;

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name_en: product.name_en,
      name_ar: product.name_ar,
      price: product.price,
      image_url: product.image_url,
    });
    toast.success(t("menu.added", { name }));
  }

  return (
    <Card className="group overflow-hidden pt-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image_url}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.category && (
          <span className="absolute start-3 top-3 bg-background/90 px-2 py-1 text-[10px] font-semibold tracking-widest uppercase">
            {t(`categories.${product.category}`)}
          </span>
        )}
      </div>

      <CardContent className="flex-1 space-y-2">
        <h3 className="text-lg font-bold">{name}</h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <span className="text-lg font-black">
          {formatPrice(product.price, i18n.language)}
        </span>

        <Button disabled={!product.is_available} onClick={handleAddToCart}>
          {product.is_available ? (
            <>
              <Plus className="h-4 w-4" />
              {t("menu.addToCart")}
            </>
          ) : (
            t("common.unavailable")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
