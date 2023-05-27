import Link from "next/link";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface IcustomLinkPorps {
  children: ReactNode;
  href: string;
  style: "linkPrimaryColor" | "linkOutline";
}
export const CustomLink = ({ children, href, style }: IcustomLinkPorps) => {
  return (
    <>
      {style === "linkPrimaryColor" && (
        <Link className={styles.linkPrimaryColor} href={href}>
          {children}
        </Link>
      )}
      {style === "linkOutline" && (
        <Link className={styles.linkOutline} href={href}>
          {children}
        </Link>
      )}
    </>
  );
};
