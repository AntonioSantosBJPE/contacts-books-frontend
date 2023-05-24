"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { ContactsProvider } from "@/contexts/ContactsContext";
import Image from "next/image";
import { useContext } from "react";
import styles from "./styles.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logoutClient } = useContext(AuthContext);
  return (
    <div>
      <header className={styles.boxHeader}>
        <Image src={"/Logo.svg"} alt="logo" width={250} height={80} />
        <div>
          <button onClick={logoutClient}>Logout</button>
        </div>
      </header>
      <ContactsProvider>{children}</ContactsProvider>
    </div>
  );
}
