import { Inter } from "next/font/google";
import "../sass/main.scss";

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
