import { z } from "zod";
export const schema = z
  .object({
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
    password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      )
      .min(8)
      .max(32),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must be the same",
    path: ["confirmPassword"],
  });
export type TregisterData = z.infer<typeof schema>;
