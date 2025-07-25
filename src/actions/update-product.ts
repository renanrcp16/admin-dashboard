"use server";

import { prisma } from "@/lib/prisma";
import { TProductSchema } from "@/schemas/product.schema";

export async function updateProduct(
  id: string,
  data: TProductSchema
): Promise<void> {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await prisma.product.update({
    data: data,
    where: { id },
  });
}
