"use client";

import { Customer } from "@prisma/client";
import { CustomerForm } from "./customer-form";
import { createCustomer } from "@/actions/create-customer";
import { toastListStore } from "@/zustand/toast-list";

export function CreateCustomerForm({
  onFormSubmit,
}: {
  onFormSubmit: (data: Customer) => void;
}) {
  const { add } = toastListStore();

  return (
    <CustomerForm
      onFormSubmit={async (data) => {
        await createCustomer(data)
          .then((customer) => {
            add({
              title: "Success",
              message: "Customer has been successfully created",
              style: "success",
            });

            onFormSubmit({ ...data, id: customer.id });
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
