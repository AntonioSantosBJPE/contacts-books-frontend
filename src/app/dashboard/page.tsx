"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { ContactsContext } from "@/contexts/ContactsContext";
import { Iclient } from "@/contexts/types";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function DashboardPage() {
  const { client, udpateClient } = useContext(AuthContext);
  const { contacts, requestContacts } = useContext(ContactsContext);
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
    <main>
      {client ? (
        <>
          <h1> Dashboard</h1>
          <h4>{client.email}</h4>
          <h4>{client.name}</h4>
          <ul>
            {contacts.map((contact) => {
              return (
                <li key={contact.id}>
                  <h4>Nome: {contact.name}</h4>
                  <h4>Email: {contact.email}</h4>
                  <h4>Telefone: {contact.phone}</h4>
                  <h4>Registrado em: {contact.createdAt}</h4>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h1>Carregando...</h1>
      )}
    </main>
  );
}
