import { Icontacts } from "@/contexts/types";
import styles from "./styles.module.scss";
interface IcardContactProps {
  contact: Icontacts;
}

export const CardContact = ({ contact }: IcardContactProps) => {
  return (
    <li className={styles.cardContact}>
      <p>Nome: {contact.name}</p>
      <p>Email: {contact.email}</p>
      <p>Telefone: {contact.phone}</p>
      <p>Registrado em: {contact.createdAt}</p>
      <div>
        <button>Editar</button>
        <button>Excluir</button>
      </div>
    </li>
  );
};
