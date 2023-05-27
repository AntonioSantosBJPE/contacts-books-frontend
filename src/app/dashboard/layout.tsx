"use client";
import { ContactsProvider } from "@/contexts/ContactsContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ContactsProvider>{children}</ContactsProvider>
    </>
  );
}
