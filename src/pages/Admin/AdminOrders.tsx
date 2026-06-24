import { Eye, MoreHorizontal, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrders } from "@/features/orders/useOrders";
import { useUpdateOrderStatus } from "@/features/orders/useUpdateOrderStatus";

function getStatusVariant(status: string) {
  if (status === "delivered") return "default";
  if (status === "cancelled") return "destructive";
  return "secondary";
}

export default function AdminOrders() {
  const { orders = [], isLoading, error } = useOrders();
  const { changeOrderStatus, isUpdating } = useUpdateOrderStatus();

  if (isLoading) return <p>Loading orders...</p>;

  if (error) return <p>Something went wrong.</p>;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total_price),
    0
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Manage customer orders and delivery status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {orders.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {pendingOrders}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {revenue} EGP
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="w-[80px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">#{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {order.customer_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.phone}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {order.payment_method}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status.replaceAll("_", " ")}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {order.total_price} EGP
                  </TableCell>

                  <TableCell>
                    <Sheet>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <SheetTrigger asChild>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                          </SheetTrigger>

                          <DropdownMenuItem
                            disabled={isUpdating}
                            onClick={() =>
                              changeOrderStatus({
                                orderId: order.id,
                                status: "preparing",
                              })
                            }
                          >
                            Mark preparing
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            disabled={isUpdating}
                            onClick={() =>
                              changeOrderStatus({
                                orderId: order.id,
                                status: "out_for_delivery",
                              })
                            }
                          >
                            Out for delivery
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            disabled={isUpdating}
                            onClick={() =>
                              changeOrderStatus({
                                orderId: order.id,
                                status: "delivered",
                              })
                            }
                          >
                            Mark delivered
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <SheetContent className="sm:max-w-md">
                        <SheetHeader>
                          <SheetTitle>Order #{order.id}</SheetTitle>
                          <SheetDescription>
                            Customer and order details.
                          </SheetDescription>
                        </SheetHeader>

                        <div className="mt-6 space-y-6">
                          <div className="space-y-1">
                            <p className="font-medium">
                              {order.customer_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.phone}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.address}
                            </p>
                          </div>

                          <Separator />

                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>{order.total_price} EGP</span>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {orders.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No orders found.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}