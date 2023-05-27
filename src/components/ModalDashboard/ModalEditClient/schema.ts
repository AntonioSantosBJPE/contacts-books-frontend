import { z } from "zod";
export const schemaEditClient = z.object({
  name: z
    .string()
    .min(3, "O nome precisa ter ao menos 3 caracteres")
    .max(150, "O nome precisa ter no máximo 150 caracteres")
    .optional(),
  email: z
    .string()
    .email("Formato de email inválido")
    .max(45, "O email pode ter no máximo 45 carecteres")
    .optional(),
  phone: z
    .string()
    .regex(
      new RegExp(/^\([0-9]{2}\)[0-9]{5}-[0-9]{4}$/),
      "Formato de telefone inválido, utilize: (xx)xxxxx-xxxx"
    )
    .optional(),
});
export type TeditClient = z.infer<typeof schemaEditClient>;
