import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { updateProduct as updateProductApi } from "@/services/apiProducts";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: updateProductApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success(t("admin.products.updated"));
    },

    onError: (err) => {
      toast.error(t(`errors.${err.message}`, { defaultValue: err.message }));
    },
  });

  return { updateProduct, isUpdating };
}
