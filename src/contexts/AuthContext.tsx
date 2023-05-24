"use client";
import { createContext, ReactNode } from "react";

interface IauthContext {}
interface IuserProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IauthContext);

export const AuthProvider = ({ children }: IuserProviderProps) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
