import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, SetStateAction, useContext, useEffect } from "react";
import { api } from "../../services/api";

interface AxiosInterceptorProps {
  children: ReactNode;
  closeModal?: () => void;
  setIsLoading?: (value: SetStateAction<boolean>) => void;
  isModal?: boolean;
}

export const AxiosInterceptor = ({
  children,
  closeModal,
  setIsLoading,
  isModal,
}: AxiosInterceptorProps) => {
  const { openSnackBar } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const errorInterceptor = (error: Error) => {
      if (!axios.isAxiosError(error)) {
        return Promise.reject(error);
      }
      console.log(error);
      if (error.message === "Network Error") {
        openSnackBar("error", "Erro no servidor, tente novamente.");
        if (isModal && closeModal) closeModal();
      }
      if (error.message.includes("timeout")) {
        openSnackBar(
          "error",
          "O servidor está sendo reiniciado, faça a solicitação novamente, desculpa o encômodo"
        );
        if (isModal && closeModal) closeModal();
      }

      if (error.response) {
        if (error.response.data.message === "Invalid credentials")
          openSnackBar("error", "Email ou sehna inválidos");
        if (error.response.data.message === "Email already exists")
          if (setIsLoading) {
            setIsLoading(false);
            openSnackBar("error", "Email já em uso, utilize outro.");
          } else {
            openSnackBar(
              "error",
              "Email já em uso, realize o login ou mude-o!"
            );
          }

        if (
          error.response.data.message ===
          "Contact email already exists in Client"
        ) {
          openSnackBar(
            "error",
            "Email já em uso, utilize outro para este contato."
          );
          if (setIsLoading) setIsLoading(false);
        }

        if (error.response.data.message === "jwt expired") {
          openSnackBar(
            "error",
            "O token de autentificação expirou, realize o login novamente!"
          );
          api.defaults.headers.common.authorization = `Bearer`;
          localStorage.removeItem("@contacts-book:token");
          router.push("/login");
        }
      }

      return Promise.reject(error);
    };

    const interceptor = api.interceptors.response.use(null, errorInterceptor);

    return () => api.interceptors.response.eject(interceptor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
