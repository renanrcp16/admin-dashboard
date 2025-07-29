"use server";

import { prisma } from "@/lib/prisma";
import { TCustomerSchema } from "@/schemas/customer.schema";
import { Customer } from "@prisma/client";

export async function createCustomer(data: TCustomerSchema): Promise<Customer> {
  const customer = await prisma.customer.findUnique({
    where: { document: data.document },
  });

  if (customer) {
    throw new Error("Cannot create customer. Document already in use.");
  }

  return await prisma.customer.create({
    data: data,
  });
}
