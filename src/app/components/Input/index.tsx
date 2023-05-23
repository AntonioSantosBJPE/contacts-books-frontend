import { UseFormRegisterReturn } from "react-hook-form";

interface iInput {
  labelName: string;
  id: string;
  type: "text" | "password" | "email";
  disabled?: boolean;
  placeholder?: string;
  linkForm?: UseFormRegisterReturn<string>;
  error?: any;
}

export const Input = ({
  type,
  id,
  labelName,
  placeholder,
  linkForm,
  error,
  disabled,
}: iInput) => {
  return (
    <>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...linkForm}
        disabled={disabled}
      />
      <label htmlFor={id}>{labelName}</label>
      <p>{error}</p>
    </>
  );
};
