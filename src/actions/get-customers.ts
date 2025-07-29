"use server";

import { prisma } from "@/lib/prisma";
import { Customer } from "@prisma/client";

export async function getCustomers(): Promise<Customer[]> {
  const customers = await prisma.customer.findMany();
  return customers.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
}
