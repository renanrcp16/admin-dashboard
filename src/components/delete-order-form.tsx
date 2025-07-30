"use client";

import { TGetOrder } from "@/actions/get-order";
import { OrderForm } from "./order-form";
import { deleteOrder } from "@/actions/delete-order";
import { toastListStore } from "@/zustand/toast-list";
import { useRouter } from "next/navigation";

export function DeleteOrderForm({ order }: { order: TGetOrder }) {
  const { add } = toastListStore();
  const router = useRouter();

  return (
    <OrderForm
      order={order}
      formDisabled
      onFormSubmit={async () => {
        await deleteOrder(order.id)
          .then(() => {
            add({
              title: "Success",
              message: "Order has been successfully removed",
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
