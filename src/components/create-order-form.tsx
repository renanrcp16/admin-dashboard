"use client";

import { createOrder } from "@/actions/create-order";
import { toastListStore } from "@/zustand/toast-list";
import { Order } from "@prisma/client";
import { OrderForm } from "./order-form";
import { useRouter } from "next/navigation";

export function CreateOrderForm({
  onFormSubmit,
}: {
  onFormSubmit: (data: Order) => void;
}) {
  const { add } = toastListStore();
  const router = useRouter();

  return (
    <OrderForm
      onFormSubmit={async (data) => {
        await createOrder(data)
          .then(() => {
            add({
              title: "Success",
              message: "Order has been successfully created",
              style: "success",
            });

            router.push("/orders");
          })
          .catch((err) => {
            console.log(err);

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
