import { supabase } from "@/lib/supabase";
import type { Product } from "@/types/ProductsTypes";

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProduct(productId: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq("id", productId)

  if (error) {
    throw new Error(error.message);
  }
}


export async function createProduct(product: Product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

type ProductFormValues = Omit<Product, "id" | "created_at">;

export async function updateProduct({
  id,
  product,
}: {
  id: number;
  product: ProductFormValues;
}) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

