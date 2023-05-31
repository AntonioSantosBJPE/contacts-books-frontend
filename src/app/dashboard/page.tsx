"use client";
import { Button } from "@/components/Button";
import { CustomSnackbar } from "@/components/CustomSnackbar";
import { HeaderDashboard } from "@/components/Header/HeaderDashboard";
import { ModalDashboard } from "@/components/ModalDashboard";
import { SkeletonDashboard } from "@/components/Skeletons/SkeletonDashboard";
import { TableContacts } from "@/components/TableContacts";
import { OverlayNotContacts } from "@/components/TableContacts/OverlayNotContacts";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardContext } from "@/contexts/ContactsContext";
import { Iclient } from "@/contexts/types";
import { api } from "@/services/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function DashboardPage() {
  const [loadingFullPage, setLoadingFullPage] = useState(false);
  const { client, udpateClient, logoutClient, setNotAuth, openSnackBar } =
    useContext(AuthContext);
  const { contacts, requestContacts, openModal } = useContext(DashboardContext);

  const router = useRouter();

  useEffect(() => {
    const { ["@contacts-book:token"]: token } = parseCookies();

    if (!client) {
      (async () => {
        try {
          api.defaults.headers.common.authorization = `Bearer ${token}`;
          const response = await api.get<Iclient>("/clients/profile");
          setNotAuth(false);
          await requestContacts(response.data.id);
          udpateClient(response.data);
          setLoadingFullPage(true);
        } catch (error) {
          console.error(error);
          api.defaults.headers.common.authorization = `Bearer`;
          destroyCookie(null, "@contacts-book:token");
          router.push("/");
          //openModal("noAuth");
        }
      })();
    } else {
      (async () => {
        try {
          setNotAuth(false);
          await requestContacts(client.id);
          setLoadingFullPage(true);
        } catch (error) {
          console.error(error);
          api.defaults.headers.common.authorization = `Bearer`;
          destroyCookie(null, "@contacts-book:token");
          router.push("/");
          //openModal("noAuth");
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalDashboard />

      {client && loadingFullPage ? (
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
        <SkeletonDashboard />
      )}
      <CustomSnackbar />
    </>
  );
}
