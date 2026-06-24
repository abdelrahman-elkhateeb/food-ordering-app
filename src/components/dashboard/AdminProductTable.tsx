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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/features/products/useProducts";
import { useDeleteProduct } from "@/features/products/useDeleteProduct";
import { MoreHorizontal } from "lucide-react";


export default function AdminProductTable() {
  const { data: products, isPending: isProductLoading, error } = useProducts();
  const { deleteProduct, isDeleting } = useDeleteProduct();

  if (isProductLoading && isDeleting) return <p>Loading...</p>;

  if (error) return <p>Something went wrong.</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Products</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image_url}
                      alt={product.name_en}
                      className="h-12 w-12 rounded-md object-cover"
                    />

                    <div>
                      <p className="font-medium">{product.name_en}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{product.price} EGP</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      product.is_available ? "default" : "secondary"
                    }
                  >
                    {product.is_available ? "available" : "unavailable"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent >
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => deleteProduct(product.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
