import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "@/services/apiProducts";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const {
    isPending: isCreating,
    mutate: createProduct,
  } = useMutation({
    mutationFn: createProductApi,

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
    createProduct,
    isCreating,
  };
}