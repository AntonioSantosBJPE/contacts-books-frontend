import { z } from "zod";
export const schema = z
  .object({
    name: z.string().min(3).max(150),
    email: z.string().email().max(45),
    phone: z
      .string()
      .regex(
        new RegExp(/^\([0-9]{2}\)[0-9]{5}-[0-9]{4}$/),
        "Invalid format, use (99)92222-1111"
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
