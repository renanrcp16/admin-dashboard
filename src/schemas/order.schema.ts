import { formatToNumberZodSchema } from "@/utils/format-to-number-zod-schema";
import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.cuid("Required"),
  qty: z
    .string()
    .refine((arg) => {
      const str = formatToNumberZodSchema(arg);
      return !isNaN(str);
    }, "Invalid number format")
    .transform((arg) => {
      return formatToNumberZodSchema(arg);
    })
    .pipe(
      z.number().gte(0, {
        error: ({ minimum }) => `It must be over or equal to ${minimum}`,
      })
    ),
  price: z
    .string()
    .refine((arg) => {
      const str = formatToNumberZodSchema(arg);
      return !isNaN(str);
    }, "Invalid number format")
    .transform((arg) => {
      return formatToNumberZodSchema(arg);
    })
    .pipe(
      z
        .number()
        .gt(0, { error: ({ minimum }) => `It must be over to ${minimum}` })
    ),
  total: z
    .string()
    .refine((arg) => {
      const str = formatToNumberZodSchema(arg);
      return !isNaN(str);
    }, "Invalid number format")
    .transform((arg) => {
      return formatToNumberZodSchema(arg);
    }),
});

export const orderSchema = z.object({
  customerId: z.cuid("Required"),
  date: z.coerce.date("Required"),
  items: z.array(orderItemSchema).min(1),
});

export type TOrderItemSchem = z.infer<typeof orderItemSchema>;
export type TOrderSchema = z.infer<typeof orderSchema>;
