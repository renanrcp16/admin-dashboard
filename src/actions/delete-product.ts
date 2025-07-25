"use server";

import { prisma } from "@/lib/prisma";

export async function deleteProduct(id: string): Promise<void> {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await prisma.product.delete({
    where: { id },
  });
}
