import { supabase } from "@/lib/supabase";
import type { Product, ProductFormValues } from "@/types/ProductsTypes";

// Postgres foreign key violation: the product is referenced by an order.
const FOREIGN_KEY_VIOLATION = "23503";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id");

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteProduct(productId: number) {
  // .select() makes RLS-blocked deletes visible: they return 0 rows, no error.
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .select("id");

  if (error?.code === FOREIGN_KEY_VIOLATION) {
    throw new Error("PRODUCT_IN_ORDERS");
  }

  if (error) throw new Error(error.message);

  if (data.length === 0) throw new Error("PRODUCT_PROTECTED");
}

export async function createProduct(
  product: ProductFormValues
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateProduct({
  id,
  product,
}: {
  id: number;
  product: ProductFormValues;
}): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!data) throw new Error("PRODUCT_PROTECTED");

  return data;
}
