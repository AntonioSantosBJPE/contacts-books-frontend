import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

interface IheaderProps {
  leftLinkName: string;
  leftLinkHref: string;
  rightLinkName: string;
  rightLinkHref: string;
}

export const Header = ({
  leftLinkName,
  leftLinkHref,
  rightLinkName,
  rightLinkHref,
}: IheaderProps) => {
  return (
    <header className={styles.boxHeader}>
      <Image src={"/Logo.svg"} alt="logo" width={250} height={80} />
      <div>
        <Link href={leftLinkHref}>{leftLinkName}</Link>
        <Link href={rightLinkHref}>{rightLinkName}</Link>
      </div>
    </header>
  );
};
