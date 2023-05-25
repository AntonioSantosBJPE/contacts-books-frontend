"use client";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { IauthContext, IauthProviderProps, Iclient } from "./types";

export const AuthContext = createContext({} as IauthContext);

export const AuthProvider = ({ children }: IauthProviderProps) => {
  const [client, setClient] = useState<Iclient>();

  const router = useRouter();

  const udpateClient = (data: Iclient) => {
    setClient((oldClient) => {
      return { ...oldClient, ...data };
    });
  };

  const logoutClient = () => {
    api.defaults.headers.common.authorization = `Bearer`;
    localStorage.removeItem("@contacts-book:token");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ udpateClient, client, logoutClient }}>
      {children}
    </AuthContext.Provider>
  );
};
