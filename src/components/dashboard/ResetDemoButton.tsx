import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useResetDemo } from "@/features/orders/useResetDemo";

export default function ResetDemoButton() {
  const { t } = useTranslation();
  const { resetDemo, isResetting } = useResetDemo();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={isResetting}>
          <RotateCcw className="h-4 w-4" />
          <span className="hidden sm:inline">{t("admin.resetDemo")}</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("admin.resetTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("admin.resetDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => resetDemo()}
          >
            {t("admin.resetConfirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
