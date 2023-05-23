"use client";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { schema, TregisterData } from "./schema";

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
      <form onSubmit={handleSubmit(accountRegister)} noValidate>
        <Input
          id="input-name"
          labelName="Nome"
          type="text"
          linkForm={register("name")}
          error={errors.name?.message}
          placeholder={"Digite seu nome"}
        />
        <br></br>
        <Input
          id="input-email"
          labelName="Email"
          type="email"
          linkForm={register("email")}
          error={errors.email?.message}
          placeholder={"Digite seu email"}
        />
        <br></br>
        <Input
          id="input-phone"
          labelName="Telefone"
          type="text"
          linkForm={register("phone")}
          error={errors.phone?.message}
          placeholder={"(xx)xxxxx-xxxx"}
        />
        <br></br>
        <Input
          id="input-password"
          labelName="Senha"
          type="password"
          linkForm={register("password")}
          error={errors.password?.message}
          placeholder={"Digite sua senha"}
        />
        <br></br>
        <Input
          id="input-confirm-password"
          labelName="Confirmação de senha"
          type="password"
          linkForm={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          placeholder={"Digite sua senha novamente"}
        />

        <br></br>
        <br></br>
        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}
