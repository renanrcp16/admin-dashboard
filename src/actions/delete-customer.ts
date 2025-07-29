"use server";

import { prisma } from "@/lib/prisma";

export async function deleteCustomer(id: string): Promise<void> {
  const customer = await prisma.customer.findUnique({
    where: { id },
    select: {
      orders: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  if (customer.orders.length > 0) {
    throw new Error(
      "The customer record cannot be removed due to existing related orders."
    );
  }

  await prisma.customer.delete({
    where: { id },
  });
}
