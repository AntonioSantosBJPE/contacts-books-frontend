"use client";
import { AsideInfosLogo } from "@/components/AsideInfosLogo";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { AuthContext } from "@/contexts/AuthContext";
import { Iclient, IloginClient } from "@/contexts/types";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { schema, TloginData } from "./schema";
import styles from "./styles.module.scss";

export default function LoginPage() {
  const { udpateClient } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const responseLogin = await api.post<IloginClient>("/login", data);
      const { accessToken } = responseLogin.data;
      api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      localStorage.setItem("@contacts-book:token", accessToken);
      const responseProfile = await api.get<Iclient>("/clients/profile");
      udpateClient(responseProfile.data);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <main className={styles.containerMain}>
          <div>
            <AsideInfosLogo />
            <section>
              <h2> Login</h2>
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

                <Button
                  type="submit"
                  style="buttonLargeBlack"
                  isDisabled={isLoading}
                >
                  {isLoading ? <CircularProgress color="inherit" /> : "Entrar"}
                </Button>
              </Form>
              <div>
                <div>
                  <p> Ainda não tem cadastro? </p>
                  <Link href={"/register"}>Registro</Link>
                </div>
                <div>
                  <p> ou </p>
                </div>
                <div>
                  <p>Voltar para home? </p>
                  <Link href={"/"}>
                    <Image
                      src={"/iconHome.svg"}
                      alt="icon home"
                      width={20}
                      height={20}
                    />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
