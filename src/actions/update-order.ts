"use server";

import { prisma } from "@/lib/prisma";
import { TOrderSchema } from "@/schemas/order.schema";

export async function updateOrder(
  id: number,
  data: TOrderSchema
): Promise<void> {
  const existingOrder = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!existingOrder) {
    throw new Error("Order not found");
  }

  await prisma.orderItem.deleteMany({
    where: { orderId: id },
  });

  const orderItems = data.items.map((item) => ({
    productId: item.productId,
    qty: item.qty,
    price: item.price,
  }));

  await prisma.order.update({
    where: { id },
    data: {
      customerId: data.customerId,
      date: data.date,
      items: {
        create: orderItems,
      },
    },
  });
}
