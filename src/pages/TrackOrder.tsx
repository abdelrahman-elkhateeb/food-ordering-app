import { useState } from "react";
import {
  Search,
  PackageCheck,
  ChefHat,
  Bike,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useOrder } from "@/features/orders/useOrder";

const statusOrder = ["pending", "preparing", "out_for_delivery", "delivered"];

const steps = [
  { icon: PackageCheck, status: "pending" },
  { icon: ChefHat, status: "preparing" },
  { icon: Bike, status: "out_for_delivery" },
  { icon: CheckCircle2, status: "delivered" },
];

export default function TrackOrder() {
  const { t } = useTranslation();
  const [orderIdInput, setOrderIdInput] = useState("");
  const [orderId, setOrderId] = useState("");

  const { order, isLoading, error } = useOrder(orderId);

  const hasSearched = orderId !== "";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOrderId(orderIdInput.trim());
  }

  const currentStepIndex = order ? statusOrder.indexOf(order.status) : -1;

  return (
    <section className="mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {t("trackOrder.title")}
          </CardTitle>

          <CardDescription>
            {t("trackOrder.description")}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Field className="flex-1">
              <FieldLabel htmlFor="orderId">
                {t("trackOrder.orderId")}
              </FieldLabel>

              <Input
                id="orderId"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="Example: 1"
              />
            </Field>

            <Button
              type="submit"
              disabled={!orderIdInput.trim()}
              className="sm:mt-6"
            >
              <Search className="mr-2 h-4 w-4" />
              {t("trackOrder.action")}
            </Button>
          </form>

          <Separator />

          {hasSearched && isLoading && (
            <p className="text-sm text-muted-foreground">
              {t("trackOrder.loading")}
            </p>
          )}

          {hasSearched && error && (
            <p className="text-sm text-destructive">
              {t("common.error")}
            </p>
          )}

          {hasSearched && !isLoading && !order && !error && (
            <p className="text-sm text-muted-foreground">
              {t("trackOrder.notFound")}
            </p>
          )}

          {order && (
            <div className="rounded-lg border p-4">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {t("trackOrder.order")} #{order.id}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("trackOrder.customer")}: {order.customer_name}
                  </p>
                </div>

                <Badge>{t(`orderStatus.${order.status}`)}</Badge>
              </div>

              <FieldGroup>
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const active = index <= currentStepIndex;

                  return (
                    <div key={step.status} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border ${active
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                            }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        {index !== steps.length - 1 && (
                          <div className="h-10 w-px bg-border" />
                        )}
                      </div>

                      <div>
                        <p className="font-medium">
                          {t(`orderSteps.${step.status}.title`)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t(`orderSteps.${step.status}.description`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </FieldGroup>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}