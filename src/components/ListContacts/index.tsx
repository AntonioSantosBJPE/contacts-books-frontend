import { Icontacts } from "@/contexts/types";
import { CardContact } from "./CardContact";
import styles from "./styles.module.scss";
interface IlistContactsProps {
  contacts: Icontacts[];
}
export const ListContacts = ({ contacts }: IlistContactsProps) => {
  return (
    <ul className={styles.listContacts}>
      {contacts.map((contact) => {
        return <CardContact key={contact.id} contact={contact} />;
      })}
    </ul>
  );
};
