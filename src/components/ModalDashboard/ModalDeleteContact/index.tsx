import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardContext } from "@/contexts/ContactsContext";
import { api } from "@/services/api";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { FormEvent, useContext, useState } from "react";
import styles from "./styles.module.scss";

interface ImodalDeleteContact {}

export const ModalDeleteContact = ({}: ImodalDeleteContact) => {
  const { contacts, setContacts, closeModal, contactIsEdit } =
    useContext(DashboardContext);
  const { openSnackBar } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

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
      <Button style="buttonIconSmall" type="button" actionClick={closeModal}>
        <Image
          src={"/icon-close.svg"}
          alt="close modal"
          width={25}
          height={25}
        />
      </Button>
      <h2 id="transition-modal-title">Apagar contato</h2>
      <p>Tem certeza que deseja apagar o contato: {contactIsEdit.name} </p>
      <Form onSubmit={deleteContactSubmit}>
        <Button type="submit" style="buttonLargeBlack" isDisabled={isLoading}>
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            "Confirmar Deleção"
          )}
        </Button>
      </Form>
    </div>
  );
};
