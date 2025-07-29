"use server";

import { prisma } from "@/lib/prisma";
import { TProductSchema } from "@/schemas/product.schema";
import { Product } from "@prisma/client";

export async function createProduct(data: TProductSchema): Promise<Product> {
  return await prisma.product.create({
    data: data,
  });
}
