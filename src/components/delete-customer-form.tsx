"use client";

import { Customer } from "@prisma/client";
import { CustomerForm } from "./customer-form";
import { deleteCustomer } from "@/actions/delete-customer";
import { toastListStore } from "@/zustand/toast-list";

export function DeleteCustomerForm({
  customer,
  onFormSubmit,
}: {
  customer: Customer;
  onFormSubmit: (id: string) => void;
}) {
  const { add } = toastListStore();
  return (
    <CustomerForm
      customer={customer}
      formDisabled
      onFormSubmit={async () => {
        await deleteCustomer(customer.id)
          .then(() => {
            add({
              title: "Success",
              message: "Customer has been successfully removed",
              style: "success",
            });
            onFormSubmit(customer.id);
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
