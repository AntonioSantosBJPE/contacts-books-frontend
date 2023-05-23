import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./styles.module.scss";

interface iInput {
  labelName: string;
  id: string;
  type: "text" | "password" | "email";
  disabled?: boolean;
  placeholder?: string;
  linkForm?: UseFormRegisterReturn<string>;
  error?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  type,
  id,
  labelName,
  placeholder,
  linkForm,
  error,
  disabled,
  onChange,
}: iInput) => {
  return (
    <div className={styles.containerInput}>
      <label htmlFor={id}>{labelName}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...linkForm}
        disabled={disabled}
        onChange={onChange}
      />
      <p>{error}</p>
    </div>
  );
};
