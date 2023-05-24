"use client";
import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import { AuthContext } from "@/contexts/AuthContext";
import { Iclient, IloginClient } from "@/contexts/types";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { schema, TregisterData } from "./schema";
import styles from "./styles.module.scss";
import { handlePhone } from "./utils";

export default function RegisterPage() {
  const { udpateClient } = useContext(AuthContext);
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
      const response = await api.post<Iclient>("/clients", data);
      const responseLogin = await api.post<IloginClient>("/login", data);
      udpateClient(response.data);
      const { accessToken } = responseLogin.data;
      api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      localStorage.setItem("@contacts-book:token", accessToken);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header
        leftLinkName="Login"
        leftLinkHref="/login"
        rightLinkName="Home"
        rightLinkHref="/"
      />
      <main className={styles.containerMain}>
        <h1> Register</h1>

        <Form onSubmit={handleSubmit(accountRegister)}>
          <Input
            id="input-name"
            labelName="Nome"
            type="text"
            linkForm={register("name")}
            error={errors.name?.message}
            placeholder={"Digite seu nome"}
          />

          <Input
            id="input-email"
            labelName="Email"
            type="email"
            linkForm={register("email")}
            error={errors.email?.message}
            placeholder={"Digite seu email"}
          />

          <Input
            id="input-phone"
            labelName="Telefone"
            type="text"
            linkForm={register("phone")}
            error={errors.phone?.message}
            placeholder={"(xx)xxxxx-xxxx"}
            onChange={(event) => handlePhone(event)}
            maxLength={14}
          />

          <Input
            id="input-password"
            labelName="Senha"
            type="password"
            linkForm={register("password")}
            error={errors.password?.message}
            placeholder={"Digite sua senha"}
          />

          <Input
            id="input-confirm-password"
            labelName="Confirmação de senha"
            type="password"
            linkForm={register("confirmPassword")}
            error={errors.confirmPassword?.message}
            placeholder={"Digite sua senha novamente"}
          />

          <button type="submit">Registrar</button>
        </Form>
      </main>
    </>
  );
}
