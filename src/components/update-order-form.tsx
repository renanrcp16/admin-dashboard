"use client";

import { TGetOrder } from "@/actions/get-order";
import { OrderForm } from "./order-form";
import { updateOrder } from "@/actions/update-order";
import { toastListStore } from "@/zustand/toast-list";
import { useRouter } from "next/navigation";

export function UpdateOrderForm({ order }: { order: TGetOrder }) {
  const { add } = toastListStore();
  const router = useRouter();

  return (
    <OrderForm
      order={order}
      onFormSubmit={async (data) => {
        await updateOrder(order.id, data)
          .then(() => {
            add({
              title: "Success",
              message: "Order has been successfully updated",
              style: "success",
            });

            router.push("/orders");
          })
          .catch((err) => {
            add({
              title: "Error",
              message: err.message,
              style: "error",
            });
          });
      }}
    />
  );
}
