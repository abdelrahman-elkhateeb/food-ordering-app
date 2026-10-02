import { createOrder } from "@/services/apiOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const {
    mutate: createNewOrder,
    isPending: isCreatingOrder,
    error,
  } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    createNewOrder,
    isCreatingOrder,
    error,
  };
}
