import { supabase } from "@/lib/supabase";
import type { Product, ProductFormValues } from "@/types/ProductsTypes";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .is("archived_at", null)
    .order("id");

  if (error) throw new Error(error.message);

  return data;
}

// Products that appear in past orders are archived instead of deleted so order
// history keeps their name and image (see delete_product in supabase/migrations).
export async function deleteProduct(
  productId: number
): Promise<"deleted" | "archived"> {
  const { data, error } = await supabase.rpc("delete_product", {
    p_product_id: productId,
  });

  if (error) throw new Error(error.message);

  return data;
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
