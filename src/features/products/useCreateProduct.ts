import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { createProduct as createProductApi } from "@/services/apiProducts";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    isPending: isCreating,
    mutate: createProduct,
  } = useMutation({
    mutationFn: createProductApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success(t("admin.products.created"));
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    createProduct,
    isCreating,
  };
}
