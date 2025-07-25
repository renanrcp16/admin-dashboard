"use client";

import { Product } from "@prisma/client";
import { ProductForm } from "./product-form";
import { updateProduct } from "@/actions/update-product";
import { TProductSchema } from "@/schemas/product.schema";

export function UpdateProductForm({
  product,
  onFormSubmit,
}: {
  product: Product;
  onFormSubmit: (id: string, data: TProductSchema) => void;
}) {
  return (
    <ProductForm
      product={product}
      onFormSubmit={async (data) => {
        await updateProduct(product.id, data);
        onFormSubmit(product.id, data);
      }}
    />
  );
}
