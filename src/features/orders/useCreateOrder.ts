import { createOrder } from "@/services/apiOrders";
import { useMutation } from "@tanstack/react-query";

export function useCreateOrder() {
  const {
    mutate: createNewOrder,
    isPending: isCreatingOrder,
    error,
  } = useMutation({
    mutationFn: createOrder,
  });

  return {
    createNewOrder,
    isCreatingOrder,
    error,
  };
}