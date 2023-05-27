"use client";
import { Button } from "@/components/Button";
import { CustomSnackbar } from "@/components/CustomSnackbar";
import { HeaderDashboard } from "@/components/Header/HeaderDashboard";
import { ModalDashboard } from "@/components/ModalDashboard";
import { TableContacts } from "@/components/TableContacts";
import { OverlayNotContacts } from "@/components/TableContacts/OverlayNotContacts";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardContext } from "@/contexts/ContactsContext";
import { Iclient } from "@/contexts/types";
import { api } from "@/services/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import styles from "./styles.module.scss";

export default function DashboardPage() {
  const { client, udpateClient, logoutClient } = useContext(AuthContext);
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

      {client ? (
        <>
          <HeaderDashboard logoutClient={logoutClient} />
          <div className={styles.container}>
            <main className={styles.containerMain}>
              <div className={styles.containerSections}>
                <h2>
                  Bem vindo de volta, <span> {client.name}</span>
                </h2>
                <h3>{client.email}</h3>
                <Button
                  type="button"
                  style="buttonIcon"
                  actionClick={() => openModal("editClient")}
                >
                  <Image
                    src={"/icon-edit.svg"}
                    alt="edit contact"
                    width={25}
                    height={25}
                  />
                  Editar Perfil
                </Button>
              </div>

              <div className={styles.containerSections}>
                <h2>Lista de contatos</h2>
                <Button
                  type="button"
                  style="buttonIcon"
                  actionClick={() => openModal("registerContact")}
                >
                  <Image
                    src={"/icon-add.svg"}
                    alt="edit contact"
                    width={25}
                    height={25}
                  />
                  Cadastrar contato
                </Button>
              </div>

              {contacts.length > 0 ? (
                <TableContacts contacts={contacts} />
              ) : (
                <OverlayNotContacts />
              )}
            </main>
          </div>
        </>
      ) : (
        <div className={styles.container}>
          <h1>Carregando...</h1>
        </div>
      )}
      <CustomSnackbar />
    </>
  );
}
