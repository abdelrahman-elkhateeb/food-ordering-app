import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Product } from "@/types/ProductsTypes";
import { updateProduct as updateProductApi } from "@/services/apiProducts";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdating,
    mutate: updateProduct,
  } = useMutation({
    mutationFn: ({
      newProduct,
      id,
    }: {
      newProduct: Product;
      id: number;
      }) => updateProductApi(newProduct, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return {
    isUpdating,
    updateProduct,
  };
}