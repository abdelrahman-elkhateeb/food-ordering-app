import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProduct } from "@/features/products/useCreateProduct";
import { useUpdateProduct } from "@/features/products/useUpdateProduct";
import {
  PRODUCT_CATEGORIES,
  type Product,
  type ProductFormValues,
} from "@/types/ProductsTypes";

type AdminProductFormProps = {
  // Pass a product to edit it; omit to create a new one.
  product?: Product;
  onSuccess?: () => void;
};

const emptyProduct: ProductFormValues = {
  name_en: "",
  name_ar: "",
  description_en: "",
  description_ar: "",
  price: 0,
  image_url: "",
  category: "mains",
  is_available: true,
};

export default function AdminProductForm({
  product,
  onSuccess,
}: AdminProductFormProps) {
  const { t } = useTranslation();
  const { createProduct, isCreating } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();

  const isEditing = !!product;
  const isWorking = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: product
      ? {
          name_en: product.name_en,
          name_ar: product.name_ar,
          description_en: product.description_en,
          description_ar: product.description_ar,
          price: product.price,
          image_url: product.image_url,
          category: product.category ?? "mains",
          is_available: product.is_available,
        }
      : emptyProduct,
  });

  function onSubmit(data: ProductFormValues) {
    if (isEditing) {
      updateProduct({ id: product.id, product: data }, { onSuccess });
      return;
    }

    createProduct(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  }

  const required = { required: t("admin.products.form.required") };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name_en">
              {t("admin.products.form.nameEn")}
            </FieldLabel>
            <Input
              id="name_en"
              dir="ltr"
              disabled={isWorking}
              aria-invalid={!!errors.name_en}
              {...register("name_en", required)}
            />
            {errors.name_en && (
              <p className="text-sm text-destructive">
                {errors.name_en.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="name_ar">
              {t("admin.products.form.nameAr")}
            </FieldLabel>
            <Input
              id="name_ar"
              dir="rtl"
              disabled={isWorking}
              aria-invalid={!!errors.name_ar}
              {...register("name_ar", required)}
            />
            {errors.name_ar && (
              <p className="text-sm text-destructive">
                {errors.name_ar.message}
              </p>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="description_en">
            {t("admin.products.form.descriptionEn")}
          </FieldLabel>
          <Textarea
            id="description_en"
            dir="ltr"
            disabled={isWorking}
            aria-invalid={!!errors.description_en}
            {...register("description_en", required)}
          />
          {errors.description_en && (
            <p className="text-sm text-destructive">
              {errors.description_en.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="description_ar">
            {t("admin.products.form.descriptionAr")}
          </FieldLabel>
          <Textarea
            id="description_ar"
            dir="rtl"
            disabled={isWorking}
            aria-invalid={!!errors.description_ar}
            {...register("description_ar", required)}
          />
          {errors.description_ar && (
            <p className="text-sm text-destructive">
              {errors.description_ar.message}
            </p>
          )}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="price">
              {t("admin.products.form.price")}
            </FieldLabel>
            <Input
              id="price"
              type="number"
              step="0.01"
              dir="ltr"
              disabled={isWorking}
              aria-invalid={!!errors.price}
              {...register("price", {
                ...required,
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: t("admin.products.form.priceMin"),
                },
              })}
            />
            {errors.price && (
              <p className="text-sm text-destructive">
                {errors.price.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel>{t("admin.products.form.category")}</FieldLabel>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isWorking}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {t(`categories.${category}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="image_url">
            {t("admin.products.form.imageUrl")}
          </FieldLabel>
          <Input
            id="image_url"
            type="url"
            dir="ltr"
            disabled={isWorking}
            placeholder="https://example.com/product.jpg"
            aria-invalid={!!errors.image_url}
            {...register("image_url", required)}
          />
          {errors.image_url && (
            <p className="text-sm text-destructive">
              {errors.image_url.message}
            </p>
          )}
        </Field>

        <Field className="flex flex-row items-center justify-between border p-4">
          <div>
            <FieldLabel>{t("admin.products.form.available")}</FieldLabel>
            <p className="text-sm text-muted-foreground">
              {t("admin.products.form.availableHint")}
            </p>
          </div>

          <Controller
            control={control}
            name="is_available"
            render={({ field }) => (
              <Switch
                checked={field.value}
                disabled={isWorking}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </Field>

        <Button type="submit" disabled={isWorking} className="w-full">
          {isEditing
            ? isUpdating
              ? t("admin.products.form.updating")
              : t("admin.products.form.update")
            : isCreating
              ? t("admin.products.form.creating")
              : t("admin.products.form.create")}
        </Button>
      </FieldGroup>
    </form>
  );
}
