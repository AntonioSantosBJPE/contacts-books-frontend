import { FormEventHandler, ReactNode } from "react";
import styles from "./styles.module.scss";

interface IformProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}

export const Form = ({ children, onSubmit }: IformProps) => {
  return (
    <form className={styles.formContainer} onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
};
