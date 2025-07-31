"use server";

import { prisma } from "@/lib/prisma";
import { orderSchema, TOrderSchema } from "@/schemas/order.schema";

export async function createOrder(order: TOrderSchema) {
  const data: TOrderSchema = orderSchema.parse(order);

  for (const item of data.items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      select: { stock: true, name: true },
    });

    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found.`);
    }

    if (product.stock < item.qty) {
      throw new Error(
        `Insufficient stock for product "${product.name}". Available: ${product.stock}, requested: ${item.qty}`
      );
    }
  }

  const createdOrder = await prisma.order.create({
    data: {
      customerId: data.customerId,
      date: data.date,
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          qty: item.qty,
          price: item.price,
        })),
      },
    },
  });

  await Promise.all(
    data.items.map((item) =>
      prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.qty,
          },
        },
      })
    )
  );

  return createdOrder;
}
