import { getOrders } from "@/services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export function useOrders() {
  const {
    data: orders,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  return {
    orders,
    isLoading,
    error,
  };
}