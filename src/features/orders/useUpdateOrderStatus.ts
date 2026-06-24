import { updateOrderStatus } from "@/services/apiOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  const { mutate: changeOrderStatus, isPending: isUpdating } = useMutation({
    mutationFn: updateOrderStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return { changeOrderStatus, isUpdating };
}