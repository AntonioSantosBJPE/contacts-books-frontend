import Image from "next/image";
import styles from "./styles.module.scss";

export const OverlayNotContacts = () => {
  return (
    <div className={styles.containerSections}>
      <Image
        src={"/icon-empty-list.svg"}
        alt="empty list"
        width={30}
        height={30}
      />
      <h2>
        Sua lista de contatos está vazia,{" "}
        <span>vamos criar seu primeiro contato?</span>
      </h2>
      <h4>
        Click no botão Cadastrar contato, na sessão anterior e cadastre seu
        primeiro contatos
      </h4>
    </div>
  );
};
