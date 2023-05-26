import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface IbuttonProps {
  children: ReactNode;
  type: "submit" | "button" | "reset";
  style: "buttonLargeBlack" | "buttonIcon" | "buttonIconSmall";
  actionClick?: () => void;
}

export const Button = ({
  children,
  type,
  style,
  actionClick,
}: IbuttonProps) => {
  return (
    <>
      {style === "buttonLargeBlack" && (
        <button className={styles.buttonLargeBlack} type={type}>
          {children}
        </button>
      )}
      {style === "buttonIcon" && (
        <button className={styles.buttonIcon} type={type} onClick={actionClick}>
          {children}
        </button>
      )}
      {style === "buttonIconSmall" && (
        <button
          className={styles.buttonIconSmall}
          type={type}
          onClick={actionClick}
        >
          {children}
        </button>
      )}
    </>
  );
};
