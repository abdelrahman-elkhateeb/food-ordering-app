import { resetDemoData } from "@/services/apiOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function useResetDemo() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: resetDemo, isPending: isResetting } = useMutation({
    mutationFn: resetDemoData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(t("admin.resetDone"));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { resetDemo, isResetting };
}
