"use client";
import { ModalDashboard } from "@/components/ModalDashboard";
import { TableContacts } from "@/components/TableContacts";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardContext } from "@/contexts/ContactsContext";
import { Iclient } from "@/contexts/types";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import styles from "./styles.module.scss";

export default function DashboardPage() {
  const { client, udpateClient } = useContext(AuthContext);
  const { contacts, requestContacts, openModal } = useContext(DashboardContext);

  const router = useRouter();

  useEffect(() => {
    const token: string | null = localStorage.getItem("@contacts-book:token");

    if (!token) {
      router.push("/login");
    } else {
      if (!client) {
        (async () => {
          try {
            api.defaults.headers.common.authorization = `Bearer ${token}`;
            const response = await api.get<Iclient>("/clients/profile");
            udpateClient(response.data);
            requestContacts(response.data.id);
          } catch (error) {
            console.error(error);
            api.defaults.headers.common.authorization = `Bearer`;
            router.push("/login");
          }
        })();
      } else {
        requestContacts(client.id);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalDashboard />
      <main className={styles.containerMain}>
        {client ? (
          <>
            <h1> Dashboard</h1>
            <h4>{client.email}</h4>
            <h4>{client.name}</h4>
            <button onClick={() => openModal("editClient")}>
              Editar Perfil
            </button>
            <br></br>
            <button onClick={() => openModal("registerContact")}>
              Cadastrar contato
            </button>
            <TableContacts contacts={contacts} />
          </>
        ) : (
          <h1>Carregando...</h1>
        )}
      </main>
    </>
  );
}
