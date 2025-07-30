"use server";

import { prisma } from "@/lib/prisma";
import { formatToNumberZodSchema } from "@/utils/format-to-number-zod-schema";

export type TGetOrder = {
  id: number;
  date: Date;
  customer: {
    id: string;
    name: string;
  };
  totalQty: number;
  totalPrice: number;
  items: {
    product: {
      id: string;
      name: string;
    };
    qty: number;
    price: number;
    total: number;
  }[];
};

export async function getOrder(id: number): Promise<TGetOrder> {
  const order = await prisma.order.findUnique({
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
          productId: true,
          qty: true,
          price: true,
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      id,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

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
      total: +(item.qty * item.price).toFixed(2),
    })),
    totalPrice: formatToNumberZodSchema(totalPrice),
    totalQty: formatToNumberZodSchema(totalQty),
  };
}
