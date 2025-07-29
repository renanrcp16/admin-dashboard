"use client";

import { ProductForm } from "./product-form";
import { createProduct } from "@/actions/create-product";
import { toastListStore } from "@/zustand/toast-list";
import { Product } from "@prisma/client";

export function CreateProductForm({
  onFormSubmit,
}: {
  onFormSubmit: (data: Product) => void;
}) {
  const { add } = toastListStore();

  return (
    <ProductForm
      onFormSubmit={async (data) => {
        await createProduct(data)
          .then((customer) => {
            add({
              title: "Success",
              message: "Product has been successfully created",
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
