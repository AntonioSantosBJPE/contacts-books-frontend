import { z } from "zod";
export const schemaEditClient = z.object({
  name: z.string().min(3).max(150).optional(),
  email: z.string().email().max(45).optional(),
  phone: z
    .string()
    .regex(
      new RegExp(/^\([0-9]{2}\)[0-9]{5}-[0-9]{4}$/),
      "Invalid format, use (99)92222-1111"
    )
    .optional(),
});
export type TeditClient = z.infer<typeof schemaEditClient>;
