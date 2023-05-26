import { z } from "zod";
export const schema = z.object({
  name: z
    .string()
    .min(3, "O nome precisa ter ao menos 3 caracteres")
    .max(150, "O nome precisa ter no máximo 150 caracteres"),
  email: z
    .string()
    .email("Formato de email inválido")
    .max(45, "O email pode ter no máximo 45 carecteres"),
  phone: z
    .string()
    .regex(
      new RegExp(/^\([0-9]{2}\)[0-9]{5}-[0-9]{4}$/),
      "Formato de telefone inválido, utilize: (xx)xxxxx-xxxx"
    ),
});
export type TcreateContact = z.infer<typeof schema>;
