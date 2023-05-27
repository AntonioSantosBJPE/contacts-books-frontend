import { CustomLink } from "@/components/CustomLink";
import Image from "next/image";
import styles from "./styles.module.scss";

interface IheaderDashboardProps {}
export const HeaderHome = ({}: IheaderDashboardProps) => {
  return (
    <header className={styles.Header}>
      <div className={styles.boxHeader}>
        <figure>
          <Image
            src={"/Logo.svg"}
            alt="logo"
            width={280}
            height={80}
            priority={true}
          />
        </figure>

        <div>
          <CustomLink style="linkOutline" href="/login">
            Login
          </CustomLink>
          <CustomLink style="linkPrimaryColor" href="/register">
            Registrar
          </CustomLink>
        </div>
      </div>
    </header>
  );
};
