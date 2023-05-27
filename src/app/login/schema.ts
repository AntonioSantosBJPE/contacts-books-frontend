import { z } from "zod";
export const schema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().nonempty("O campo de senha está vazio"),
});
export type TloginData = z.infer<typeof schema>;
