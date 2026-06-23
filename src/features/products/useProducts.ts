import { getProducts } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return {
    data,
    isPending,
    error
  }
}