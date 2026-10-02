import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import AdminProductTable from "@/components/dashboard/AdminProductTable";
import AdminProductForm from "@/components/dashboard/AdminProductForm";
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
  const { t } = useTranslation();

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{t("admin.products.title")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("admin.products.subtitle")}
            </p>
          </div>

          <Button onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4" />
            {t("admin.products.add")}
          </Button>
        </div>

        <AdminProductTable />
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("admin.products.add")}</DialogTitle>
            <DialogDescription>
              {t("admin.products.addDescription")}
            </DialogDescription>
          </DialogHeader>

          <AdminProductForm onSuccess={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
