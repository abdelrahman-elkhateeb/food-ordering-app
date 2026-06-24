import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Product } from "@/types/ProductsTypes";

type ProductFormValues = Omit<Product, "id" | "created_at">;

type AddProductFormProps = {
  onSuccess?: () => void;
};

export default function AdminAddProductForm({
  onSuccess,
}: AddProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      is_available: true,
    },
  });

  const isAvailable = watch("is_available");

  function onSubmit(data: ProductFormValues) {
    console.log(data);

    // createProduct(data);
    reset();
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Name EN</FieldLabel>
            <Input
              {...register("name_en", {
                required: "English name is required",
              })}
            />
            {errors.name_en && (
              <p className="text-sm text-destructive">
                {errors.name_en.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel>Name AR</FieldLabel>
            <Input
              dir="rtl"
              {...register("name_ar", {
                required: "Arabic name is required",
              })}
            />
            {errors.name_ar && (
              <p className="text-sm text-destructive">
                {errors.name_ar.message}
              </p>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel>Description EN</FieldLabel>
          <Textarea
            {...register("description_en", {
              required: "English description is required",
            })}
          />
        </Field>

        <Field>
          <FieldLabel>Description AR</FieldLabel>
          <Textarea
            dir="rtl"
            {...register("description_ar", {
              required: "Arabic description is required",
            })}
          />
        </Field>

        <Field>
          <FieldLabel>Price</FieldLabel>
          <Input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Price must be greater than 0",
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
          <FieldLabel>Image URL</FieldLabel>
          <Input
            {...register("image_url", {
              required: "Image URL is required",
            })}
          />
          {errors.image_url && (
            <p className="text-sm text-destructive">
              {errors.image_url.message}
            </p>
          )}
        </Field>

        <Field className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div>
            <FieldLabel>Available</FieldLabel>
            <p className="text-sm text-muted-foreground">
              Allow customers to add this product to cart.
            </p>
          </div>

          <Switch
            checked={isAvailable}
            onCheckedChange={(checked) =>
              setValue("is_available", checked)
            }
          />
        </Field>

        <Button type="submit" className="w-full">
          Create Product
        </Button>
      </FieldGroup>
    </form>
  );
}