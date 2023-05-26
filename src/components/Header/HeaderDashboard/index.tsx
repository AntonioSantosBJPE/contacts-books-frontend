import { Button } from "@/components/Button";
import Image from "next/image";
import styles from "./styles.module.scss";

interface IheaderDashboardProps {
  logoutClient: () => void;
}

export const HeaderDashboard = ({ logoutClient }: IheaderDashboardProps) => {
  return (
    <header className={styles.Header}>
      <div className={styles.boxHeader}>
        <figure>
          <Image
            src={"/Logo.svg"}
            alt="logo"
            width={200}
            height={80}
            priority={true}
          />
        </figure>

        <Button style="buttonIcon" actionClick={logoutClient} type="button">
          <Image
            src={"/icon-logout.svg"}
            alt="logout"
            width={25}
            height={25}
            priority={true}
          />
          <span> Sair</span>
        </Button>
      </div>
    </header>
  );
};
