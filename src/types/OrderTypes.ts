import type { Product } from "@/types/ProductsTypes";

export const ORDER_STATUSES = [
  "pending",
  "preparing",
  "out_for_delivery",
  "delivered",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type PaymentMethod = "cash" | "online";

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  products: Pick<Product, "name_en" | "name_ar" | "image_url"> | null;
};

export type Order = {
  id: number;
  user_id: string | null;
  customer_name: string;
  phone: string;
  address: string;
  payment_method: PaymentMethod;
  status: OrderStatus;
  total_price: number;
  created_at: string;
  order_items: OrderItem[];
};

export type CreateOrderData = {
  customer_name: string;
  phone: string;
  address: string;
  payment_method: PaymentMethod;
  items: { product_id: number; quantity: number }[];
};
