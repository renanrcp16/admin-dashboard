"use server";

import { prisma } from "@/lib/prisma";

export async function deleteOrder(id: number): Promise<void> {
  const existingOrder = await prisma.order.findUnique({
    where: { id },
  });

  if (!existingOrder) {
    throw new Error("Order not found");
  }

  await prisma.order.delete({
    where: {
      id,
    },
  });
}
