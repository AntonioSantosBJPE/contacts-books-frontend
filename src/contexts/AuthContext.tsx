"use client";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { Iclient } from "./types";

interface IauthContext {
  udpateClient: (data: Iclient) => void;
  client: Iclient | undefined;
  logoutClient: () => void;
}
interface IuserProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IauthContext);

export const AuthProvider = ({ children }: IuserProviderProps) => {
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
