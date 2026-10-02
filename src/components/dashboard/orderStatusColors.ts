import type { OrderStatus } from "@/types/OrderTypes";

export const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-500",
  preparing: "bg-sky-500",
  out_for_delivery: "bg-violet-500",
  delivered: "bg-emerald-500",
};
