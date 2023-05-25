"use client";
import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { AuthContext } from "@/contexts/AuthContext";
import { Iclient, IloginClient } from "@/contexts/types";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { schema, TloginData } from "./schema";
import styles from "./styles.module.scss";

export default function LoginPage() {
  const { udpateClient } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TloginData>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const loginClient = async (data: TloginData) => {
    try {
      const responseLogin = await api.post<IloginClient>("/login", data);
      const { accessToken } = responseLogin.data;
      api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      localStorage.setItem("@contacts-book:token", accessToken);
      const responseProfile = await api.get<Iclient>("/clients/profile");
      udpateClient(responseProfile.data);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header
        leftLinkName="Register"
        leftLinkHref="/register"
        rightLinkName="Home"
        rightLinkHref="/"
      />
      <main className={styles.containerMain}>
        <h1> Login</h1>
        <Form onSubmit={handleSubmit(loginClient)}>
          <Input
            id="input-email"
            labelName="Email"
            type="email"
            linkForm={register("email")}
            error={errors.email?.message}
            placeholder={"Digite seu email"}
          />

          <Input
            id="input-password"
            labelName="Senha"
            type="password"
            linkForm={register("password")}
            error={errors.password?.message}
            placeholder={"Digite sua senha"}
          />

          <button type="submit">Login</button>
        </Form>
      </main>
    </>
  );
}
