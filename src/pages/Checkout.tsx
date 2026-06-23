import { Link } from "react-router-dom";
import { CreditCard, Banknote } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/cartStore";

export default function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button asChild>
          <Link to="/menu">Back to Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="py-8">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="customerName">Full Name</Label>
              <Input id="customerName" placeholder="Ahmed Mohamed" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="01012345678" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Street, building, apartment, city"
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Payment Method</Label>

              <RadioGroup defaultValue="cash" className="grid gap-3 sm:grid-cols-2">
                <Label
                  htmlFor="cash"
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-4"
                >
                  <RadioGroupItem value="cash" id="cash" />
                  <Banknote className="h-5 w-5" />
                  Cash
                </Label>

                <Label
                  htmlFor="online"
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-4"
                >
                  <RadioGroupItem value="online" id="online" />
                  <CreditCard className="h-5 w-5" />
                  Online
                </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between gap-4 text-sm">
                  <span>
                    {item.name_en} × {item.quantity}
                  </span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex justify-between">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full">Place Order</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}