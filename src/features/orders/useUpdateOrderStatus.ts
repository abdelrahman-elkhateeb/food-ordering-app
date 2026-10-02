import { updateOrderStatus } from "@/services/apiOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutate: changeOrderStatus,
    isPending,
    variables,
  } = useMutation({
    mutationFn: updateOrderStatus,

    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", order.id] });
      toast.success(
        t("admin.orders.statusUpdated", {
          id: order.id,
          status: t(`orderStatus.${order.status}`),
        })
      );
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Only the row being updated should show a busy state.
  const updatingOrderId = isPending ? variables?.orderId : undefined;

  return { changeOrderStatus, updatingOrderId };
}
