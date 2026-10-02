import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/OrderTypes";
import { statusColors } from "@/components/dashboard/orderStatusColors";

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { t } = useTranslation();

  return (
    <span className="inline-flex items-center gap-2 border px-2 py-1 text-[11px] font-semibold tracking-wider whitespace-nowrap uppercase">
      <span className={cn("size-2 rounded-full", statusColors[status])} />
      {t(`orderStatus.${status}`)}
    </span>
  );
}
