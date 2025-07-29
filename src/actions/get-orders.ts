"use server";

import { prisma } from "@/lib/prisma";

export type TGetOrder = {
  id: number;
  date: Date;
  customer: {
    id: string;
    name: string;
  };
  items: {
    id: number;
    productId: string;
    qty: number;
    price: number;
  }[];
};

export async function getOrders(): Promise<TGetOrder[]> {
  const orders: TGetOrder[] = await prisma.order.findMany({
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
          id: true,
          productId: true,
          qty: true,
          price: true,
        },
      },
    },
  });

  return orders;
}
