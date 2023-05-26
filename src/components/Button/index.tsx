import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface IbuttonProps {
  children: ReactNode;
  type: "submit" | "button" | "reset";
  style: "buttonLargeBlack";
}

export const Button = ({ children, type, style }: IbuttonProps) => {
  return (
    <>
      {style === "buttonLargeBlack" && (
        <button className={styles.buttonLargeBlack} type={type}>
          {children}
        </button>
      )}
    </>
  );
};
