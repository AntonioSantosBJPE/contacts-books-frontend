import { Button } from "@/components/Button";
import { DashboardContext } from "@/contexts/ContactsContext";
import { Icontacts } from "@/contexts/types";
import Image from "next/image";
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

      <div>
        <Button
          type="button"
          style="buttonIcon"
          actionClick={() => openModal("editContact", contact)}
        >
          <Image
            src={"/icon-edit.svg"}
            alt="edit contact"
            width={25}
            height={25}
          />
          <span>Editar</span>
        </Button>
        <Button
          type="button"
          style="buttonIcon"
          actionClick={() => openModal("deleteContact", contact)}
        >
          <Image
            src={"/icon-delete.svg"}
            alt="delete contact"
            width={25}
            height={25}
          />
          <span>Excluir</span>
        </Button>
      </div>
      <p>Registrado em: {contact.createdAt}</p>
    </li>
  );
};
