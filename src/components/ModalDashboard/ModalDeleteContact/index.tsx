import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { DashboardContext } from "@/contexts/ContactsContext";
import { api } from "@/services/api";
import Image from "next/image";
import { FormEvent, useContext } from "react";
import styles from "./styles.module.scss";

interface ImodalDeleteContact {}

export const ModalDeleteContact = ({}: ImodalDeleteContact) => {
  const { contacts, setContacts, closeModal, contactIsEdit } =
    useContext(DashboardContext);

  const deleteContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await api.delete(`/contacts/${contactIsEdit.id}`);

      const newContacts = contacts.filter(
        (contact) => contact.id !== contactIsEdit.id
      );
      setContacts(newContacts);
      closeModal();
    } catch (error) {
      console.error(error);
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
        <Button type="submit" style="buttonLargeBlack">
          Confirmar Deleção
        </Button>
      </Form>
    </div>
  );
};
