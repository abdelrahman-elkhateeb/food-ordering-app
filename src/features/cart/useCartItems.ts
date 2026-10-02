import { useProducts } from "@/features/products/useProducts";
import { useCartStore } from "@/store/cartStore";

// The cart stores a snapshot of each product. Merge it with the latest product
// data so prices and availability shown before checkout match what the
// database will charge.
export function useCartItems() {
  const cart = useCartStore((state) => state.cart);
  const { data: products } = useProducts();

  const items = cart.map((item) => {
    const product = products?.find((p) => p.id === item.id);

    return {
      ...item,
      price: product?.price ?? item.price,
      isAvailable: products ? !!product?.is_available : true,
    };
  });

  const availableItems = items.filter((item) => item.isAvailable);

  const totalItems = availableItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = availableItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return {
    items,
    availableItems,
    hasUnavailableItems: availableItems.length !== items.length,
    totalItems,
    totalPrice,
  };
}
