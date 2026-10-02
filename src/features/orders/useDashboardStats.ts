import { useOrders } from "@/features/orders/useOrders";
import { ORDER_STATUSES, type Order } from "@/types/OrderTypes";

const DAYS = 7;

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function computeStats(orders: Order[]) {
  const today = dayKey(new Date());

  const delivered = orders.filter((order) => order.status === "delivered");
  const revenue = delivered.reduce(
    (sum, order) => sum + Number(order.total_price),
    0
  );
  const totalValue = orders.reduce(
    (sum, order) => sum + Number(order.total_price),
    0
  );

  const byStatus = ORDER_STATUSES.map((status) => ({
    status,
    count: orders.filter((order) => order.status === status).length,
  }));

  // Orders per day for the last week, oldest first, including empty days.
  const lastDays = Array.from({ length: DAYS }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (DAYS - 1 - index));
    const key = dayKey(date);
    const dayOrders = orders.filter(
      (order) => dayKey(new Date(order.created_at)) === key
    );

    return {
      date: key,
      count: dayOrders.length,
      total: dayOrders.reduce((sum, o) => sum + Number(o.total_price), 0),
    };
  });

  const dishes = new Map<
    number,
    { productId: number; name_en: string; name_ar: string; image_url?: string; quantity: number }
  >();

  for (const order of orders) {
    for (const item of order.order_items) {
      const current = dishes.get(item.product_id);
      dishes.set(item.product_id, {
        productId: item.product_id,
        name_en: item.products?.name_en ?? `#${item.product_id}`,
        name_ar: item.products?.name_ar ?? `#${item.product_id}`,
        image_url: item.products?.image_url,
        quantity: (current?.quantity ?? 0) + item.quantity,
      });
    }
  }

  const topDishes = [...dishes.values()]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return {
    revenue,
    totalOrders: orders.length,
    todayOrders: orders.filter(
      (order) => dayKey(new Date(order.created_at)) === today
    ).length,
    averageOrder: orders.length ? totalValue / orders.length : 0,
    activeOrders: orders.filter((order) => order.status !== "delivered").length,
    byStatus,
    lastDays,
    topDishes,
    recentOrders: orders.slice(0, 5),
  };
}

export function useDashboardStats() {
  const { orders, isLoading, error } = useOrders();

  return {
    stats: orders ? computeStats(orders) : null,
    isLoading,
    error,
  };
}
