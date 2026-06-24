import { useState } from "react";
import { Plus } from "lucide-react";

import AdminProductTable from "@/components/dashboard/AdminProductTable";
import AdminAddProductForm from "@/components/dashboard/AdminAddProductForm";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AdminProducts() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-sm text-muted-foreground">
              Manage menu items, prices, and availability.
            </p>
          </div>

          <Button onClick={() => setIsOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <AdminProductTable />
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Create a new menu item for your food app.
            </DialogDescription>
          </DialogHeader>

          <AdminAddProductForm onSuccess={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}