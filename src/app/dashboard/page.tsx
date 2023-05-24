"use client";
import { ListContacts } from "@/components/ListContacts";
import { ModalDashboard } from "@/components/ModalDashboard";
import { AuthContext } from "@/contexts/AuthContext";
import { ContactsContext } from "@/contexts/ContactsContext";
import { Iclient } from "@/contexts/types";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function DashboardPage() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const { client, udpateClient } = useContext(AuthContext);
  const { contacts, requestContacts } = useContext(ContactsContext);
  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

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
      <ModalDashboard closeModal={closeModal} modalIsOpen={modalIsOpen} />
      <main className={styles.containerMain}>
        {client ? (
          <>
            <h1> Dashboard</h1>
            <h4>{client.email}</h4>
            <h4>{client.name}</h4>
            <button onClick={openModal}>Cadastrar contato</button>
            {contacts.length > 0 ? (
              <ListContacts contacts={contacts} />
            ) : (
              <h2>Não existem contatos cadastrados!</h2>
            )}
          </>
        ) : (
          <h1>Carregando...</h1>
        )}
      </main>
    </>
  );
}
