import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import supabase from "@/lib/supabase";
import { getOrder } from "@/services/apiOrders";
import type { Order } from "@/types/OrderTypes";

export function useOrder(orderId: number | null) {
  const queryClient = useQueryClient();

  const {
    data: order,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId!),
    enabled: orderId !== null,
  });

  // Live tracking: patch the cached order whenever its row changes.
  useEffect(() => {
    if (orderId === null) return;

    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          queryClient.setQueryData<Order | null>(["order", orderId], (old) =>
            old ? { ...old, ...(payload.new as Partial<Order>) } : old
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId, queryClient]);

  return {
    order,
    isLoading,
    error,
  };
}
