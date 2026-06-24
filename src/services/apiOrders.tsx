import supabase from "@/lib/supabase";

export async function getOrder(orderId: string) {
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq("id", orderId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return order;
}