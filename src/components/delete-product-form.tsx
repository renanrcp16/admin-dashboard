"use client";

import { Product } from "@prisma/client";
import { ProductForm } from "./product-form";
import { deleteProduct } from "@/actions/delete-product";

export function DeleteProductForm({
  product,
  onFormSubmit,
}: {
  product: Product;
  onFormSubmit: (id: string) => void;
}) {
  return (
    <ProductForm
      product={product}
      formDisabled
      onFormSubmit={async () => {
        await deleteProduct(product.id);
        onFormSubmit(product.id);
      }}
    />
  );
}
