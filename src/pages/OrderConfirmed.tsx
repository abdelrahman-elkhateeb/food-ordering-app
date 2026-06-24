import { CheckCircle2, PackageSearch } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrderConfirmed() {
  const { orderId } = useParams();

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-10">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <CardTitle className="text-2xl">
            Order Confirmed
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-muted-foreground">
            Your order has been placed successfully.
          </p>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="text-xl font-bold">#{orderId}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="w-full" asChild>
              <Link to={`/track-order`}>
                <PackageSearch className="mr-2 h-4 w-4" />
                Track Order
              </Link>
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/menu">Back to Menu</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}