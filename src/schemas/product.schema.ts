import { formatToNumberZodSchema } from "@/utils/validate-number-zod-schema";
import z from "zod";

export const productSchema = z.object({
  name: z.string(),
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
  stock: z
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
        .gte(0, {
          error: ({ minimum }) => `It must be over or equal to ${minimum}`,
        })
    ),
});

export type TProductSchema = z.infer<typeof productSchema>;
