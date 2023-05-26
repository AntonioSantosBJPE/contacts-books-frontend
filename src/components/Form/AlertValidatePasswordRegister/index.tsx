import styles from "./styles.module.scss";

interface IalertValidatePasswordRegister {
  valueInputPassword: string;
  errorPassword: string | undefined;
  errorConfirmPassword: string | undefined;
  valueInputConfirmPassword: string;
}
export const AlertValidatePasswordRegister = ({
  valueInputPassword,
  errorPassword,
  errorConfirmPassword,
  valueInputConfirmPassword,
}: IalertValidatePasswordRegister) => {
  const validatedRegex = (pass: string, regex: RegExp): boolean => {
    return regex.test(pass);
  };

  const validUppercase = validatedRegex(
    valueInputPassword,
    new RegExp(".*[A-Z].*")
  );
  const validLowercase = validatedRegex(
    valueInputPassword,
    new RegExp(".*[a-z].*")
  );
  const validNumber = validatedRegex(valueInputPassword, new RegExp(".*\\d.*"));
  const validSpecialCharacter = validatedRegex(
    valueInputPassword,
    new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*")
  );
  const validNumberOfCharacters = validatedRegex(
    valueInputPassword,
    new RegExp("^.{8,32}$")
  );

  return (
    <>
      {(valueInputPassword || errorPassword) && (
        <div className={styles.containerValidates}>
          {/* <h4 className={styles.containerValidates}>Validação de senha:</h4> */}
          <p
            className={
              validNumberOfCharacters
                ? styles.validPasswordTrue
                : styles.validPasswordFalse
            }
          >
            Contém entre 8 e 32 caracteres
          </p>
          <p
            className={
              validUppercase
                ? styles.validPasswordTrue
                : styles.validPasswordFalse
            }
          >
            Contém ao menos uma letra maiúscula
          </p>
          <p
            className={
              validLowercase
                ? styles.validPasswordTrue
                : styles.validPasswordFalse
            }
          >
            Contém ao menos uma letra minúscula
          </p>
          <p
            className={
              validNumber ? styles.validPasswordTrue : styles.validPasswordFalse
            }
          >
            Contém ao menos uma número
          </p>
          <p
            className={
              validSpecialCharacter
                ? styles.validPasswordTrue
                : styles.validPasswordFalse
            }
          >
            Contém ao menos um caracter especial
          </p>
          <p
            className={
              !errorConfirmPassword &&
              valueInputConfirmPassword === valueInputPassword
                ? styles.validPasswordTrue
                : styles.validPasswordFalse
            }
          >
            As senhas são iguais
          </p>
        </div>
      )}
    </>
  );
};
