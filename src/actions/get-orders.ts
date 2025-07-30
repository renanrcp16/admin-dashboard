"use server";

import { prisma } from "@/lib/prisma";
import { formatToNumberZodSchema } from "@/utils/format-to-number-zod-schema";
import { TGetOrder } from "./get-order";

export async function getOrders(): Promise<TGetOrder[]> {
  const orders = await prisma.order.findMany({
    orderBy: { id: "desc" },
    select: {
      id: true,
      date: true,
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
      items: {
        select: {
          product: {
            select: {
              id: true,
              name: true,
            },
          },
          qty: true,
          price: true,
        },
      },
    },
  });

  const mappedOrders: TGetOrder[] = orders.map((order) => {
    const totalPrice = order.items
      .reduce((sum, item) => sum + item.price * item.qty, 0)
      .toLocaleString("pt-br", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    const totalQty = order.items
      .reduce((sum, item) => sum + item.qty, 0)
      .toLocaleString("pt-br", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });

    return {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        total: item.qty * item.price,
      })),
      totalPrice: formatToNumberZodSchema(totalPrice),
      totalQty: formatToNumberZodSchema(totalQty),
    };
  });

  return mappedOrders;
}
