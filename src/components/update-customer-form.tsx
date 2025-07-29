"use client";

import { Customer } from "@prisma/client";
import { CustomerForm } from "./customer-form";
import { TCustomerSchema } from "@/schemas/customer.schema";
import { updateCustomer } from "@/actions/update-customer";
import { toastListStore } from "@/zustand/toast-list";

export function UpdateCustomerForm({
  customer,
  onFormSubmit,
}: {
  customer: Customer;
  onFormSubmit: (id: string, data: TCustomerSchema) => void;
}) {
  const { add } = toastListStore();

  return (
    <CustomerForm
      customer={customer}
      onFormSubmit={async (data) => {
        await updateCustomer(customer.id, data)
          .then(() => {
            add({
              title: "Success",
              message: "Customer has been successfully updated",
              style: "success",
            });
            onFormSubmit(customer.id, data);
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
