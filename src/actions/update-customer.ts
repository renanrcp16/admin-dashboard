"use server";

import { prisma } from "@/lib/prisma";
import { TCustomerSchema } from "@/schemas/customer.schema";

export async function updateCustomer(
  id: string,
  data: TCustomerSchema
): Promise<void> {
  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  await prisma.customer.update({
    data: data,
    where: { id },
  });
}
