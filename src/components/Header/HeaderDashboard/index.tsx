import { Button } from "@/components/Button";
import { CustomLink } from "@/components/CustomLink";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import { useContext } from "react";
import styles from "./styles.module.scss";

interface IheaderDashboardProps {
  logoutClient: () => void;
}

export const HeaderDashboard = ({ logoutClient }: IheaderDashboardProps) => {
  const { notAuth } = useContext(AuthContext);
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
        {notAuth ? (
          <CustomLink style="linkOutline" href="/login">
            Login
          </CustomLink>
        ) : (
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
        )}
      </div>
    </header>
  );
};
