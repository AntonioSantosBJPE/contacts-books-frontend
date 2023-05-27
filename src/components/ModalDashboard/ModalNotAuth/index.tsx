import { Button } from "@/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardContext } from "@/contexts/ContactsContext";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import styles from "./styles.module.scss";

interface ImodalNotAuth {}

export const ModalNotAuth = ({}: ImodalNotAuth) => {
  const { contacts, setContacts, closeModal, contactIsEdit } =
    useContext(DashboardContext);
  const { openSnackBar } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const deleteContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await api.delete(`/contacts/${contactIsEdit.id}`);

      const newContacts = contacts.filter(
        (contact) => contact.id !== contactIsEdit.id
      );
      setContacts(newContacts);
      openSnackBar("success", "Contato apagado!");
      closeModal();
    } catch (error) {
      openSnackBar("error", "Erro no servidor, tente novamente.");
      closeModal();
      console.error(error);
    } finally {
    }
  };
  return (
    <div className={styles.containerModal}>
      <h2 id="transition-modal-title">Erro de autenticação</h2>
      <p>
        Você não está autenticado ou seu token expirou, faça novamente o login!{" "}
      </p>
      <Button
        style="buttonLargeBlack"
        type="button"
        actionClick={() => {
          router.push("/login");
        }}
      >
        Realizar Login
      </Button>
    </div>
  );
};
