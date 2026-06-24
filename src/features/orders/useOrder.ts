import { getOrder } from "@/services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export function useOrder(orderId: string) {
  const {
    data: order,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });

  return {
    order,
    isLoading,
    error,
  };
}