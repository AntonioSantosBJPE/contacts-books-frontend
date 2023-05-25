import { DashboardContext } from "@/contexts/ContactsContext";
import { Icontacts } from "@/contexts/types";
import { useContext } from "react";
import styles from "./styles.module.scss";
interface IcardContactProps {
  contact: Icontacts;
}

export const CardContact = ({ contact }: IcardContactProps) => {
  const { openModal } = useContext(DashboardContext);
  return (
    <li className={styles.cardContact}>
      <p>Nome: {contact.name}</p>
      <p>Email: {contact.email}</p>
      <p>Telefone: {contact.phone}</p>
      <p>Registrado em: {contact.createdAt}</p>
      <div>
        <button onClick={() => openModal("editContact", contact)}>
          Editar
        </button>
        <button onClick={() => openModal("deleteContact", contact)}>
          Excluir
        </button>
      </div>
    </li>
  );
};
