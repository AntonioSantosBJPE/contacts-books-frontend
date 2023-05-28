import { handlePhone } from "@/app/register/utils";
import { AxiosInterceptor } from "@/components/AxiosInterceptor";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardContext } from "@/contexts/ContactsContext";
import { Icontacts } from "@/contexts/types";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { schema, TcreateContact } from "./schema";
import styles from "./styles.module.scss";

interface ImodalCreateContact {}

export const ModalCreateContact = ({}: ImodalCreateContact) => {
  const { contacts, setContacts, closeModal } = useContext(DashboardContext);
  const { openSnackBar } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TcreateContact>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const createContactSubmit = async (data: TcreateContact) => {
    try {
      setIsLoading(true);
      const response = await api.post<Icontacts>("/contacts", data);

      setContacts((oldContacts) => [...oldContacts, response.data]);
      openSnackBar("success", "Contato criado!");
      closeModal();
    } catch (error: any) {
      console.error(error);
    } finally {
    }
  };
  return (
    <AxiosInterceptor
      closeModal={closeModal}
      isModal={true}
      setIsLoading={setIsLoading}
    >
      <div className={styles.containerModal}>
        <Button style="buttonIconSmall" type="button" actionClick={closeModal}>
          <Image
            src={"/icon-close.svg"}
            alt="close modal"
            width={25}
            height={25}
          />
        </Button>
        <h2 id="transition-modal-title">Criar contato</h2>
        <Form onSubmit={handleSubmit(createContactSubmit)}>
          <Input
            id="input-name"
            labelName="Nome"
            type="text"
            linkForm={register("name")}
            error={errors.name?.message}
            placeholder={"Digite seu nome"}
          />

          <Input
            id="input-email"
            labelName="Email"
            type="email"
            linkForm={register("email")}
            error={errors.email?.message}
            placeholder={"Digite seu email"}
          />

          <Input
            id="input-phone"
            labelName="Telefone"
            type="text"
            linkForm={register("phone")}
            error={errors.phone?.message}
            placeholder={"(xx)xxxxx-xxxx"}
            onChange={(event) => handlePhone(event)}
            maxLength={14}
          />
          <Button type="submit" style="buttonLargeBlack" isDisabled={isLoading}>
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Criar contanto"
            )}
          </Button>
        </Form>
      </div>
    </AxiosInterceptor>
  );
};
