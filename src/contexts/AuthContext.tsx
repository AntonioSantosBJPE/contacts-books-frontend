"use client";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import {
  IauthContext,
  IauthProviderProps,
  Iclient,
  TsnackBarTypes,
} from "./types";

export const AuthContext = createContext({} as IauthContext);

export const AuthProvider = ({ children }: IauthProviderProps) => {
  const [client, setClient] = useState<Iclient>();
  const [snackBar, setSnackBar] = useState(false);
  const [snackBarType, setSnackBarType] = useState<TsnackBarTypes>("success");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [notAuth, setNotAuth] = useState(true);

  const router = useRouter();

  const openSnackBar = (type: TsnackBarTypes, message: string) => {
    setSnackBarType(type);
    setSnackBarMessage(message);
    setSnackBar(true);
  };

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  const udpateClient = (data: Iclient) => {
    setClient((oldClient) => {
      return { ...oldClient, ...data };
    });
  };

  const logoutClient = () => {
    api.defaults.headers.common.authorization = `Bearer`;
    localStorage.removeItem("@contacts-book:token");
    openSnackBar("success", "Logout realizado!");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        udpateClient,
        client,
        logoutClient,
        snackBar,
        openSnackBar,
        handleCloseSnackBar,
        snackBarType,
        snackBarMessage,
        notAuth,
        setNotAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
