import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProduct as updateProductApi } from "@/services/apiProducts";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: updateProductApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return { updateProduct, isUpdating };
}