import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

interface ImodalNotAuth {}

export const ModalNotAuth = ({}: ImodalNotAuth) => {
  const router = useRouter();

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
