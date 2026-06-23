import { useProducts } from "@/features/products/useProducts"

export default function MenuCard() {
  const { data: products, isPending: isLoading, error } = useProducts();

  console.log(products);

  return (
    <div>MenuCard</div>
  )
}
