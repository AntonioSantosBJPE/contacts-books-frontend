import { ContactsProvider } from "@/contexts/ContactsContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ContactsProvider>{children}</ContactsProvider>
    </div>
  );
}
