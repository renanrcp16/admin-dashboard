"use server";

import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany();
  return products.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
}
