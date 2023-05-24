import { Icontacts } from "@/contexts/types";
import styles from "./styles.module.scss";
interface IlistContactsProps {
  contacts: Icontacts[];
}
export const ListContacts = ({ contacts }: IlistContactsProps) => {
  return (
    <ul className={styles.listContacts}>
      {contacts.map((contact) => {
        return (
          <li key={contact.id}>
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
      })}
    </ul>
  );
};
