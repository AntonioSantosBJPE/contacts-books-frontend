import { Form } from "@/components/Form";
import { ContactsContext } from "@/contexts/ContactsContext";
import { api } from "@/services/api";
import { FormEvent, useContext } from "react";

interface ImodalDeleteContact {}

export const ModalDeleteContact = ({}: ImodalDeleteContact) => {
  const { contacts, setContacts, closeModal, contactIsEdit } =
    useContext(ContactsContext);

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
    <>
      <button onClick={closeModal}>close</button>
      <Form onSubmit={deleteContactSubmit}>
        <button type="submit">Deletar</button>
      </Form>
    </>
  );
};
