import { HeaderHome } from "@/components/Header/HeaderHome";
import Image from "next/image";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <div className={styles.containerFullPage}>
      <HeaderHome />
      <div className={styles.container}>
        <main className={styles.containerMain}>
          <div className={styles.containerSection}>
            <div>
              <Image
                src={"/icon-list.svg"}
                alt="icon list"
                width={100}
                height={100}
                priority={true}
              />
              <h2>O jeito fácil e rápido de criar sua lista de contatos!</h2>
              <h3>
                Crie sua conta ou faça seu login para começar a organizar seus
                contatos de forma eficiente.
              </h3>
            </div>
            <figure>
              <Image
                src={"/img-list-home.png"}
                alt="gif home page"
                width={280}
                height={280}
                priority={true}
              />
            </figure>
          </div>
        </main>
      </div>
      <div className={styles.containerFooter}>
        <footer>
          <Image
            src={"/Logo.svg"}
            alt="logo"
            width={120}
            height={40}
            priority={true}
          />
          <h3>© Copyright 2023. Made by Antonio Santos</h3>
        </footer>
      </div>
    </div>
  );
}
