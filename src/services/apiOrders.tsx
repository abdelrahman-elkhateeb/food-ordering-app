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

export async function getOrders() {
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')


  if (error) {
    throw new Error(error.message);
  }

  return order;
}

export type OrderStatus =
  | "pending"
  | "preparing"
  | "out_for_delivery"
  | "delivered";

export async function updateOrderStatus({
  orderId,
  status,
}: {
  orderId: number;
  status: OrderStatus;
}) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}