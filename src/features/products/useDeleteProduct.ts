import { deleteProduct as deleteProductApi } from "@/services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { isPending: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success(
        result === "archived"
          ? t("admin.products.archived")
          : t("admin.products.deleted")
      );
    },
    onError: (err) => {
      toast.error(t(`errors.${err.message}`, { defaultValue: err.message }));
    },
  });

  return {
    deleteProduct,
    isDeleting,
  };
}
