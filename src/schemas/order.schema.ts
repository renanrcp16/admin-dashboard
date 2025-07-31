import { formatToNumberZodSchema } from "@/utils/format-to-number-zod-schema";
import { z } from "zod";

const numberLike = z.union([z.string(), z.number()]).transform((arg) => {
  const parsed = typeof arg === "string" ? formatToNumberZodSchema(arg) : arg;
  if (isNaN(parsed)) throw new Error("Invalid number");
  return parsed;
});

const orderItemSchema = z.object({
  productId: z.cuid("Required"),
  qty: numberLike.pipe(
    z.number().gt(0, {
      error: ({ minimum }) => `Quantity must be greater than ${minimum}`,
    })
  ),
  price: numberLike.pipe(
    z
      .number()
      .gt(0, {
        error: ({ minimum }) => `Price must be greater than ${minimum}`,
      })
  ),
  total: numberLike,
});

export const orderSchema = z.object({
  customerId: z.cuid("Required"),
  date: z.coerce.date("Required"),
  items: z.array(orderItemSchema).min(1),
});

export type TOrderItemSchem = z.infer<typeof orderItemSchema>;
export type TOrderSchema = z.infer<typeof orderSchema>;
