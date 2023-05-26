import Image from "next/image";
import styles from "./styles.module.scss";

export const AsideInfosLogo = () => {
  return (
    <aside className={styles.containerAside}>
      <div>
        <Image
          src={"/Logo.svg"}
          alt="logo"
          width={260}
          height={100}
          priority={true}
        />
      </div>
    </aside>
  );
};
