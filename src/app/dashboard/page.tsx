"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { Iclient } from "@/contexts/types";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function DashboardPage() {
  const { client, logoutClient, udpateClient } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const token: string | null = localStorage.getItem("@contacts-book:token");

    if (!token) {
      console.log("não existe");
      router.push("/login");
    } else {
      console.log("existe");
      if (!client) {
        console.log("teste");
        (async () => {
          try {
            api.defaults.headers.common.authorization = `Bearer ${token}`;
            const response = await api.get<Iclient>("/clients/profile");
            udpateClient(response.data);
          } catch (error) {
            api.defaults.headers.common.authorization = `Bearer`;
            router.push("/login");
          }
        })();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      {client ? (
        <>
          <h1> Dashboard</h1>
          <h4>{client.email}</h4>
          <h4>{client.name}</h4>
          <button onClick={logoutClient}>Sair</button>
        </>
      ) : (
        <h1>Carregando...</h1>
      )}
    </main>
  );
}
