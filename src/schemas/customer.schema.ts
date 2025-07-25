import z from "zod";

export const customerSchema = z.object({
  name: z.string().min(1),
  document: z.string().min(1),
});

export type TCustomerSchema = z.infer<typeof customerSchema>;
