"use client";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { schema, TregisterData } from "./schema";
import { handlePhone } from "./utils";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TregisterData>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const accountRegister = async (data: TregisterData) => {
    try {
      const response = await api.post("/clients", data);
      const responseLogin = await api.post("/login", data);

      const { accessToken } = responseLogin.data;
      api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      localStorage.setItem("@contacts-book:token", accessToken);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1> Register</h1>
      <div>
        <Link href="/login">Login</Link>
        <br></br>
        <Link href="/">Home</Link>
      </div>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit(accountRegister)}>
        <label htmlFor="input-name">Nome </label>
        <input type="text" id="input-name" {...register("name")} />
        <p>{errors.name?.message}</p>
        <br></br>
        <label htmlFor="input-email">Email </label>
        <input type="text" id="input-email" {...register("email")} />
        <p>{errors.email?.message}</p>
        <br></br>
        <label htmlFor="input-phone">Telefone </label>
        <input
          type="text"
          id="input-phone"
          {...register("phone")}
          placeholder="(xx)xxxxx-xxxx"
          onChange={(event) => handlePhone(event)}
          maxLength={14}
        />
        <p>{errors.phone?.message}</p>
        <br></br>
        <label htmlFor="input-password">Senha </label>
        <input type="password" id="input-password" {...register("password")} />
        <p>{errors.password?.message}</p>
        <br></br>
        <label htmlFor="input-confirm-password">Confirmação de Senha </label>
        <input
          type="password"
          id="input-confirm-password"
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>
        <br></br>
        <br></br>
        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}
