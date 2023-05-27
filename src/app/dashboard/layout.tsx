"use client";
import { HeaderDashboard } from "@/components/Header/HeaderDashboard";
import { AuthContext } from "@/contexts/AuthContext";
import { ContactsProvider } from "@/contexts/ContactsContext";
import { useContext } from "react";
import styles from "./styles.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logoutClient } = useContext(AuthContext);
  return (
    <>
      <HeaderDashboard logoutClient={logoutClient} />
      <div className={styles.container}>
        <ContactsProvider>{children}</ContactsProvider>
      </div>
    </>
  );
}
