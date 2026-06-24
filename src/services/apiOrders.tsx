import supabase from "@/lib/supabase";
import type { CartItem } from "@/types/CartTypes";

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

type CreateOrderData = {
  customer_name: string;
  phone: string;
  address: string;
  payment_method: "cash" | "online";
  total_price: number;
  cart: CartItem[];
  user_id?: string | null;
};

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

export async function createOrder({
  customer_name,
  phone,
  address,
  payment_method,
  total_price,
  cart,
  user_id,
}: CreateOrderData) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id,
        customer_name,
        phone,
        address,
        payment_method,
        total_price,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (orderError) throw new Error(orderError.message);

  const orderItems = cart.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id);
    throw new Error(itemsError.message);
  }

  return order;
}