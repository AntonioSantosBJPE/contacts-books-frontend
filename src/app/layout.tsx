import { AuthProvider } from "@/contexts/AuthContext";
import { Inter } from "next/font/google";
import "../scss/main.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Contacts Book",
  description:
    "Uma aplicação para facilitar o gerenciamento de sua lista de contatos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
